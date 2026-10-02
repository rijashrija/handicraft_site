
# Step 1: Add the Inquiry model to models.py

models_code = """# models.py
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id        = Column(Integer, primary_key=True)
    email     = Column(String, unique=True, nullable=False)
    password  = Column(String, nullable=False)         # hashed
    role      = Column(String, default="admin")

class Category(Base):
    __tablename__ = "categories"
    id          = Column(Integer, primary_key=True)
    slug        = Column(String, unique=True, nullable=False)
    label       = Column(String, nullable=False)  # e.g., "Silver Idols"
    title       = Column(String, nullable=False)  # e.g., "Deity Statues"
    description = Column(Text, nullable=False)
    image       = Column(String, nullable=False)  # The cover image
    is_visible  = Column(Boolean, default=True, server_default="1")
    products = relationship("Product", back_populates="category")
    def __str__(self):
        return self.label


class Product(Base):
    __tablename__ = "products"
    id            = Column(Integer, primary_key=True)
    slug          = Column(String, unique=True, nullable=False)
    name          = Column(String, nullable=False)
    category_id   = Column(Integer, ForeignKey("categories.id"), nullable=True)
    category      = relationship("Category", back_populates="products")
    category_label = Column(String)
    material      = Column(String)
    stones        = Column(String)
    weight        = Column(String)
    dimensions    = Column(String)
    finish        = Column(String)
    image         = Column(String)
    images        = Column(Text)         # JSON array as string
    short_desc    = Column(Text)
    description   = Column(Text)
    cultural_note = Column(Text)
    featured      = Column(Boolean, default=False)
    is_visible    = Column(Boolean, default=True, server_default="1")
    created_at    = Column(DateTime, server_default=func.now())
    updated_at    = Column(DateTime, onupdate=func.now())

class AboutPage(Base):
    __tablename__ = "about_page"
    id           = Column(Integer, primary_key=True)
    mission      = Column(Text)
    artisan_name  = Column(String)
    artisan_image = Column(String)
    artisan_bio1  = Column(Text)
    artisan_bio2  = Column(Text)
    values        = Column(Text)   # JSON array as string
    process       = Column(Text)   # JSON array as string

class HomePage(Base):
    __tablename__ = "home_page"
    id      = Column(Integer, primary_key=True)
    content = Column(Text)   # entire home.json as JSON string

class ContactInfo(Base):
    __tablename__ = "contact_info"
    id      = Column(Integer, primary_key=True)
    content = Column(Text)   # entire contact.json as JSON string


# NEW: stores every form submission from the website
# When a customer clicks "Submit Inquiry", their data lands here.
# You can view all inquiries in the CMS at /admin.
class Inquiry(Base):
    __tablename__ = "inquiries"
    id         = Column(Integer, primary_key=True)
    reference  = Column(String, unique=True, nullable=False)  # e.g. INQ-A1B2C3
    name       = Column(String, nullable=False)
    email      = Column(String, nullable=False)
    phone      = Column(String, nullable=True)
    country    = Column(String, nullable=True)
    product    = Column(String, nullable=True)   # which product they asked about
    message    = Column(Text, nullable=False)
    is_read    = Column(Boolean, default=False)  # mark as read in CMS
    created_at = Column(DateTime, server_default=func.now())

    def __str__(self):
        return f"{self.reference} - {self.name}"
"""

with open("../handicraft_api/models.py", "w", encoding="utf-8") as f:
    f.write(models_code.lstrip())

print("models.py updated with Inquiry model!")


# Step 2: Update contact.py router to save to DB

contact_code = """from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json
import uuid
from database import get_db
from models import ContactInfo, Inquiry
from schemas import ContactInquiryIn, ContactInquiryOut

router = APIRouter(prefix="/api/v1/contact", tags=["Contact"])


@router.get("/")
def get_contact(db: Session = Depends(get_db)):
    contact = db.query(ContactInfo).order_by(ContactInfo.id.desc()).first()
    return json.loads(contact.content) if contact else {}


@router.post("/inquire", response_model=ContactInquiryOut)
def submit_inquiry(data: ContactInquiryIn, db: Session = Depends(get_db)):
    # By here: Pydantic has already validated everything.
    # data.name, data.email, data.message are guaranteed clean.

    # 1. Generate a unique reference ID
    ref = "INQ-" + uuid.uuid4().hex[:6].upper()

    # 2. Save to database so you can see it in /admin CMS
    #    This is the correct way -- data is PERSISTED, not lost.
    inquiry = Inquiry(
        reference=ref,
        name=data.name,
        email=data.email,
        phone=data.phone,
        country=data.country,
        product=data.product,
        message=data.message,
        is_read=False,        # starts as unread in the CMS
    )
    db.add(inquiry)       # stage the new row
    db.commit()           # write to the database file
    db.refresh(inquiry)   # reload from DB to get generated values (id, created_at)

    # 3. Return confirmation to the frontend
    return ContactInquiryOut(
        success=True,
        message=f"Thank you {data.name}, we will reply to {data.email} shortly.",
        reference=ref,
    )
"""

with open("../handicraft_api/routers/contact.py", "w", encoding="utf-8") as f:
    f.write(contact_code.lstrip())

print("contact.py updated to save to DB!")


# Step 3: Update admin.py to show Inquiry in CMS

import re

with open("../handicraft_api/admin.py", "r", encoding="utf-8") as f:
    admin = f.read()

# Add Inquiry to the import
admin = admin.replace(
    "from models import Product, AboutPage, HomePage, ContactInfo, User, Category",
    "from models import Product, AboutPage, HomePage, ContactInfo, User, Category, Inquiry"
)

# Add InquiryAdmin class before setup_admin
inquiry_admin_class = """
class InquiryAdmin(ModelView, model=Inquiry):
    column_list = [Inquiry.reference, Inquiry.name, Inquiry.email, Inquiry.product, Inquiry.is_read, Inquiry.created_at]
    column_searchable_list = [Inquiry.name, Inquiry.email, Inquiry.reference]
    column_sortable_list = [Inquiry.created_at, Inquiry.is_read]
    form_columns = ["is_read"]   # only allow toggling read status
    can_create = False           # inquiries come from the website form only
    can_delete = True
    name = "Inquiry"
    name_plural = "Inquiries"
    icon = "fa-solid fa-envelope-open-text"

"""

admin = admin.replace("def setup_admin(app):", inquiry_admin_class + "def setup_admin(app):")

# Register InquiryAdmin in setup_admin
admin = admin.replace(
    "    admin.add_view(CategoryAdmin)",
    "    admin.add_view(CategoryAdmin)\n    admin.add_view(InquiryAdmin)"
)

with open("../handicraft_api/admin.py", "w", encoding="utf-8") as f:
    f.write(admin)

print("admin.py updated with InquiryAdmin!")
