import {v4 as uuidv4} from 'uuid'
import {IBaseUser, IUser} from '../interface/user.interface'

import {users} from '../data/users.js'


export const findAll = async () => users

export const findById = async (id: string) => {
    return users.find(user => user.id === id)
}

export const create = async (user: IBaseUser): Promise<IUser> => {
    const newUser = {id: uuidv4(), ...user}
    users.push(newUser)

    return newUser
}

export const update = async (id: string, user: IBaseUser): Promise<IUser> => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) throw new Error('User, not found')
    users[userIndex] = {id, ...user}

    return users[userIndex]
}

export const _delete = async (id: string): Promise<void> => {
    const userIndex = users.findIndex(user => user.id === id)
    if (userIndex === -1) throw new Error('User, not found')
    users.splice(userIndex, 1)
}


