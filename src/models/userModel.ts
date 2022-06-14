import {v4 as uuidv4} from 'uuid'
import {BaseUserType} from '../types/userTypes'
import {users} from '../data/users.js'


export const findAll = async () => users

export const findById = async (id: string) => {
    return users.find(user => user.id === id)
}

export const create = async (user: BaseUserType) => {
    const newUser = {id: uuidv4(), ...user}
    users.push(newUser)

    return newUser
}

export const update = async (id: string, user: BaseUserType) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) throw new Error('User, not found')
    users[userIndex] = {id, ...user}

    return users[userIndex]
}

export const _delete = async (id: string) => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) throw new Error('User, not found')
    users.splice(userIndex, 1)
}


