
schemas_content = """# schemas.py
from pydantic import BaseModel, EmailStr, field_validator, model_validator, Field
from typing import Optional, List


class CategoryOut(BaseModel):
    id: int
    slug: str
    label: str
    is_visible: bool = True

    class Config:
        from_attributes = True


class ProductListOut(BaseModel):
    id: int
    slug: str
    name: str
    category_id: Optional[int] = None
    category: Optional[CategoryOut] = None
    category_label: Optional[str] = None
    image: str
    featured: bool
    is_visible: bool = True

    class Config:
        from_attributes = True


class ProductDetailOut(ProductListOut):
    material: str
    stones: Optional[str]
    weight: str
    dimensions: str
    finish: str
    images: List[str]
    short_desc: str
    description: str
    cultural_note: str


class ProductIn(BaseModel):
    slug: str
    name: str
    category: str
    category_label: str
    material: str
    stones: Optional[str] = None
    weight: str
    dimensions: str
    finish: str
    image: str
    images: List[str]
    short_desc: str
    description: str
    cultural_note: str
    featured: bool = False
    is_visible: bool = True


class AboutOut(BaseModel):
    mission: str
    artisan: dict
    values: list
    process: list


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# ================================================================
# PYDANTIC VALIDATION TEACHING EXAMPLE
# Pydantic is to Python what Zod is to TypeScript.
# FastAPI automatically uses it on every request body.
# ================================================================

# STEP 1: Basic types
#   str            = required string (must be provided)
#   Optional[str]  = string OR None  (field can be omitted)
#   = None         = gives field a default, making it optional

# STEP 2: Field() adds constraints + metadata
#   ...            = Ellipsis = field is REQUIRED (no default)
#   min_length=2   = string must be at least 2 chars
#   max_length=100 = string must be at most 100 chars
#   description    = shows in the /docs Swagger UI

# STEP 3: EmailStr
#   A special Pydantic type that validates email format.
#   Same concept as z.string().email() in Zod.


class ContactInquiryIn(BaseModel):
    # REQUIRED fields -- ... means no default, client must send these
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Customer full name",
    )

    email: EmailStr = Field(
        ...,
        description="Pydantic validates email format automatically",
    )

    # OPTIONAL fields -- client can omit these entirely
    phone: Optional[str] = Field(default=None, max_length=30)
    country: Optional[str] = Field(default=None, max_length=60)
    product: Optional[str] = Field(default=None, max_length=200)

    message: str = Field(
        ...,
        min_length=10,
        max_length=2000,
        description="Inquiry details, at least 10 characters",
    )

    # STEP 4: @field_validator -- custom single-field logic
    #
    # Runs AFTER the basic type/Field checks pass.
    # Whatever you RETURN becomes the stored cleaned value.
    # If you raise ValueError, FastAPI returns a 422 response
    # with your custom message.
    @field_validator("name", mode="after")
    @classmethod
    def name_must_have_letters(cls, v: str) -> str:
        v = v.strip()
        if not any(c.isalpha() for c in v):
            raise ValueError("Name must contain at least one letter")
        return v  # return the cleaned/stripped value

    @field_validator("phone", mode="after")
    @classmethod
    def phone_format(cls, v: Optional[str]) -> Optional[str]:
        if not v:
            return v  # skip validation for empty/None optional fields
        v = v.strip()
        allowed_chars = set("0123456789 +-() ")
        if not all(c in allowed_chars for c in v) or len(v) < 7:
            raise ValueError("Phone must be a valid number e.g. +977 980 123 4567")
        return v

    @field_validator("message", mode="after")
    @classmethod
    def message_not_spam(cls, v: str) -> str:
        v = v.strip()
        if len(v.split()) < 3:
            raise ValueError("Message must contain at least 3 words")
        return v

    # STEP 5: @model_validator -- cross-field validation
    #
    # @field_validator sees ONE field at a time.
    # @model_validator sees ALL fields simultaneously.
    # Use it when a rule depends on two or more fields together.
    @model_validator(mode="after")
    def require_contact_method(self) -> "ContactInquiryIn":
        # Business rule: we need at least email OR phone to reply
        if not self.email and not self.phone:
            raise ValueError("Provide at least an email or phone to contact you")
        return self


# STEP 6: Separate Output schema (what we send BACK to the client)
#
# Best practice: never reuse your input schema for output.
# ContactInquiryIn  = strict validation of what client sends us
# ContactInquiryOut = safe, curated data we send back
class ContactInquiryOut(BaseModel):
    success: bool
    message: str
    reference: str   # e.g. "INQ-00042" -- safe echo-back reference
"""

with open("../handicraft_api/schemas.py", "w", encoding="utf-8") as f:
    f.write(schemas_content.lstrip())

print("schemas.py written successfully!")
