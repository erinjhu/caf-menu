const express = require('express')
const app = express()
const port = 3000

const items = []

app.use(express.json())

// Homepage
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Server health check
app.get('/api/health', (req, res) => {
    res.json(
        {
            message: "hi",
            timestamp: new Date()
        }
    )
})

// User submits menu items
app.post('/api/items', (req, res) => {
  const itemName = req.body.itemName
  const price = req.body.price
  const location = req.body.location

  console.log('Received data:', { itemName, price, location })
  console.log('Type of price:', typeof price)

  // Validation
  if (!itemName || itemName.trim() === '' ) {
    return res.status(400).json({error: "Empty item name or doesn't exist"})
  } 
  if (!price || typeof price !== 'number') {
    return res.status(400).json({message: "Price is not a number or doesn't exist"})
  }  
  if (!location || location.trim() === '') {
    return res.status(400).json({error: "Empty location or doesn't exist"})
  }

  const newItem = {
    id: Date.now(),
    name: itemName,
    price: price,
    location: location,
    createdAt: new Date()
  }
  items.push(newItem)

  // Success response
  res.json({
    message: "Item submitted successfully",
    item: {
      name: itemName,
      price: price,
      location: location
    }
  })
})

// Retrieve submitted menu items for user
app.get('/api/items', (req, res) => {
  res.json({
    message: "All menu items",
    count: items.length,
    items: items
  })
})

// Delete
app.delete('/api/items/:id', (req, res) => {
  // Extract ID from URL parameter
  const targetId = parseInt(req.params.id)
  // Find the item in the array
  const index = items.findIndex(item => item.id == targetId)
  // Remove it if found
  if (index !== -1) {
    items.splice(index, 1) // remove 1 item from given index
    res.json({
      message: "Deleted item"
    })
  } else {
    res.status(404).json({
      error: "Item not found"
    })
  }
})

app.put('/api/items/:id', (req, res) => {
  // Extract ID from URL parameter
  const targetId = parseInt(req.params.id)
  // Find the item in the array
  const index = items.findIndex(item => item.id == targetId)
  // Extract update data from request body
  const updateData = req.body
  if (index === -1) {
    return res.status(404).json({
      error: "Item not found"
    })
  }
  // Validate the update data (if provided)
  // Check if a property is undefined, null, empty (white spaces)
  if (updateData.itemName !== undefined && (!updateData.itemName || updateData.itemName.trim() === '') ) {
    return res.status(400).json({error: "Empty item name"})
  }
  if (updateData.price !== undefined && (!updateData.price || typeof updateData.price !== 'number')) {
    return res.status(400).json({error: "Price must be a number"})
  }
  if (updateData.location !== undefined && (!updateData.location || updateData.location.trim() === '')) {
    return res.status(400).json({error: "Empty location"})
  }
  // Update the item
  const existingItem = items[index]
  // Update provided fields
  if (updateData.itemName !== undefined) existingItem.name = updateData.itemName
  if (updateData.price !== undefined) existingItem.price = updateData.price
  if (updateData.location !== undefined) existingItem.location = updateData.location
  existingItem.updatedAt = new Date()
  res.json({
    message: "Item updated sucessfully",
    item: existingItem
  })
})

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
