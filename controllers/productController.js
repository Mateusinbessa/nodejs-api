const { findAll, findById, create, update } = require('../models/productModel')
const { getPostData } = require('../helpers/helpers')

// @desc    Gets All Products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets a Single Product
// @route   GET /api/products/:id
const getProduct = async (req, res, id) => {
    try {
        const product = await findById(id)
        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found!' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Create a Product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const body = await getPostData(req)
        const { title, description, price } = body

        const product = {
            title: title,
            description: description,
            price: price
        }
        const newProduct = await create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(newProduct))

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
const updateProduct = async (req, res, id) => {
    try {
        const product = await findById(id)

        if (!product) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product Not Found!' }))
        } else {
            const body = await getPostData(req)
            const { title, description, price } = body

            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updateProduct = await update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(updateProduct))
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct
}