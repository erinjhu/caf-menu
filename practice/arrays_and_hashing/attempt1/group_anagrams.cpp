#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;


#include <unordered_map>
using namespace std;
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // hash map <sorted word, array of original groups>
        unordered_map<string, vector<string>> map;

        // iterate through strs
        for(const string &str : strs) {
            // add the first word to hash map after sorting it
            string sorted = str;
            sort(sorted.begin(), sorted.end());
            cout << "sorted: " << sorted << endl;

            map[sorted].push_back(str);
        
    }
    vector<vector<string>> return_array;
    for(auto it = map.begin(); it != map.end(); it++) {
        return_array.push_back(map[it->first]);
    }
    return return_array;
    }
};

int main(){
    vector<string> strs = {"eat","tea","tan","ate","nat","bat"};
    Solution sol;
    vector<vector<string>> final = sol.groupAnagrams(strs);
    cout << "final answer: " << endl;
    for(auto inner : final){
        cout << "[ ";
        for(auto word: inner){
            cout << word << ",";
        }
        cout << "], ";
    }
    return 0;
}