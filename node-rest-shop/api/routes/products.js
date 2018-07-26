const express = require('express')
const router = express.Router()

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'this is products get req'
    })
})

router.post('/',(req, res, next)=>{
    var product = {
        name: req.body.name,
        weight: req.body.weight
    }
    res.status(201).json({
        message:'this is products post req',
        content: product
    })
})

router.post('/:productId', (req, res, next)=>{
    const id = req.params.productId
    if(id === "special"){
        res.status(200).json({
            message: 'this is products true id',
            id: id
        })
    }else{
        res.status(200).json({
            message: 'this is products error id',
            id: -1
        })
    }
})

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'this is products patch'
    })
})

router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'this is products delete'
    })
})

module.exports = router