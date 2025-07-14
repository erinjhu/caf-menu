# PS C:\Users\Hu\Desktop\projects\caf-menu\practice\fastapi\tutorial> 

from fastapi import FastAPI, Path
from typing import Optional
app = FastAPI()

students = {
    1: {
        "name": "john",
        "age": 17,
        "class": "year 12"
    }
}

@app.get("/")
def index():
    return {"name" : "data"}

# path parameter
@app.get("/get-student/{student_id}")
def get_student(student_id: int = Path(..., description="The ID of student to view", gt=0, lt=3)):
    return students[student_id]

# query parameter
@app.get("/get-by-name")
def get_student(*, name: Optional[str] = None, test : int): # can't put an optional argument before a required one
    for student_id in students:
        if students[student_id]["name"] == name:
            return students[student_id]
    return {"Data" : "Not found"}

# query and path parameters
@app.get("/get-by-name/{student_id}")
def get_student(*, student_id: int, name: Optional[str] = None, test : int): # can't put an optional argument before a required one
    for student_id in students:
        if students[student_id]["name"] == name:
            return students[student_id]
    return {"Data" : "Not found"}