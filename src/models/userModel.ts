import {v4 as uuidv4} from 'uuid'
import cluster from 'cluster'
import {IBaseUser, IUser} from '../interface/user.interface'

import {users} from '../data/users.js'
type commandType = 'create' | 'update' | 'delete'
type msgType = {command: commandType, data: IUser | null, id:string}


export const findAll = async () => users

export const findById = async (id: string) => {
    return users.find(user => user.id === id)
}

export const create = async (user: IBaseUser): Promise<IUser> => {
    const newUser = {id: uuidv4(), ...user}
    users.push(newUser)
    await sendToPrimary(newUser, 'create', null)
    return newUser
}

export const update = async (id: string, user: IBaseUser): Promise<IUser> => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) throw new Error('User, not found')
    users[userIndex] = {id, ...user}
    await sendToPrimary({id, ...user}, 'update', id)
    return users[userIndex]
}

export const _delete = async (id: string): Promise<void> => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) throw new Error('User, not found')
    users.splice(userIndex, 1)
    await sendToPrimary(null, 'delete', id)
}



async function sendToPrimary(data: IUser | null, command: commandType, id: string | null){
    if (cluster.isWorker) {
        // @ts-ignore
        const workerId = cluster.worker.id
        // @ts-ignore
        process.send({workerId, command, data, id})
    }
}


(async function updateData() {
    process.on('message', (msg: msgType) => {
        const {command, data, id} = msg
        if (command === 'create' && data !== null) users.push(data)

        if (command === 'update' && data !== null && id !== null) {
            const userIndex = users.findIndex(user => user.id === id)
            if (userIndex === -1) return
            users[userIndex] = data
        }

        if (command === 'delete' && id !== null){
            const userIndex = users.findIndex(user => user.id === id)
            if (userIndex === -1) return
            users.splice(userIndex, 1)
        }
    })
})()
