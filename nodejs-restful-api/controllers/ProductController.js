const express = require('express'),
  router = express.Router();
  bodyParser = require('body-parser')
  mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Product = require('../models/Product');

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send("There was a problem finding the products.");
        res.status(200).send(products);
    });
});

// // child Electronic schema.
// var ElectronicProduct = Product.discriminator('Electronic', new mongoose.Schema({ cpu: Number }, options));
// var computer = new ElectronicProduct({ name: 'computer', price: 100, cpu: 5 });
// computer.save();

// child Clothing schema.
const options = { discriminatorKey: 'type' },
ClothingProduct = Product.discriminator('Clothing', new mongoose.Schema({ size: String }, options));
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
