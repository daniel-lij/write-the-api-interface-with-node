const express = require('express')
const router = express.Router()

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'this is get req'
    })
})

router.post('/',(req, res, next)=>{
    res.status(201).json({
        message:'this is post req'
    })
})

router.post('/:productId', (req, res, next)=>{
    const id = req.params.productId
    if(id === "special"){
        res.status(200).json({
            message: 'this is true id',
            id: id
        })
    }else{
        res.status(200).json({
            message: 'this is error id',
            id: -1
        })
    }
})

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'this is patch'
    })
})

router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'this is delete'
    })
})

module.exports = router