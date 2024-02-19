const express = require('express')
const app = express()
const port = 4444

app.get('/', (req, res) => {
  console.log('priv')
  res.send('hi')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})