const express = require('express'),
    router = express.Router();
bodyParser = require('body-parser')
mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Product = require('../models/Product');

// RETURNS ALL THE PRODUCTS IN THE DATABASE
router.get('/', (req, res) => {
    let ids = req.query.ids,
        condition = {};

    if (ids && ids.length > 0) {
        condition = { _id: { $in: ids } };
    };

    let departments = req.query.departments;

    if(departments && departments.length > 0){
      condition={ $and: [ condition, {departments: {$in: departments}}]};
    }
    
    

  Product.find(condition, (err, products) => {
    if (err) return res.status(500).send("There was a problem finding the products.");
    res.status(200).send(products);
  });
});

// GETS A SINGLE PRODUCT FROM THE DATABASE
router.get('/:id', (req, res) => {
  Product.findById(req.params.id, (err, product) => {
      if (err) return res.status(500).send("There was a problem finding the product.");
      if (!product) return res.status(404).send("No product found.");
      res.status(200).send(product);
  });
});

// DELETES A PRODUCT FROM THE DATABASE
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
      if (err) return res.status(500).send("There was a problem deleting the product.");
      res.status(200).send("Product: "+ product.name +" was deleted.");
  });
});

router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, product) => {
    if (err) return res.status(500).send("There was a problem updating the product.");
    res.status(200).send(product);
  });
});

// // child Electronic schema.
const options = { discriminatorKey: 'type' },
  ElectronicProduct = Product.discriminator('Electronic', new mongoose.Schema({ power: Number }, options));

// const computer1 = new ElectronicProduct({ name: 'Acer Laptop x100na', price: { currency: "eur", amount: 300}, power: 500, images:[{
// src: '../demo_imgs/acer_laptop.jpg', alt: 'Acer Laptop x100na'}] });
// computer1.save();

// child Clothing schema.

// const  ClothingProduct = Product.discriminator('Clothing', new mongoose.Schema({ size: String }, options));
// shirt1 = new ClothingProduct({ name: 'Light Laguna Shirt Experience', price: 64, size: 'Medium', images: [{src: 'http://via.placeholder.com/300x250', alt:'laguna shirt experience'}] });
// shirt1.save();
// shirt2 = new ClothingProduct({ name: 'Blue Sport t-shirt', price: 34, size: 'Large' });
// shirt2.save();
// shirt3 = new ClothingProduct({ name: 'Polo t-shirt', price: 71, size: 'Large' });
// shirt3.save();
// shirt4 = new ClothingProduct({ name: 'Golf t-shirt', price: 55, size: 'Medium' });
// shirt4.save();
//shirt5 = new ClothingProduct({ name: 'Golf asdasf', price:{ currency:"eur",amount:76}, size: 'Medium' });
//shirt5.save();

module.exports = router;
