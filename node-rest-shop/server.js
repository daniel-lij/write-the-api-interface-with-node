const http = require('http')
const app = require('./app')

const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`数据库连接成功, 端口: ${port}`)
})