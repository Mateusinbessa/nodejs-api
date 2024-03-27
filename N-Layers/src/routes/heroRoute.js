import { once } from 'node:events'
import { DEFAULT_HEADER } from '../util/util.js'
import Hero from '../entities/hero.js'

const routes = ({ heroService }) => ({
    '/heroes:get': async (request, response) => {
        response.write('GET')
        response.end()
    },
    '/heroes:post': async (request, response) => {
        //we're gonna get item, once request send some data.
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const hero = new Hero(item)

        const id = hero.id
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({
            id: id,
            success: 'User created with success!!',
        }))
        return response.end()
    },
})

export {
    routes
}