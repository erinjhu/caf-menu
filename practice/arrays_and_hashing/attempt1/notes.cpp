#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    std::unordered_map<std::string, int> myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    myMap["orange"] = 3;

    // Get an iterator to an element
    auto it = myMap.find("banana");

    // Check if the element was found
    if (it != myMap.end()) {
        // Store the key into a std::string
        std::string keyString = it->first;

        std::cout << "The key is: " << keyString << std::endl;
    } else {
        std::cout << "Key not found." << std::endl;
    }

    // Example with a loop to iterate through all keys
    std::cout << "\nAll keys in the map:" << std::endl;
    for (const auto& pair : myMap) {
        std::string currentKey = pair.first;
        std::cout << currentKey << std::endl;
    }

    return 0;
}


#include <iostream>
#include <unordered_map>
#include <vector>

int main2() {
    // 1. Create an unordered_map
    std::unordered_map<std::string, int> myMap;
    myMap["apple"] = 1;
    myMap["banana"] = 2;
    myMap["orange"] = 3;

    // 2. Create a 1D array (std::vector) to store the keys
    std::vector<std::string> keysArray;

    // 3. Iterate through the unordered_map and add keys to the vector
    for (const auto& pair : myMap) {
        keysArray.push_back(pair.first); // pair.first is the key
    }

    // Optional: Print the keys in the array
    std::cout << "Keys in the array:" << std::endl;
    for (const auto& key : keysArray) {
        std::cout << key << std::endl;
    }

    return 0;
}