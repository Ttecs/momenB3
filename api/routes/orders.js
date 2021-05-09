const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Order=require('../models/orders');

router.get('/',(req, res, next) =>{

    res.status(200).json({message:'orders were fetched'});
});

router.post('/',(req, res, next) =>{

    const order=new Order({
        _id:new mongoose.Types.ObjectId(),
        quantity:req.body.quantity
    });

    order.save().then(result =>{res.status(201).json({result})}).catch(err =>console.log(err));

   
});

router.get('/:orderId',(req, res, next) =>{

    res.status(200).json({
        message:'orders details',
        orderId: req.params.orderId
});
});


router.delete('/:orderId',(req, res, next) =>{

    res.status(200).json({
        message:'orders deleted',
        orderId: req.params.orderId
});
});

module.exports = router;