import cluster from 'cluster'
import {cpus} from 'os'
import http, {IncomingMessage, ServerResponse} from 'http'
import {main} from './api.js'


import {settings} from './settings.js'
const PORT = settings.PORT

if (cluster.isPrimary) {
    const numCPUs = cpus().length;
    for (let i = 0; i < numCPUs; i++) cluster.fork()

    for (const id in cluster.workers) {
        cluster.workers[id]?.on('message', async (msg) => {
            sendToWorkers(msg)
        })
    }

} else {
    const server = http.createServer( async (req: IncomingMessage, res: ServerResponse) => {
        await main(req, res)
    })

    server.listen(PORT, () =>
        console.log(`Process ${process.pid} is listening PORT: ${PORT} to all incoming requests`)
    )
}


function sendToWorkers(msg: any){
    const {workerId, command, data, id: userId} = msg
    for (const id in cluster.workers) {
        if(id == workerId) continue
        cluster.workers[id]?.send({command, data, id: userId})
    }
}