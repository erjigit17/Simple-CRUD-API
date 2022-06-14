import * as User from '../models/userModel.js'
import {UserType} from '../types/userTypes'
import { ServerResponse, IncomingMessage } from 'http'

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    const user = await User.findById(id)

    if(!user) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'User not found'}))
        return
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(user))

}

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
    const users = await User.findAll()

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(users))
}


export const createUser = async(req: IncomingMessage, res: ServerResponse) =>{
    let body = ''

    req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
    })

    req.on('end', async() => {

        let user = {} as UserType
        try{
            user = JSON.parse(body)
        } catch (err) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Invalid JSON'}))
            return
        }

        const out = await User.create(user)

        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(out))

    })
}


export const updatedUser = async (req: IncomingMessage, res: ServerResponse, id: string) =>{
    let body = ''
    req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
    })

    req.on('end', async() => {
        let user = {} as UserType
        try{
            user = JSON.parse(body)
        } catch (err) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Invalid JSON'}))
            return
        }

        const out = await User.update(id, user)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(out))
    })
}

export const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) =>{
     await User._delete(id)
    res.writeHead(204, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(null))
}

export const notFound = async (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(404, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: 'Route Not Found'}))
}


export const fatalError = async (req: IncomingMessage, res: ServerResponse, err: Error) => {
    res.writeHead(500, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message: `Internal Server Error: ${err.message}`}))
}
