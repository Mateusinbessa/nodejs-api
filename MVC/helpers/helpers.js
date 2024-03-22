const fs = require('fs')

const writeDataToFile = (pathToFile, content) => {
    fs.writeFileSync(pathToFile, JSON.stringify(content), 'utf-8', (err) => {
        if (err) console.log(err)
    })
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (data) => {
                body += data
            })
            req.on('end', () => {
                resolve(JSON.parse(body))
            })
        } catch (error) {
            reject(error)
        }
    })
}

const CONTENT_TYPE = { 'Content-Type': 'application/json' }

module.exports = {
    writeDataToFile,
    getPostData,
    CONTENT_TYPE,
}