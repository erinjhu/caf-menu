from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    text: str = None
    is_done: bool = False

items = []

@app.get("/")
def root():
    return {"Hello" : "World"}

@app.post("/items")
def create_item(item: Item):
    items.append(item)
    return items

@app.get("/items", response_model=list[Item])
def list_items(limit: int = 10):
    return items[0:limit]

@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int) -> Item:
    if item_id < len(items):
        return items[item_id]
    else:
        raise HTTPException(status_code=404, detail=f"Item {item_id} not found")

# References
# Python FastAPI Tutorial: Build a REST API in 15 Minutes https://www.youtube.com/watch?v=iWS9ogMPOI0

# Start the server

# Add an item
# curl -X POST -H "Content-Type: application/json" 'http://127.0.0.1:8000/items?item=apple'
# curl -X POST -H "Content-Type: application/json" -d '{"text":"apple"}' 'http://127.0.0.1:8000/items'

# Get a specific item
# curl -X GET http://127.0.0.1:8000/items/0

# Get the list of items
# curl -X GET http://120.0.0.1:8000/items?limit=3

