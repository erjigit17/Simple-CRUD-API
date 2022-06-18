import {IncomingMessage, ServerResponse} from "http"
import cluster from 'cluster'
import {parseId} from "./utils/parseId.js"
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    fatalError,
    updatedUser,
} from "./controllers/userController.js"

export const main = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const method = req.method as string
        const url = req.url as string
        const baseUrl = '/api/users'
        const id = await parseId(url, baseUrl, res)

        if (cluster.isWorker) console.log(`Worker pid ${process.pid}, ${method}, ${url}`)

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
        let errorMessage = ''
        if (err instanceof Error) errorMessage = err.message
        await fatalError(req, res, errorMessage)
    }

}
