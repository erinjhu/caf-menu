import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Alert, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { styles } from './styles'

// const API_BASE_URL = 'http://10.185.34.99:3000/api'
const API_BASE_URL = 'http://172.20.10.2:3000/api'

// Create React component, main component to display
export default function HomeScreen() {
    // Functions to store and update data
    // useState makes React re-render it when it changes

    // Data
    const [items, setItems] = useState([])
    const [itemName, setItemName] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [searchText, setSearchText] = useState('')

    // Actions
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)

    // This hook calls fetChItems once when the app first loads
    useEffect(() => {
        fetchItems()
    }, [])

    // Get request to endpoint, extract items, and turn off loading msg
    // Only update the items if it's able to get the data from the backend
    const fetchItems = async () => {
        try {
            console.log('Starting API call')
            const response = await axios.get(`${API_BASE_URL}/items`)
            console.log('API response: ', response.data)
            setItems(response.data.items)
            setLoading(false)
        } catch (error) {
            console.log('Error')
            Alert.alert('Error', 'Failed to fetch items')
            setLoading(false)
        }
    }

    const addItem = async () => {

        if (!itemName || !price || !location) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        setIsAdding(true)

        try {
            const response = await axios.post(`${API_BASE_URL}/items`, {
                itemName: itemName,
                price: parseFloat(price),
                location: location
            } )

            Alert.alert('Success', 'Item added successfully!')

            // Clear and refresh
            setItemName('')
            setPrice('')
            setLocation('')
            fetchItems()

        } catch (error) {
            Alert.alert('Error', 'Failed to add item')
        } finally {
            setIsAdding(false)
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
                <Text style={styles.itemLocation}>{item.location}</Text>
            </View>
        )
    }

    const filteredItems = items.filter((item:any) => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
    )

    // 
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
            <TextInput 
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor={'#CBCBCB'}
            />
            <TextInput 
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
                placeholderTextColor={'#CBCBCB'}
            />
            <TouchableOpacity 
                style={styles.button}
                onPress={addItem}
            >
                <Text style={styles.buttonText}>Add Item</Text>
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
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
        </View>
    )
}