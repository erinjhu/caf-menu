# PS C:\Users\Hu\Desktop\projects\caf-menu\practice\fastapi\tutorial> 
# Source - FastAPI Course for Beginners https://youtu.be/tLKKmouUams?si=4hVanmFZyZQOozX8 



from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

class Student(BaseModel):
    name: str
    age: int
    year: str

class UpdateStudent(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    year: Optional[str] = None

students = {
    1: {
        "name": "john",
        "age": 17,
        "year": "year 12"
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

@app.post("/create-student/{student_id}")
def create_student(student_id : int, student : Student):
    if student_id in students:
        return {"Error" : "Student exists"}
    students[student_id] = student
    return students[student_id]

@app.put("/update-student/{student_id}")
def update_student(student_id: int, student: UpdateStudent):
    if student_id not in students:
        return {"Error":"Student does not exist"}
    
    if student.name != None:
        students[student_id]["name"] = student.name

    if student.name != None:
        students[student_id]["age"] = student.age

    if student.name != None:
        students[student_id]["year"] = student.year

    return students[student_id]

@app.delete("/delete-student/{student_id}")
def delete_student(student_id: int):
    if student_id not in students:
        return {"Error" : "Student does not exist"}
    
    del students[student_id]
    return {"Message" : "Student deleted"}