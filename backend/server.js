const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/health', (req, res) => {
    res.json(
        {
            message: "hi",
            timestamp: new Date()
        }
    )
})

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
