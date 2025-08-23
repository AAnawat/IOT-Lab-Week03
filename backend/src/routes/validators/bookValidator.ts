import * as zod from 'zod'

export const bookCreate = zod.object({
    title: zod.string(),
    description: zod.string(),
    synopsis: zod.string(),
    genres: zod.array(zod.string())
})

export const bookUpdate = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    synopsis: zod.string().optional(),
    deleteGenre: zod.array(zod.number()).optional(),
    addGenre: zod.array(zod.string()).optional()
})