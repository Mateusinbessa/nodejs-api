const { getProducts, getProduct, createProduct } = require("./controllers/productController")
const http = require('http')

const server = http.createServer((req, res) => {
    //@route GET /api/products
    if (req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res)
    }
    //@route GET /api/products/:id
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    }
    //@route POST /api/products/
    else if (req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    }
    //@route GET /* NOT FOUND 
    else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));