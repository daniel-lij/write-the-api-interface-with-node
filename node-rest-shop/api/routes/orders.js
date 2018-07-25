const express = require('express')
const router = express.Router()

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'this is orders get req'
    })
})

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message:'this is orders post req'
    })
})

router.post('/:orderId', (req, res, next)=>{
    const id = req.params.orderId
    console.log(id)
    if(id === "123"){
        res.status(200).json({
            message: 'this is orders true id',
            id: id
        })
    }else{
        res.status(200).json({
            message: 'this is orders error id',
            id: -1
        })
    }
})

router.delete('/:orderId', (req, res, next)=>{
    res.status(200).json({
        message: 'this is orders delete'
    })
})

module.exports = router