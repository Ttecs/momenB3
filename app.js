const express = require('express');

const app=express();

const morgan=require('morgan');

const bodyParser=require('body-parser');

const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://ttecs:tharaka1234@cluster0.om0by.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true ,useUnifiedTopology: true })

const productRoutes =require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

app.use(morgan('dev'));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers','*');
//     if(req.method=== 'OPTIONS'){
//         res.header('Access-Control-Allow-Methods','GET, POST, DELETE, PUT');
//         return res.status(200).json({});
//     }
// })

//routes that handle requests

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status=404;
    next(err);
});

app.use((error,req,res,next) => {
    res.status(error.status||500);
    res.json({

        message: error.message
    });
})

module.exports = app;