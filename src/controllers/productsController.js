const fs = require('fs');
const path = require('path');

//const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

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
    let newFile = req.file;
    console.log(newProductData);
    console.log(newFile);
    productModel.create(newProductData, newFile);
    res.redirect('/products');
  },

  // Update - Form to edit
  edit: (req, res) => {
    let id = req.params.id;
    let productToEdit = productModel.findByPk(id);
    console.log(productToEdit);
    res.render('product-edit-form', { productToEdit });
  },
  // Update - Method to update
  update: (req, res) => {
    let id = req.params.id;
    let productData = req.body;
    console.log(productData);
    productModel.update(id, productData);
    res.redirect('/products');
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = req.params.id;
    productModel.delete(id);
    res.redirect('/products');
  },
};

module.exports = controller;
