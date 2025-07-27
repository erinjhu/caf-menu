#include <vector>
#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> preprod{};
        vector<int> sufprod(nums.size());
        vector<int> except(nums.size());
        // iterate from left to right
        for(size_t i{}; i < nums.size(); i++){
            // store prefix products excluding current index
            cout << "loop: " << endl;
            if(i == 0){
                preprod.push_back(1);
            } else {
                cout << "i: " << i << endl;
                preprod.push_back(preprod[i-1] * nums[i-1]);
                cout << preprod[i-1] << "*" << nums[i-1] << endl;
            }
            
        }
        cout << "preprod" << endl;
        for(size_t j{}; j < preprod.size(); j++) {
            cout << "preprod[" << j << "]: " << preprod[j] << endl;
        }


        // iterate from right to left
        for(int l{(int)nums.size() - 1}; l >= 0; l--){
            // store suffix products excluding curren index
            if(l == nums.size() - 1){
                sufprod[l] = 1;
            } else {
                cout << sufprod[l+1] << "*" << nums[l+1] << endl;  
                sufprod[l]=sufprod[l+1]*nums[l+1];
                cout << "l: " << l << endl;
                              
            }
        }
        cout << "sufprod" << endl;
        for(size_t j{}; j < sufprod.size(); j++) {
            cout << "sufprod[" << j << "]: " << sufprod[j] << endl;
        }


        // multiply the prefix product by the suffix product
        for(int a{}; a < nums.size(); a++){
            except[a] = preprod[a] * sufprod[a];
        }

        return except;
    }
};

int main(){

    Solution sol;
    //vector<string> strs = {"1,23","45,6","7,8,9"};
    vector<int> nums = {1,2,4,6};
    vector<int> result = sol.productExceptSelf(nums);

    cout << "result" << endl;
    for(int num  : nums) {
        cout << num << endl;
    }

    
    return 0;
}
