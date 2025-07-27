
testArray1 = [1, 7, 8, 4, 5]

// testing

console.log( containsDuplicate(testArray1))


// attempt 1

function containsDuplicate(nums) {
    // sort the array
    nums.sort()
    console.log(nums.sort())
    // cycle through and return if matching
    for ( let i = 0; i < nums.length; i++) {
        console.log(i)
        if ( nums[i] == nums[i + 1]) {
            return true
        }
    }
    return false
}