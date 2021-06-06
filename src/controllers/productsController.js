const fs = require('fs');
const path = require('path');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const productModel = require('../models/productModel');

const controller = {
  // Root - Show all products
  list: (req, res) => {
    let products = productModel.findAll();
    res.render('products-list', { products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let id = req.params.id;
    let productDetail = productModel.findByPk(id);
    res.render('detail', { productDetail });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render('product-create-form');
  },

  // Create -  Method to store
  store: (req, res) => {
    let newProductData = req.body;
    productModel.create(newProductData);
    res.redirect('/products');
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = req.params.id;
    productModel.delete(id);
    res.redirect('/products');
  },
};

module.exports = controller;
