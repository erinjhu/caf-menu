import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Alert, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

import { styles } from './styles'
import { fetchMenuItems, addMenuItem, filterItems, toggleLocationInArray, groupItemsByName  } from './functions/menuApi'
import { WATERLOO_LOCATIONS } from './constants/locations'

type MenuItem = {
    id: number;
    name: string;
    price: number;
    location: string;
    last_updated?: string;
};


// Create React component, main component to display
export default function HomeScreen() {
    // Functions to store and update data
    // useState makes React re-render it when it changes

    // Data
    const [items, setItems] = useState<MenuItem[]>([])
    const [itemName, setItemName] = useState('')
    const [price, setPrice] = useState('')
    //const [location, setLocation] = useState('')
    const [searchText, setSearchText] = useState('')
    const [selectedLocations, setSelectedLocations] = useState<string[]>([])

    // Actions
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

    // This hook calls fetChItems once when the app first loads
    useEffect(() => {
        fetchItems()
    }, [])

    // Get request to endpoint, extract items, and turn off loading msg
    // Only update the items if it's able to get the data from the backend
    const fetchItems = async () => {
        try {
            const items = await fetchMenuItems()
            setItems(items)
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch items')
        }
        setLoading(false)
    }

    const addItem = async () => {

        if (!itemName || !price || selectedLocations.length === 0) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        const nameExists = items.some(item => item.name.toLowerCase() === itemName.toLowerCase());
        if (nameExists) {
            Alert.alert('Error', 'An item with this name already exists. Please edit it instead.');
            return;
        }


        setIsAdding(true)

        try {
            await addMenuItem(itemName, parseFloat(price), selectedLocations)
            Alert.alert('Success', 'Item added successfully!')

            // Clear and refresh
            setItemName('')
            setPrice('')
            setSelectedLocations([])
            fetchItems()

        } catch (error) {
            Alert.alert('Error', 'Failed to add item')
        } finally {
            setIsAdding(false)
        }
    }

    const updateItem = async () => {
        if(!editingItem) return

        try {
            const existingItems = items.filter(i => i.name === editingItem.name)

            for (const item of existingItems) {
                if (!selectedLocations.includes(item.location)) {
                    await axios.delete(
                        `http://localhost:3000/api/items/${item.id}`
                    )
                }
            }

            // If the location exists, update it. Otherwise, add it.
            for (const location of selectedLocations) {
                const existing = existingItems.find(i => i.location === location);
                if (existing) {
                    await axios.put (
                        `http://localhost:3000/api/items/${editingItem.id}`,
                        {
                            itemName,
                            price: parseFloat(price),
                            location,
                        }
                    )
                } else {
                    await axios.post(
                        `http://localhost:3000/api/items`,
                        {
                            itemName,
                            price: parseFloat(price),
                            locations: [location], // assuming your backend expects an array
                        }
                    );
                }
            }
            Alert.alert('Success', 'Item updated!');
            setEditingItem(null);
            setItemName('');
            setPrice('');
            setSelectedLocations([]);
            fetchItems();
        } catch (error) {
            Alert.alert('Error', 'Failed to update item')
        }
    }

    const clearSearch = () => {
        setSearchText('')
    }



    // Styles for each item
    const renderItem = ({ item } : { item: any }) => {
        return ( 
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <Text style={styles.itemLocation}>
                    Locations: {item.locations.join(', ')}
                </Text>
                <Text style={styles.itemDate}>
                    Last updated: {new Date(item.last_updated).toLocaleString()}
                </Text>
            </View>
        )
    }

    const filteredItems = filterItems(items, searchText)
    const groupedItems = groupItemsByName(items)


    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading menu items...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cafeteria Menu</Text>

            <TextInput 
                style={styles.input}
                placeholder="Iten name"
                value={itemName}
                onChangeText={setItemName}
                placeholderTextColor={'#CBCBCB'}
            />
            {itemName.length > 0 && (
                <View style={{marginBottom: 8}}>
                    {items
                        .filter(
                            (item) => 
                                item.name.toLowerCase().includes(itemName.toLowerCase())
                        )
                        .map((item) => (
                            <Text 
                            key={item.id} 
                            style={{color: '#888', fontSize: 12}}
                            onPress={() => {
                                setEditingItem(item);
                                setItemName(item.name);
                                setPrice(item.price.toString());
                                setSelectedLocations(
                                    // filter to items with the same name, then get an array with just the locations
                                    items.filter(i => i.name === item.name).map(i => i.location)
                                );
                            }}
                            >
                                {item.name} ({item.location})
                            </Text>
                        ))
                    }
                </View>
            )}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8}}>
                {selectedLocations.map(loc => (
                    <TouchableOpacity
                        key={loc}
                        onPress={() => setSelectedLocations(selectedLocations.filter(l => l !== loc))}
                        style={{ backgroundColor: '#eee', borderRadius: 12, padding: 6, margin: 4 }}
                    >
                        <Text style={{ color: '#333' }}>{loc} ✕</Text>
                    </TouchableOpacity>
                ))}

            </View>

            <TextInput 
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor={'#CBCBCB'}
            />
            <Text style={styles.sectionTitle}>
                {editingItem ? 'Add Location' : 'Select Location'}
            </Text>
            

            <Picker
                selectedValue={selectedLocations[0] || ''}
                onValueChange={(itemValue: string) => {
                    if (itemValue && !selectedLocations.includes(itemValue)) {
                        setSelectedLocations([...selectedLocations, itemValue]);
                    }
                }}
                style={styles.picker}
            >
                <Picker.Item label="Select a location..." value="" />
                {WATERLOO_LOCATIONS
                    .filter(location => !selectedLocations.includes(location))
                    .map((location) => (
                        <Picker.Item key={location} label={location} value={location} />
                    ))}
            </Picker>       

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    setItemName('');
                    setPrice('');
                    setSelectedLocations([]);
                }}
            >
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.button}
                onPress={editingItem ? updateItem : addItem}
            >
                <Text style={styles.buttonText}>
                    {editingItem ? 'Update Item' : 'Add Item'}
                </Text>
            </TouchableOpacity>

            
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search menu items"
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor={'#CBCBCB'}
                />
                <TouchableOpacity 
                    style={styles.clearButton}
                    onPress={clearSearch}
                >
                    <Text style={styles.clearButtonText}>✕</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={filterItems(groupedItems, searchText)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
        </View>
    )
}