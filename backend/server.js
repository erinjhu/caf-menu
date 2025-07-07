const express = require('express')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

// Old test array
// const items = []

// CORS middleware for mobile development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

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

// Database connection test
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({
      message: "Database connected successfully",
      timestamp: result.rows[0].now
    })
  } catch (error) {
    res.status(500).json({
      error: "Database connection failed",
      details: error.message
    })
  }
})

// User submits menu items
app.post('/api/items', async (req, res) => {
  // Cpde fpr test arrau
  // const itemName = req.body.itemName
  // const price = req.body.price
  // const location = req.body.location
  const { itemName, price, location } = req.body

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

  // Code for test array
  // const newItem = {
  //   id: Date.now(),
  //   name: itemName,
  //   price: price,
  //   location: location,
  //   createdAt: new Date()
  // }
  // items.push(newItem)

  try {
    // Insert into database
    const result = await pool.query(
      // items (column1, col2, col3) VALUES (data1, data2, data3)
      // RETURNING * - return the newly created row; item with its ID and timestamps
      'INSERT INTO items (name, price, location) VALUES($1, $2, $3) RETURNING *',
      [itemName, price, location]
    )

    res.json({
      message: "Item submitted successfully",
      item: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      error: "Database error",
      details: error.message
    })
  }


})

// Retrieve submitted menu items for user
app.get('/api/items', async (req, res) => {
  // Old code for array
  // res.json({
  //   message: "All menu items",
  //   count: items.length,
  //   items: items
  // })
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC')
    res.json({
      message: "ALl menu items",
      count: result.rows.length,
      items: result.rows
    })
  } catch (error) {
    res.status(500).json({
      error: "Database error",
      details: error.message
    })
  }
})

// Delete
app.delete('/api/items/:id', async (req, res) => {
  // Old code for testing array
  // // Extract ID from URL parameter
  // const targetId = parseInt(req.params.id)
  // // Find the item in the array
  // const index = items.findIndex(item => item.id == targetId)
  // // Remove it if found
  // if (index !== -1) {
  //   items.splice(index, 1) // remove 1 item from given index
  //   res.json({
  //     message: "Deleted item"
  //   })
  // } else {
  //   res.status(404).json({
  //     error: "Item not found"
  //   })
  // }
  const targetId = parseInt(req.params.id)

  try {
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1 RETURNING *',
      [targetId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Item not found"
      })
    }

    res.json({
      message: "Items deleted successfully",
      deletedItem: result.rows[0]
    })

  } catch (error) {
    res.status(500).json({
      error: "Database error",
      details: error.message
    })
  }
})

app.put('/api/items/:id', async (req, res) => {
  // Extract ID from URL parameter
  const targetId = parseInt(req.params.id)
  const updateData = req.body
  // Old code from array
  // // Find the item in the array
  // const index = items.findIndex(item => item.id == targetId)
  // // Extract update data from request body
  // const updateData = req.body
  // if (index === -1) {
  //   return res.status(404).json({
  //     error: "Item not found"
  //   })
  // }
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
  // Old code from test array
  // // Update the item
  // const existingItem = items[index]
  // // Update provided fields
  // if (updateData.itemName !== undefined) existingItem.name = updateData.itemName
  // if (updateData.price !== undefined) existingItem.price = updateData.price
  // if (updateData.location !== undefined) existingItem.location = updateData.location
  // existingItem.updatedAt = new Date()
  // res.json({
  //   message: "Item updated sucessfully",
  //   item: existingItem
  // })
  try {
    const updates = []
    const values = []
    let paramCount = 1

    if(updateData.itemName !== undefined) {
      updates.push(`name = $${paramCount}`)
      values.push(updateData.itemName)
      paramCount++
    }
    if (updateData.price !== undefined) {
      updates.push(`price = $${paramCount}`)
      values.push(updateData.price)
      paramCount++
    }
    if (updateData.location !== undefined) {
      updates.push(`location = $${paramCount}`)
      values.push(updateData.location)
      paramCount++
    }

    if (updates.length === 0) {
      return res.status(400).json({error: "No valid fields to update"})
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`)
    values.push(targetId)

    const query = `UPDATE items SET ${updates.join(`, `) } WHERE id = $${paramCount} RETURNING *`

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
      return res.status(404).json({error: "Item not found"})
    }

    res.json({
      message: "Item updated succesfully",
      item: result.rows[0]
    })

  } catch (error) {
    res.status(500).json({
      error: "Database error",
      details: error.message
    })
  }
})

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
