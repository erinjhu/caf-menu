#include <vector>
#include <string>
#include <unordered_map>
#include <set>
#include <algorithm>

std::vector<std::string> group_anagrams(std::vector<std::string> strs){
    // sort all the strings
    // hash map with <set of letters, count>

    // iterate through the array
        // sort the string
        // if it's in the map
            // increase the count
        // else
            // add it to the map and set the count to 1
    // put the map back into an array and return the array
    std::unordered_map<std::string, int> map;
    for(int k{}; k < strs.size(); k++){
        std::string str;
        std::sort(str.begin(), str.end());
        if(map.find(str) != map.end()){
            map[str]++;
        }else{
            map.insert({str, 1});
        }

    }
    std::vector<std::string> return_array{};
    for(auto it = map.begin(); it != map.end(); ++it){
        // store the key of the iterator
        std::string str = it->first;
        // add the key into the array for the number of times in the pair value
        for(int k{}; k < it->second; k++){
            return_array.push_back(str);
        }
    }

    return return_array;
}

int main(){
    
}