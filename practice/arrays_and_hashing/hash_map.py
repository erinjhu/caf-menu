class Pair:
    def __init__(self, key, val):
        self.key = key
        self.val = val

class HashMap:
    def __init__(self):
        self.size = 0 # how many key-value pairs in the map
        self.capacity = 2 # how many key-value slots in array
        self.map = [None, None] # array

        # example of a hash function
        # simple but may have lots of collisions
    def hash(self, key):
        index = 0
        for c in key: # go through all the chars in key
            index += ord(c) # index becomes the total of the ascii values
        return index % self.capacity # the index is the modulus of the sum of ascii values

    def get(self, key):
        # use the hash function to find what index it should be at
        index = self.hash(key)
        # do the loop until the index is available
        while self.map[index] != None:
            # if the key at the index is your key, return its value
            if self.map[index].key == key:
                return self.map[index].val
            # if the key doesn't match, check the next index
            index += 1
            # go to the start if you reach the end
            index = index % self.capacity
        # if it doesn't find a value for the key
        return None
    
    def put(self, key, val):
        # assign an index based on the key
        index = self.hash(key)
        while True:
            # if that array slot is empty
            if self.map[index] == None:
                # assign the slot with the pair
                self.map[index] = Pair(key, val)
                # update the size
                self.size += 1
                # resize if the number of items is at least half the capacity
                if self.size >= self.capacity // 2: ## // is for integer (floor) division, / is for floats
                    self.rehash()
                return
            # if the array slot is not empty and the key matches
            elif self.map[index].key == key:
                # update the value for the key
                self.map[index].val = val
                return
            # each time the loop runs, do the next index or wrap around to the start
            index += 1
            index = index % self.capacity

    def rehash(self):
        self.capacity = 2 * self.capacity
        newMap = []
        for i in range(self.capacity):
            newMap.append(None)
        oldMap = self.map
        self.map = newMap
        self.size = 0
        for pair in oldMap:
            if pair:
                self.put(pair.key, pair.val)