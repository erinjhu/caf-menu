#include <unordered_map>
#include <string>
#include <iostream>
#include <algorithm>

class Solution {
public:
    bool isAnagram(std::string s, std::string t) {
        std::unordered_map<char, int> map_s;
        std::unordered_map<char, int> map_t;
        for(int k{0}; k < s.length(); k++){
            // chekc if it's already in it
            if(map_s.find(s[k]) != map_s.end()){
                map_s[s[k]]++;
            } 
            // if not, add it
            else {
                map_s.insert({s[k],1});
            }
        }
        for(int k{0}; k < t.length(); k++){
            // chekc if it's already in it
            if(map_t.find(t[k]) != map_t.end()){
                map_t[t[k]]++;
            } 
            // if not, add it
            else {
                map_t.insert({t[k],1});
            }
        }
        return map_s == map_t;
    }
};

int main() {
    Solution sol;
    std::cout << sol.isAnagram("hello", "hellp");
}