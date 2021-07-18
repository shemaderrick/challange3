const request = require('request')
const getData = (id, callback) => {
 let url = `https://jsonplaceholder.typicode.com/albums/${id}/photos`
 request({ url, json: true }, (error, body) => {

  if (error) {
   callback('unable to reach the get album', undefined)
  }
  else if (body.error) {
   callback('unable to reach the get album ', undefined)
  }
  else callback(undefined, body.body)

 })
}
module.exports = getData
