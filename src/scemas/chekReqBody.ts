import { userPostDTO } from './userPostDTO'
import {IBaseUser} from '../interface/user.interface'

type SchemaType = {
    type: string,
    allowedAdditionalProperties: boolean,
    required: string[],
    properties: {
        [key: string]: {
            type: string,
            nullable?: boolean,
            items?: {
                type?: string
            }
        }
    }
}

type ItemType = {
    type?: string,
    nullable?: boolean,
}
type KeyType = keyof typeof userPostDTO.properties


export function chekReqBody (body: string, schema: SchemaType) {
    let obj = {} as IBaseUser
    try {
        obj = JSON.parse(body)
    } catch{
        throw new Error('Invalid JSON')
    }

    // check required
    for (const key of schema.required) {
        if (!obj[key as keyof typeof obj]) {
            throw new Error(`Missing required property: ${key}`)
        }
    }


    for (const key of Object.keys(obj)) {
        // check additional properties
        if (!schema.allowedAdditionalProperties) {
            if (!schema.properties[key as KeyType]) {
                throw new Error(`Additional property "${key}" is not allowed`)
            }
        }

        // check properties type
        const arr = obj[key as keyof typeof obj]
        if (Array.isArray(arr)) {
            const itemSchema = schema.properties[key as KeyType]?.items as ItemType
            const arrayNullable: boolean = itemSchema?.nullable || true
            if (arr.length !== 0) {
                for (const item of arr) {
                    if (typeof item !== itemSchema?.type) {
                        throw new Error(`Array item is not of type: ${itemSchema?.type}`)
                    }
                }
            } else if (!arrayNullable) {
                throw new Error(`Array is not nullable`)
            }
        } else {
            if (typeof obj[key as keyof typeof obj] !== schema.properties[key as KeyType].type) {
                throw new Error(`Property "${key}" is not of type: ${schema.properties[key  as KeyType].type}`)
            }
        }
    }

    return obj
}