#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

// The LeetCode problem "Top K Frequent Elements" asks 
// you to find the k most frequent elements in a given integer array. 
// The output should be a list containing these k elements, and the order within the list doesn't matter. 
// Example:
// For the input nums = [1,1,1,2,2,3] and k = 2, the output should be [1, 2] because 1 and 2 are the two most frequent elements. 

vector<int> topk(vector<int> nums, int k){
    // hash map < int, # of appearances>
    unordered_map<int, int> map;
    vector<int> maxs(k,0);
    // iterate through the vector
    for(int num : nums) {
        // add to the hash map
        map[num]++;
        cout << "map[" << num << "]: " << map[num] << endl;
        // store a variable for the highest keys
        // for (auto it = maxs.begin(); it != maxs.end(); it++) {
        //     if(map[num] > maxs[*it]){
        //         maxs[*it] = num;
        //     }
        // }
    }
    return maxs;
}

int main(){
    vector<int> test = {1,1,2,2,3,3,3,4,4,5,5,5,5};
    vector<int> result = topk(test, 5);
    for(int num : result) {
        cout << num << ", ";
    }
}

