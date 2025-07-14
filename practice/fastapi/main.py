from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

items = [
    {"name": "Pizza", "price": 10, "locations": ["REV", "V1"]},
    {"name": "Burger", "price": 8, "locations": ["CMH"]},
    {"name": "Salad", "price": 7, "locations": ["REV", "QNC"]}
]

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
    return items

# Submit menu items
@app.post("/items")
def submit_item(item: Item):
    items.append(item)
    return item

# Delete menu items
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    items.pop(item_id)
    return {"message" : "{item_id} : {item.name}  deleted"}

# Edit menu items
@app.put("/items/{item_id}")
def edit_item(item_id: int, item: Item):
    items[item_id] = item.dict()
    return items