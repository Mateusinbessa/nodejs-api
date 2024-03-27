import { parse } from 'node:url'
import { DEFAULT_HEADER } from './util/util.js'
import { routes } from './routes/heroRoute.js'

const heroRoutes = routes({
    heroService: {}
})

const allRoutes = {
    ...heroRoutes,
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER)
        response.write('uuuups, not found!')
        response.end()
    }
}

function handler(request, response) {
    const { url, method } = request
    const { pathname } = parse(url, true)
    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default
    return Promise.resolve(chosen(request, response)).catch(handleError(response));

}

function handleError(response) {
    return error => {
        console.log('Something bad has  happened**', error.stack)
        response.writeHead(500, DEFAULT_HEADER)
        response.write(JSON.stringify({
            error: 'internet server error!!'
        }))
        return response.end()
    }
}

export default handler