const express = require("express");

const router = express.Router();

const Product = require("../models/products");

const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  Product.find()
  .select('name price _id')
    .exec()
    .then((docs) => {
      const respose={
        count:docs.length,
        products:docs
      };
      res.status(200).json({respose });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });

  product
    .save()
    .then((respond) => {
      console.log(respond);
      res.status(200).json({respond})
    })
    .catch((err) => {console.error(err),res.status(500).json({message: err})});

  
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
  .select('name price _id')
    .exec()
    .then((doc) => {
      const respose={
        count:doc.length,
        products:doc
      };
      res.status(200).json({respose });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
  res.status(201).json({ message: "Updated Products" });
});

router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;

  Product.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
