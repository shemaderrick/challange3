const express = require('express')
var cors = require('cors')
const getData = require('./data.js')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(express.json())

//getroute
app.get('/api/album/:id', (req, res) => {
 getData(req.params.id, (error, albumdata) => {
  if (error) {
   res.status(400).json(error)
  }
  res.status(200).json(albumdata.map((data) => {
   const { title, thumbnailUrl } = data
   return { title, thumbnailUrl }
  }))
 })

})
app.listen(port, () => {
 console.log('listening on......' + port)
})