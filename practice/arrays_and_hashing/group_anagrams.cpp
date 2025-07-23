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
            string sorted_first_word = strs.front();
            sort(sorted_first_word.begin(), sorted_first_word.end());
            cout << "sorted_first_wprd: " << sorted_first_word << endl;
            vector<string> insert_array;
            insert_array.push_back(strs.front());
            map.insert({sorted_first_word, insert_array});
            cout << "map: " << endl;
            for( auto it : map) {
                cout << it.first << " | ";
                for(auto str : it.second) {
                    cout << str << ",";
                } 
            }
            cout << endl;
            // remove the first word from strs
            strs.erase(strs.begin());
            // compare the first word in the hash map to the rest 
            for(int k{}; k < strs.size(); k++){
                string sorted_next_word = strs[k];
                sort(sorted_next_word.begin(), sorted_next_word.end());
                cout << "comparing " << strs[k] << endl;
            // if the sorted word matches, put in the same hash map slot
                if(sorted_next_word == sorted_first_word){
                    map[sorted_first_word].push_back(strs[k]);
                }
            }
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