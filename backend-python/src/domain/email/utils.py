import aiosmtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from src.core.logger import logger_main as logger
from src.domain.email.config import email_settings


async def send_email(to_email: str, subject: str, html_body: str) -> bool:
    """Send an email via SMTP."""
    try:
        message = MIMEMultipart("alternative")
        message["From"] = f"{email_settings.SMTP_FROM_NAME} <{email_settings.SMTP_FROM_EMAIL}>"
        message["To"] = to_email
        message["Subject"] = subject

        html_part = MIMEText(html_body, "html")
        message.attach(html_part)

        await aiosmtplib.send(
            message,
            hostname=email_settings.SMTP_HOST,
            port=email_settings.SMTP_PORT,
            username=email_settings.SMTP_USERNAME,
            password=email_settings.SMTP_PASSWORD.get_secret_value(),
            start_tls=email_settings.SMTP_USE_TLS,
        )
        logger.info(f"Email sent to {to_email}: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email to {to_email}: {e}")
        return False


def build_contact_email_html(name: str, email: str, message: str) -> str:
    """Build HTML email body for a contact form submission."""
    return f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 12px; border-radius: 4px;">{message}</p>
        </div>
        <p style="color: #64748b; font-size: 12px;">Sent from Koentjoro Portfolio contact form</p>
    </body>
    </html>
    """


def build_bid_email_html(
    company_name: str,
    position: str,
    worksite: str,
    job_type: str,
    salary: str,
    benefits: list[str],
    message: str,
) -> str:
    """Build HTML email body for a bid-to-hire form submission."""
    benefits_html = "".join(f"<li>{b}</li>" for b in benefits) if benefits else "<li>None specified</li>"
    return f"""
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0ea5e9;">New Bid-to-Hire Submission</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Company:</strong> {company_name}</p>
            <p><strong>Position:</strong> {position}</p>
            <p><strong>Worksite:</strong> {worksite}</p>
            <p><strong>Type:</strong> {job_type}</p>
            <p><strong>Salary:</strong> {salary}</p>
            <p><strong>Benefits:</strong></p>
            <ul>{benefits_html}</ul>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: white; padding: 12px; border-radius: 4px;">{message or 'No additional message'}</p>
        </div>
        <p style="color: #64748b; font-size: 12px;">Sent from Koentjoro Portfolio bid-to-hire form</p>
    </body>
    </html>
    """
