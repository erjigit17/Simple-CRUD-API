import http, {ServerResponse, IncomingMessage} from 'http'
import {settings} from './settings.js'
import {main} from './api.js'

const PORT = settings.PORT

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {

    await main(req, res)
})

server.listen(PORT, () => console.log(`Server listening on ${PORT}`))

