#include <unordered_map>

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<vector<int>, vector<string>> result;
        for (string str : strs){
            vector<int> count(26,0); // 26 zeros

            for(char c : str){
                count[c - 'a']++;
            }

            result[count].append(str);
        }

        vector<vector<string>> return_result;
        for(const auto item : result) {
            return_result.push_back(item.second);
        }
        return return_result;
    }
};
