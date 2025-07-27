#include <vector>
#include <iostream>
#include <string>
#include <unordered_set>

using namespace std;

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        // clarify the hint about square index

        // hash sets for rows, columns, squares
        // index for eqch square(row / 3) * 3 + (col / 3)
        // insert number into hash set with o(1) lookup

        // create hash sets
        vector<unordered_set<char>> rows(9);
        vector<unordered_set<char>> cols(9);
        vector<unordered_set<char>> squares(9);

        // iterate through the rows, for loop
        for(int row{}; row < 9; row++){
            // iterate within each row
            for(int col{}; col < 9; col++){

                // if the element is already there (find())
                if((rows[row].find(board[row][col]) != rows.end() || cols[col].find(board[row][col])) != board.end()){
                // in either of the 3 hash sets
                    // return false
                    return false;
                }
                // else
                else {
                    rows[row].push_back(board[row][col]);
                    // add to row hash set
                    // add to col hash set
                    // add to square hash set
                }
            }
        }
        return true;

    }
};

int main(){

    Solution sol;
    //vector<string> strs = {'1,23','45,6','7,8,9'};
    vector<vector<char>> board = {
    {'5','3','.','.','7','.','.','.','.'},
    {'6','.','.','1','9','5','.','.','.'},
    {'.','9','8','.','.','.','.','6','.'},
    {'8','.','.','.','6','.','.','.','3'},
    {'4','.','.','8','.','3','.','.','1'},
    {'7','.','.','.','2','.','.','.','6'},
    {'.','6','.','.','.','.','2','8','.'},
    {'.','.','.','4','1','9','.','.','5'},
    {'.','.','.','.','8','.','.','7','9'}
};





{{'1','2','.','.','3','.','.','.','.'},
 {'4','.','.','5','.','.','.','.','.'},
 {'.','9','8','.','.','.','.','.','3'},
 {'5','.','.','.','6','.','.','.','4'},
 {'.','.','.','8','.','3','.','.','5'},
 {'7','.','.','.','2','.','.','.','6'},
 {'.','.','.','.','.','.','2','.','.'},
 {'.','.','.','4','1','9','.','.','8'},
 {'.','.','.','.','8','.','.','7','9'}};
    vector<int> result = sol.productExceptSelf(nums);

    vector<vector<char>> board = { {'.','.'},{'.','.'}};

    cout << 'result' << endl;
    for(int num  : nums) {
        cout << num << endl;
    }

    
    return 0;
}
