const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
  delete(id) {
    let products = this.readFile();
    let productsNew = products.filter((e) => e.id != id);
    this.writeFile(productsNew);
  },
};
