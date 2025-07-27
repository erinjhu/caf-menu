#include <unordered_map>
#include <string>
#include <iostream>

int main() {
    std::unordered_map<std::string, int> age;

    age["Alice"] = 20;
    age["Bob"] = 25;

    age.insert({"Charlie", 30});

    std::cout << age["Alice"] << std::endl; 

    if (age.find("Alice") != age.end()) {
        std::cout << "Alice is in the map" << std::endl;
    }

    for (const auto& pair : age) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }

    age.erase("Bob");
}

