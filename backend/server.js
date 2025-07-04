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
