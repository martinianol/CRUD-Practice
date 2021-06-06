const fs = require('fs');
const path = require('path');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const productModel = require('../models/productModel');

const controller = {
  index: (req, res) => {
    let products = productModel.findAll();
    res.render('index', { products });
  },
  search: (req, res) => {
    // Do the magic
  },
};

module.exports = controller;
