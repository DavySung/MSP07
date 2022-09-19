const express = require('express')

const app = express()
const distDir = __dirname + "/dist/goto_grocery"

app.use('/', express.static(distDir))

const server = app.listen(3000, () => {
  console.log(`Listening on ${3000}`)
})
