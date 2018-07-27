const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Product = require('../models/product') 

router.get('/',(req, res, next)=>{
    Product.find().select('name , price , _id').exec().then(result =>{
        if(result.length > 0){
            const response ={
                count : result.length,
                products: result.map(doc =>{
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request:{
                            type:'GET',
                            url: "https://localhost:3000/" + doc._id
                        }
                    }
                })
            }
            res.status(201).json(response)
        }else{
            res.status(201).json({
                message:'没有请求到数据'
            })
        }
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

router.post('/',(req, res, next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save().then(result =>{
        console.log(result)
        res.status(201).json({
            message:'this is products post req',
            content: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request:{
                    type:'POST',
                    url: "https://localhost:3000/" + doc._id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


router.get('/:productId', (req, res, next)=>{
    const id = req.params.productId
    Product.findById(id).exec().then(doc =>{
        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                message: '没有找到有效Id'
            })
        }
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})


router.patch('/:productId', (req, res, next)=>{
    const id = req.params.productId
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    console.log(updateOps)
    Product.update({_id: id}, {$set: updateOps}).exec().then(result =>{
        res.status(200).json(result)        
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

router.delete('/:productId', (req, res, next)=>{
    const id = req.params.productId
    Product.remove({ _id: id}).exec().then(result =>{
        res.status(200).json({
            message: '删除成功'
        })
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router