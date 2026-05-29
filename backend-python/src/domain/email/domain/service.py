from src.core.logger import logger_main as logger
from src.domain.email.domain.repository import EmailRepository
from src.domain.email.utils import (
    build_bid_email_html,
    build_contact_email_html,
    send_email,
)
from src.domain.email.config import email_settings


class EmailService:
    """Service layer for email operations."""

    @staticmethod
    async def handle_contact_submission(name: str, email: str, message: str) -> bool:
        """Process a contact form submission — save to DB and send notification email."""
        try:
            await EmailRepository.save_contact_message(name=name, email=email, message=message)
        except Exception as e:
            logger.error(f"Failed to save contact message: {e}")

        html_body = build_contact_email_html(name=name, email=email, message=message)
        return await send_email(
            to_email=email_settings.SMTP_FROM_EMAIL,
            subject=f"Portfolio Contact: {name}",
            html_body=html_body,
        )

    @staticmethod
    async def handle_bid_submission(
        company_name: str,
        position: str,
        worksite: str,
        job_type: str,
        salary: str,
        benefits: list[str],
        message: str,
    ) -> bool:
        """Process a bid-to-hire form submission — save to DB and send notification email."""
        try:
            await EmailRepository.save_bid_submission(
                company_name=company_name,
                position=position,
                worksite=worksite,
                type=job_type,
                salary=salary,
                benefits=benefits,
                message=message,
            )
        except Exception as e:
            logger.error(f"Failed to save bid submission: {e}")

        html_body = build_bid_email_html(
            company_name=company_name,
            position=position,
            worksite=worksite,
            job_type=job_type,
            salary=salary,
            benefits=benefits,
            message=message,
        )
        return await send_email(
            to_email=email_settings.SMTP_FROM_EMAIL,
            subject=f"Bid-to-Hire: {company_name} — {position}",
            html_body=html_body,
        )
