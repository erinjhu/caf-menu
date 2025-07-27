// 1. Array Methods
// Given an array of locations: ["REV", "V1", "CMH"], write a line of code to create a 
// new array with only the locations that are not "V1".
const locations = ["REV", "V1", "CMH"]
const loc_elim = "V1"
const new_array = locations.filter(loc => loc != loc_elim)
console.log(new_array)


// 2. State Management
// Describe what happens when you call setSelectedLocations
// ([...selectedLocations, "QNC"]) in your component.
// it will add QNC string to the array

// 3. Grouping Items
// Given an array of items with name and location, 
// how would you group them so that each unique name has an array of all its locations?

console.log("Q3")

const given_array = [
  { name: "Pizza", location: "REV" },
  { name: "Pizza", location: "V1" },
  { name: "Burger", location: "CMH" }
]

var grouped = {}

for (item of given_array) {
    if(grouped[item.name]) {
        // add a location for that item
        grouped[item.name].push(item.location)
    }else{
        // add that item to grouped[]
        grouped[item.name] = [item.location]
    }
}

console.log(grouped)

// 4. Filtering
// Write a function that takes an array of items and a search string, 
// and returns only the items whose name includes the search string (case-insensitive).
function filtering (givenArray, search) {
    var returnArray = []
    for (item of givenArray) {
        if ( item.toLowerCase().includes(search.toLowerCase() ) ) {
            returnArray.push(item)
        }
    }
    return returnArray
}

array4 = ["hihiih", "hhoi", "hi", "iih"]
console.log(filtering(array4, "hi"))

