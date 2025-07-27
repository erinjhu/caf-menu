#include <string>
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:

    string encode(vector<string>& strs) {
        string encoded;
        for (string str : strs) {
            encoded += to_string(str.length());
            encoded += "#";
            encoded += str;
            cout << encoded << endl;
        }
        return encoded;
    }

    vector<string> decode(string s) {
            vector<string> decoded = {};
            for(size_t i = 0; i < s.length(); ){
                string count_str = "";
                while(s[i] != '#'){
                    count_str += s[i];
                    i++;
                    cout << "count_str: " << count_str << endl;
                }
                int count = stoi(count_str);
                cout << "count: " << count << endl;
                string word = "";
                i++;
                size_t i2 = i;
                for(size_t k{i2}; k < i2 + count; k++ ){
                    word += s[k];
                    cout << "word in loop: "<< word << endl;
                    i++;
                }
                cout << "word: "<< word << endl;
                decoded.push_back(word);
            }
            return decoded;
    }
};

int main(){

    Solution sol;
    //vector<string> strs = {"1,23","45,6","7,8,9"};
    vector<string> strs = {"we","say",":","yes","!@#$%^&*()"};
    vector<string> result = sol.decode(sol.encode(strs));

    cout << "result" << endl;
    for(string str : result) {
        cout << str << endl;
    }

    
    return 0;
}