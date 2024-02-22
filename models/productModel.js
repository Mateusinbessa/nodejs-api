const products = require('../data/products')

const findAll = () => {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

module.exports = {
    findAll
}
