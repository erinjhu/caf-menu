import axios from 'axios'


const API_BASE_URL = 'http://172.29.144.1:3000/api'

export const fetchMenuItems = async () => {
    try {
        console.log('Starting API call')
        const response = await axios.get(`${API_BASE_URL}/items`)
        console.log('API response: ', response.data)
        return response.data.items
    } catch (error) {
        console.log('Error fetching items')
        throw error
    }
}

export const addMenuItem = async (itemName: string, price: number, locations: string[]) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/items`, {
            itemName: itemName,
            price: price,
            locations: locations
        })
        return response.data
    } catch (error) {
        console.log('Error adding item', error)
        if (axios.isAxiosError(error)) {
            console.log('Response data:', error.response?.data)
        }
        throw error
    }
}



export const filterItems = (items: any[], searchText: string) => {
    return items.filter((item: any) => 
        item.name.toLowerCase().includes(searchText.toLowerCase())
    )
}

export const toggleLocationInArray = (selectedLocations: string[], location: string) => {
    if (selectedLocations.includes(location)) {
        return selectedLocations.filter(loc => loc !== location)
    } else {
        return [...selectedLocations, location]
    }
}