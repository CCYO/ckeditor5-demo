const http = require('http')

const app = require('../app.js')
const { PORT } = require('../config/node')

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`SERVER LISTEN ${PORT} ....`)
})

