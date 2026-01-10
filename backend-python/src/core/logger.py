import json
import logging.config
import logging.handlers
import traceback
from collections.abc import Mapping
from datetime import datetime, timezone
from functools import lru_cache
from pathlib import Path
from typing import Any, MutableMapping, Self, override

from src.core.config import settings

LOG_RECORD_BUILTIN_ATTRS = {
    "args",
    "asctime",
    "created",
    "exc_info",
    "exc_text",
    "filename",
    "funcName",
    "levelname",
    "levelno",
    "lineno",
    "module",
    "msecs",
    "message",
    "msg",
    "name",
    "pathname",
    "process",
    "processName",
    "relativeCreated",
    "stack_info",
    "thread",
    "threadName",
    "taskName",
}


class LoggerConfig:
    def __init__(self: Self, config_file: dict[str, Any]) -> None:
        self.config_file = config_file
        self.log_level = "DEBUG" if settings.APP_STAGE == "development" else "INFO"

    def setup_logger(self: Self) -> None:
        logging.config.dictConfig(self.config_file)
        logging.getLogger().setLevel(self.log_level)
        queue_handler = logging.getHandlerByName("queue")
        if (
            queue_handler is not None
            and isinstance(queue_handler, logging.handlers.QueueHandler)
            and queue_handler.listener is not None
        ):
            queue_handler.listener.start()

    def stop_logger(self: Self) -> None:
        queue_handler = logging.getHandlerByName("queue")
        if (
            queue_handler is not None
            and isinstance(queue_handler, logging.handlers.QueueHandler)
            and queue_handler.listener is not None
        ):
            queue_handler.listener.stop()


class JSONFormatter(logging.Formatter):
    """
    JSON formatter for structured logging.

    Outputs log records as JSON objects with essential debugging fields:
    - timestamp (ISO 8601 format with timezone)
    - level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    - logger (logger name)
    - module, function, line (code location)
    - message (formatted log message)
    - exception info (if present)
    - custom fields (any extra attributes added to the log record)

    This format makes logs easy to parse, search, and analyze in log aggregation tools.
    """

    def __init__(
        self: Self,
        *,
        fmt_keys: dict[str, str] | None = None,
        **kwargs: Any,
    ) -> None:
        """
        Initialize the JSON formatter.

        Args:
            fmt_keys: Optional mapping to customize JSON field names
            **kwargs: Additional arguments passed to parent Formatter
        """
        super().__init__()
        self.fmt_keys = fmt_keys or {}

    @override
    def format(self: Self, record: logging.LogRecord) -> str:
        """
        Format the log record as a JSON string.

        Think of this like a factory that converts raw log data into a
        beautifully packaged JSON gift box - each field carefully placed
        and labeled for easy identification.

        Args:
            record: The log record to format

        Returns:
            JSON string representation of the log record
        """
        message = self._prepare_log_dict(record)
        return json.dumps(message, default=str, ensure_ascii=False)

    def _prepare_log_dict(self: Self, record: logging.LogRecord) -> dict[str, Any]:
        """
        Prepare the dictionary representation of the log record.

        This is like organizing a toolbox - we keep the essential tools
        (timestamp, level, message) in the main compartment and custom
        tools (extra fields) in separate slots for easy access.

        Args:
            record: The log record to convert

        Returns:
            Dictionary with all log information
        """
        always_fields = {
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
            "timestamp": self._format_timestamp(record),
        }

        renamed_fields = self._rename_keys(always_fields)

        if record.process:
            renamed_fields["process"] = record.process
            renamed_fields["process_name"] = record.processName

        if record.thread:
            renamed_fields["thread"] = record.thread
            renamed_fields["thread_name"] = record.threadName

        if record.exc_info:
            renamed_fields["exception"] = {
                "type": record.exc_info[0].__name__ if record.exc_info[0] else None,
                "value": str(record.exc_info[1]) if record.exc_info[1] else None,
                "traceback": self._format_exception(record.exc_info),
            }

        if record.stack_info:
            renamed_fields["stack_trace"] = record.stack_info

        custom_fields = self._extract_custom_fields(record)
        if custom_fields:
            renamed_fields["extra"] = self._rename_keys(custom_fields)

        return renamed_fields

    def _format_timestamp(self: Self, record: logging.LogRecord) -> str:
        """
        Format timestamp in ISO 8601 format with timezone.

        ISO 8601 is the universal language of timestamps - like using
        metric system, everyone understands it the same way.

        Args:
            record: The log record

        Returns:
            ISO 8601 formatted timestamp string
        """
        dt = datetime.fromtimestamp(record.created, tz=timezone.utc)
        return dt.isoformat()

    def _format_exception(
        self: Self,
        exc_info: (
            tuple[type[BaseException], BaseException, Any] | tuple[None, None, None]
        ),
    ) -> list[str]:
        """
        Format exception traceback as a list of strings.

        Think of this like documenting a crime scene - we capture every
        detail of what went wrong and how we got there.

        Args:
            exc_info: Exception information tuple (type, value, traceback)

        Returns:
            List of traceback lines
        """
        return traceback.format_exception(*exc_info)

    def _extract_custom_fields(self: Self, record: logging.LogRecord) -> dict[str, Any]:
        """
        Extract custom fields from the log record.

        This applies the DRY principle - instead of manually copying fields,
        we automatically identify and extract anything that's not a standard
        logging attribute (like request_id, user_id, correlation_id, etc.)

        Args:
            record: The log record

        Returns:
            Dictionary of custom fields
        """
        custom_fields = {}

        for key, value in record.__dict__.items():
            if key not in LOG_RECORD_BUILTIN_ATTRS:
                custom_fields[key] = value

        return custom_fields

    def _rename_keys(self: Self, data: dict[str, Any]) -> dict[str, Any]:
        return {self.fmt_keys.get(k, k): v for k, v in data.items()}


class NonErrorFilter(logging.Filter):
    @override
    def filter(self: Self, record: logging.LogRecord) -> bool:
        return record.levelno < logging.ERROR


class ContextLogger(logging.LoggerAdapter):
    def process(
        self: Self, msg: Any, kwargs: MutableMapping[str, Any]
    ) -> tuple[Any, MutableMapping[str, Any]]:
        extra: dict[str, Any] = {}
        if self.extra is not None and isinstance(self.extra, Mapping):
            extra = dict(self.extra)
        if "extra" in kwargs:
            extra.update(kwargs["extra"])
        kwargs["extra"] = extra
        return msg, kwargs


@lru_cache()
def get_logger_config() -> LoggerConfig:
    config_path = Path(__file__).parent / "logger_config.json"
    with config_path.open("r", encoding="utf-8") as f:
        config_data = json.load(f)
    logger_config = LoggerConfig(config_data)
    return logger_config


logger_config = get_logger_config()

logger_main = logging.getLogger("main")
logger_auth = logging.getLogger("auth")
