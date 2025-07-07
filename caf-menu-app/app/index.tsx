import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Alert } from 'react-native'
import axios from 'axios'
import { styles } from './styles'

// const API_BASE_URL = 'http://10.185.34.99:3000/api'
const API_BASE_URL = 'http://172.20.10.2:3000/api'

// Create React component, main component to display
export default function HomeScreen() {
    // Functions to store and update data
    // useState makes React re-render it when it changes
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
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
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
            />
        </View>
    )
}