import http, {ServerResponse, IncomingMessage} from 'http'
import {getUsers, getUser, createUser, updatedUser, deleteUser} from './controllers/userController.js'
import {parseId} from './utils/parseId.js'
import {settings} from './settings.js'

const PORT = settings.PORT

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {

    try {
        const method = req.method as string
        const url = req.url as string
        const baseUrl = '/api/users'
        const id = await parseId(url, baseUrl, res)

        if (url === '/api/users' && method === 'GET') {
            await getUsers(req, res)
        } else if (url === '/api/users' && method === 'POST') {
            await createUser(req, res)

        } else if (id && method === 'GET') {
            await getUser(req, res, id)

        } else if (id && method === 'PUT') {
            await updatedUser(req, res, id)

        } else if (id && method === 'DELETE') {
            await deleteUser(req, res, id)

        } else {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Route Not Found'}))
        }

    } catch (err) {
        let errorMessage = 'Internal Server Error'
        if (err instanceof Error) errorMessage = err.message
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: errorMessage}))
    }
})

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))

