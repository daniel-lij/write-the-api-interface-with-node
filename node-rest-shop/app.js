const express = require('express')
const app = express()
// 记录日志中间件
const morgan = require('morgan')
// 解析post请求中间键
const bodyParser = require('body-parser')
// 获得mongoose做数据库
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const ordersRoutes = require('./api/routes/orders')

mongoose.connect('mongodb://localhost/shop')

mongoose.Promise = global.Promise

// 日志启动的名字dev
app.use(morgan('dev'))

// 对post请求进行解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 设置res相关的设置
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
    'Origin, x-Requested-With, Content-Type, Accept, Authorization'
    )
    if( req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products', productRoutes)
app.use('/orders', ordersRoutes)

// 处理错误
app.use((req, res, next) =>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})


module.exports = app
