from src.domain.email.domain.model import BidSubmissionModel, ContactMessageModel


class EmailRepository:
    """Repository for storing form submissions in the database."""

    @staticmethod
    async def save_contact_message(name: str, email: str, message: str) -> ContactMessageModel:
        msg = ContactMessageModel(name=name, email=email, message=message)
        await msg.insert()
        return msg

    @staticmethod
    async def save_bid_submission(
        company_name: str,
        position: str,
        worksite: str,
        type: str,
        salary: str,
        benefits: list[str],
        message: str,
    ) -> BidSubmissionModel:
        bid = BidSubmissionModel(
            company_name=company_name,
            position=position,
            worksite=worksite,
            type=type,
            salary=salary,
            benefits=benefits,
            message=message,
        )
        await bid.insert()
        return bid
