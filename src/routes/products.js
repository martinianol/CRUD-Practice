// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { body } = require('express-validator');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** MULTER STORAGE ***/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationPath = path.join(__dirname, '../../public/images/products');
    cb(null, destinationPath);
  },

  filename: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    let uniqueName = Date.now();
    let filename = uniqueName + extension;
    cb(null, filename);
  },
});

const uploadFile = multer({ storage });

/***VALIDATION  ***/
const validateRegister = [
  body('name').notEmpty().withMessage('Favor de ingresar el nombre del producto'),
  body('price')
    .notEmpty()
    .withMessage('Favor de ingresar el precio del producto')
    .bail()
    .toInt(),

  body('discount')
    .notEmpty()
    .withMessage('Favor de ingresar el descuento del producto')
    .bail()
    .toInt(),

  body('category').notEmpty().withMessage('Favor de elegir una opción de categoría'),

  body('description')
    .notEmpty()
    .withMessage('Favor de ingresar la descripción del producto')
    .bail()
    .isLength({ min: 10 })
    .withMessage('La descripción es muy corta'),

  //***IMAGE VALIDATION CUSTOM ***/
  body('product_image').custom((value, { req }) => {
    let file = req.file;

    if (!file) {
      throw new Error('Favor de cargar una imagen');
    } else {
      let acceptedExtensions = ['.jpg', '.png', '.gif'];
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(
          `Favor de cargar un formato permitido: ${acceptedExtensions.join(', ')}`
        );
      }
    }

    return true;
  }),
];

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.list);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post(
  '/create',
  uploadFile.single('product_image'),
  validateRegister,
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
