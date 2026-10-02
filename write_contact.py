
contact_code = """from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import json
import uuid
from database import get_db
from models import ContactInfo
from schemas import ContactInquiryIn, ContactInquiryOut

router = APIRouter(prefix="/api/v1/contact", tags=["Contact"])


@router.get("/")
def get_contact(db: Session = Depends(get_db)):
    contact = db.query(ContactInfo).order_by(ContactInfo.id.desc()).first()
    return json.loads(contact.content) if contact else {}


# ----------------------------------------------------------------
# POST /api/v1/contact/inquire
#
# HOW PYDANTIC PLUGS INTO FASTAPI:
#
# Step 1: Client sends a POST request with a JSON body.
# Step 2: FastAPI sees the `data: ContactInquiryIn` parameter.
# Step 3: FastAPI passes the raw JSON into Pydantic automatically.
# Step 4: Pydantic runs ALL the validators (Field constraints,
#         @field_validator, @model_validator) in order.
# Step 5a: If valid   → your function receives a clean `data` object.
# Step 5b: If invalid → FastAPI returns HTTP 422 Unprocessable Entity
#          with a detailed JSON error — you write ZERO error handling!
#
# The response_model=ContactInquiryOut tells FastAPI:
#   "Validate and serialize the return value through this schema."
#   Any extra fields on the dict/object you return are STRIPPED OUT.
# ----------------------------------------------------------------
@router.post("/inquire", response_model=ContactInquiryOut)
def submit_inquiry(data: ContactInquiryIn):
    # By the time we get here, ALL validation has already passed.
    # `data` is a fully validated, type-safe Python object.
    # data.name, data.email, data.message are guaranteed to be clean.

    # Generate a short reference ID for this inquiry
    ref = "INQ-" + uuid.uuid4().hex[:6].upper()

    # In a real app you would:
    #   - Save to database
    #   - Send an email notification
    #   - Log the inquiry
    # For now we just acknowledge it.
    print(f"[Inquiry {ref}] From: {data.email} | Message: {data.message[:50]}...")

    # Return shape must match ContactInquiryOut schema
    return ContactInquiryOut(
        success=True,
        message=f"Thank you {data.name}, we will reply to {data.email} shortly.",
        reference=ref,
    )
"""

with open("../handicraft_api/routers/contact.py", "w", encoding="utf-8") as f:
    f.write(contact_code.lstrip())

print("contact.py updated!")
