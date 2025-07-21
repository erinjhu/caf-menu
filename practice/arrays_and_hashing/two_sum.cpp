#include <unordered_map>
#include <string>
#include <iostream>
#include <algorithm>
#include <vector>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        std::unordered_map<int,int> map;
        for(int k{}; k < nums.size(); k++){
            if (map.find(target - nums[k]) == map.end()) {
                return {map[target - nums[k]], target - nums[k]};
            }
        }

       
        return {};
    }
};

int main() {
    Solution sol;
}