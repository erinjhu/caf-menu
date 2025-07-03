const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! hahahahh')
})

app.get('/api/health', (req, res) => {
    res.json(
        {
            message: "hi",
            timestamp: new Date()
        }
    )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
