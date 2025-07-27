// 1. Array Filtering
// Given an array of numbers, write code to create 
// a new array containing only the even numbers.
array1 = [1, 2, 3, 29, 40]
function evenArray (givenArray) {
    returnArray = []
    for (item in givenArray) {
        if (item % 2 == 0) {
            returnArray.push(item)
        }
    }
    return returnArray
}
console.log(evenArray(array1))


// 2. Array Mapping
// Given an array of strings, write code to create 
// a new array where each string is uppercased.
array2 = ["hsdifh", "a", "0"]
function upperCaseArray (givenArray) {
    return givenArray.map ( item => 
        item.toUpperCase()
    )
}
console.log(upperCaseArray(array2))

// 3. Find in Array
// Given an array of objects with a "name" property, write code to find 
// the first object whose name is "Alice".


// 4. Object to Array
// Given an object like { a: 1, b: 2, c: 3 }, write code to create an array of its values.


// 5. Remove Duplicates
// Given an array of numbers, write code to create a new array with all duplicates removed.


// 6. Sum of Array
// Given an array of numbers, write code to calculate the sum of all the numbers.


// 7. Reverse a String
// Write a function that takes a string and returns the string reversed.


// 8. Merge Arrays
// Given two arrays, write code to merge them into one array with all elements.


// 9. Count Occurrences
// Given an array of strings, write code to count how many times each string appears (return an object with the counts).


// 10. Filter by Property
// Given an array of objects with an "active" boolean property, write code to return only the objects where active is true.