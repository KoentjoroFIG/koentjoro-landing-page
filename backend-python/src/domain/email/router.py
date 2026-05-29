from fastapi import APIRouter

from src.domain.email.schema import BidFormSchema, ContactFormSchema, EmailResponse
from src.domain.email.domain.service import EmailService

router = APIRouter()


@router.post("/contact", response_model=EmailResponse)
async def submit_contact_form(form: ContactFormSchema) -> EmailResponse:
    """Handle contact form submission — saves to DB and sends email notification."""
    success = await EmailService.handle_contact_submission(
        name=form.name,
        email=form.email,
        message=form.message,
    )

    if success:
        return EmailResponse(success=True, message="Message sent successfully!")
    return EmailResponse(success=False, message="Failed to send message. Please try again later.")


@router.post("/bid", response_model=EmailResponse)
async def submit_bid_form(form: BidFormSchema) -> EmailResponse:
    """Handle bid-to-hire form submission — saves to DB and sends email notification."""
    success = await EmailService.handle_bid_submission(
        company_name=form.company_name,
        position=form.position,
        worksite=form.worksite,
        job_type=form.type,
        salary=form.salary,
        benefits=form.benefits,
        message=form.message,
    )

    if success:
        return EmailResponse(success=True, message="Your offer has been submitted successfully!")
    return EmailResponse(success=False, message="Failed to submit offer. Please try again later.")
