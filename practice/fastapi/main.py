from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from supabase_client import supabase
from typing import List
from database import SessionLocal
from models import DBItem
from datetime import timedelta
from auth import create_access_token, get_current_user

app = FastAPI()

items = [
    {"name": "Pizza", "price": 10, "locations": ["REV", "V1"]},
    {"name": "Burger", "price": 8, "locations": ["CMH"]},
    {"name": "Salad", "price": 7, "locations": ["REV", "QNC"]}
]


# --------- MENU ITEMS ---------

# Item class
class Item(BaseModel):
    name: str 
    price: int 
    locations: List[str]

# Home
@app.get("/")
def root():
    return {"Hello" : "World"}

# View all menu items
@app.get("/items")
def view_items():
    db = SessionLocal()
    items = db.query(DBItem).order_by(DBItem.id.asc()).all()
    db.close()
    return items

# Submit menu items
@app.post("/items")
def submit_item(item: Item, user: str = Depends(get_current_user)):
    db = SessionLocal()
    db_item = DBItem(
        name = item.name,
        price = item.price,
        location = item.locations
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    db.close()
    return db_item

# Delete menu items
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    items.pop(item_id)
    return {"message" : "{item_id} : {item.name}  deleted"}

# Edit menu items
@app.put("/items/{item_id}")
def edit_item(item_id: int, item: Item):
    items[item_id] = item.model_dump()
    return items

# --------- USER ACCOUNTS ---------

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Register user
@app.post("/register")
def register_user(request: RegisterRequest):
    try:
        result = supabase.auth.sign_up({"email": request.email, "password": request.password})
        if not result.user:
            raise HTTPException(status_code=400, detail="Registration failed.")
        return {"message": "Registration successful. Please check your email for verification."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Login
@app.post("/login")
def login_user(request: LoginRequest):
    result = supabase.auth.sign_in_with_password({"email": request.email, "password": request.password})
    if not result.user:
        raise HTTPException(status_code=400, detail="Registration failed.")
    access_token = create_access_token(data={"sub": request.email})
    return {"access_token": access_token, "token_type" : "bearer"}