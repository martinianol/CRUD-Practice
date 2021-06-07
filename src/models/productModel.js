const fs = require('fs');
const path = require('path');

module.exports = {
  filePath: path.join(__dirname, '../data/productsDataBase.json'),

  readFile() {
    let productsJson = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(productsJson);
  },

  writeFile(newData) {
    let productsJson = JSON.stringify(newData, null, 2);
    fs.writeFileSync(this.filePath, productsJson);
  },

  findAll() {
    let products = this.readFile();
    return products;
  },
  findByPk(id) {
    let products = this.readFile();
    let productFound = products.find((e) => e.id == id);
    return productFound;
  },

  generateId() {
    let products = this.readFile();
    let lastProduct = products.pop();
    return lastProduct.id + 1;
  },

  create(newProduct) {
    //Tomar la data de los productos
    let products = this.readFile();
    //Genero ID del nuevo productoo
    newProduct.id = this.generateId;
    //Updeteo el array de productos
    let productsUpdated = [...products, newProduct];
    //Escribir en el Json la nueva data
    this.writeFile(productsUpdated);
  },

  update(id, productData) {
    //Tomar la data de los productos
    let products = this.readFile();

    //modificar la info de productos
    let productsUpdated = products.map((e) => {
      if (e.id == id) {
        e = {
          id: e.id,
          name: productData.name,
          price: Number(productData.price),
          discount: Number(productData.discount),
          ...productData,
          image: e.image,
        };
        console.log(e);
      }
      return e;
    });

    //escribir el archivo Json
    this.writeFile(productsUpdated);
  },
  delete(id) {
    let products = this.readFile();
    let productsNew = products.filter((e) => e.id != id);
    this.writeFile(productsNew);
  },
};
