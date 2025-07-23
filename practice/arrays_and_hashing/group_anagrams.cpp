#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;


class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {

        vector<vector<string>> return_array;
        int word_count{};

        while(strs.size() != 0){

            vector<string> group_array;

            // put the first word into the anagram group array
            group_array.push_back(strs.front());
            // sort the first word and store it in a variable
            string sort_first_word = strs.front();
            sort(sort_first_word.begin(), sort_first_word.end());
            cout << "sort_first_word: " << sort_first_word << endl;
            // remove the first word from strs
            strs.erase(strs.begin());
            cout << "strs: ";
            cout << "[";
            for (const auto& word : strs) {
                cout << word << ", ";
            }
            cout << "]" << endl;
            cout << "group_array: ";
            cout << "[";
            for (const auto& word : group_array) {
                cout << word << ", ";
            }
            cout << "]" << endl;
            word_count++;
            // compare the first word to the rest of the words in strs
            for (int k{}; k < strs.size(); k++) {
                string sort_word = strs[k];
                sort(sort_word.begin(), sort_word.end());
                cout << "sort_word: " << sort_word << endl;
                // if the sorted word matches the sorted first word
                if(sort_word == sort_first_word){
                    // add the ptr word to the group array
                    group_array.push_back(strs[k]);
                    strs.erase(strs.begin() + k);
                    cout << "updated group_array: ";
                    cout << "[";
                    for (const auto& word : group_array) {
                        cout << word << ", ";
                    }
                    cout << "]" << endl;
                }
            }
            // add group array to return array
            return_array.push_back(group_array);
            cout << "updated return array" << endl;
            for (const auto& group : return_array) {
                cout << "[";
                for (const auto& word : group) {
                    cout << word << ", ";
                }
                cout << "],";
            }
            cout << endl;

        }

        return return_array;
    }
};

int main() {
    Solution sol;
    vector<string> strs = { "cat", "nob", "tac", "bar", "atc", "rab", "bon" };

    cout << "original array" << endl;
    for (const auto& word : strs) {
            cout << word << " ";
    }
    cout << endl;

    vector<vector<string>> grouped = sol.groupAnagrams(strs);
    cout << "final array" << endl;
    for (const auto& group : grouped) {
        for (const auto& word : group) {
            cout << word << " ";
        }
    }
    cout << endl;
}