import * as User from '../models/userModel.js'
import {IBaseUser} from '../interface/user.interface'
import { ServerResponse, IncomingMessage } from 'http'
import { userPostDTO } from '../scemas/userPostDTO.js'
import { chekReqBody } from '../scemas/chekReqBody.js'

async function sendResponse(res: ServerResponse, status: number, body: object) {
    res.writeHead(status, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(body))
}

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> => {
    const user = await User.findById(id)

    if(!user) {
        await sendResponse(res, 404, ({message: 'User Not Found'}))
        return
    }

    await sendResponse(res, 200, user)
}

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const users = await User.findAll()
    await sendResponse(res, 200, users)
}


export const createUser = async(req: IncomingMessage, res: ServerResponse): Promise<void> =>{
    let body = ''

    req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
    })

    req.on('end', async() => {
        let user = {} as IBaseUser
        try {
            user = chekReqBody(body, userPostDTO)
        } catch (err) {
            let error = new Error('Invalid request body')
            if (err instanceof Error) error = err
            await badRequest (req, res, error)
            return
        }
        const out = await User.create(user)

        await sendResponse(res, 201, out)
    })
}


export const updatedUser = async (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> =>{
    const _user = await User.findById(id)

    if(!_user) {
        await sendResponse(res, 404, ({message: 'User Not Found'}))
        return
    }

    let body = ''
    req.on('data', (chunk: Buffer) => {
        body += chunk.toString()
    })

    req.on('end', async() => {
        let user = {} as IBaseUser
        try {
            user = chekReqBody(body, userPostDTO)
        } catch (err) {
            let error = new Error('Invalid request body')
            if (err instanceof Error) error = err
            await badRequest (req, res, error)
            return
        }

        const out = await User.update(id, user)

        await sendResponse(res, 200, out)
    })
}

export async function deleteUser (req: IncomingMessage, res: ServerResponse, id: string): Promise<void> {
    const _user = await User.findById(id)

    if(!_user) {
        await sendResponse(res, 404, ({message: 'User Not Found'}))
        return
    }

    await User._delete(id)
    await sendResponse(res, 204, {})
}

export async function notFound (req: IncomingMessage, res: ServerResponse): Promise<void> {
    await sendResponse(res, 404, ({message: 'Route Not Found'}))
}

export async function fatalError (req: IncomingMessage, res: ServerResponse, errorMessage: string): Promise<void> {
    await sendResponse(res, 500, ({message: `Internal Server Error: ${errorMessage}`}))
}

export async function badRequest (req: IncomingMessage, res: ServerResponse, err: Error): Promise<void> {
    await sendResponse(res, 400, ({message: `Bad request error: ${err.message}`}))
}