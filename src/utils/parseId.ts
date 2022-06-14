import {ServerResponse} from 'http'
import {validate} from 'uuid'


export const parseId = async (url: string, baseUrl: string, res: ServerResponse) => {
    const id = url
        .replace(baseUrl, '')
        .replace(/^\/|\/$/g, '')

    // check if id is valid
    const _url = baseUrl + '/' + id
    if (_url !== url) return null

    // check id is valid uuid
    if (!validate(id)) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'userId invalid, not a valid uuid'}))
        return null
    }

    return id
}