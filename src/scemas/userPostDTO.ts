type SchemaType = {
    type: string,
    allowedAdditionalProperties: boolean,
    required: string[],
    properties: {
        [key: string]: {
            type: string,
            items?: {
                type?: string,
                nullable?: boolean | undefined,
            }
        }
    }
}


export const userPostDTO: SchemaType = {
    type: 'object',
    allowedAdditionalProperties: false,
    required: ['name', 'age', 'hobbies'],
    properties: {
        name: { type: 'string'},
        age: { type: 'number'},
        hobbies: {type: 'array',
            items: {type: 'string', nullable: true,}
        }
    }
}