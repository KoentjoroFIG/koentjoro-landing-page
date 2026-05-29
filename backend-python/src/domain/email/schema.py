from pydantic import BaseModel, EmailStr


class ContactFormSchema(BaseModel):
    name: str
    email: EmailStr
    message: str


class BidFormSchema(BaseModel):
    company_name: str
    position: str
    worksite: str
    type: str
    salary: str
    benefits: list[str] = []
    message: str = ""


class EmailResponse(BaseModel):
    success: bool
    message: str
