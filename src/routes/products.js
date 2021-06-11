// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** MULTER STORAGE ***/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationPath = path.join(__dirname, '../../public/images');
    cb(null, destinationPath);
  },

  filename: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    let uniqueName = Date.now();
    let filename = uniqueName + extension;
    console.log(filename);
    cb(null, filename);
  },
});

const uploadFile = multer({ storage });

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.list);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post(
  '/create',
  uploadFile.single('product_image'),
  productsController.store
);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id/', productsController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id/', productsController.edit);
router.put('/edit/:id', productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/:id', productsController.destroy);

module.exports = router;
