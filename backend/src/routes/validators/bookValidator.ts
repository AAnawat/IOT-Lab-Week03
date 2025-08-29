import * as zod from 'zod'

export const bookCreate = zod.object({
    title: zod.string(),
    author: zod.string(),
    description: zod.string(),
    synopsis: zod.string(),
    publishedAt: zod.iso.datetime().transform((time) => new Date(time)),
    genres: zod.array(zod.string())
})

export const bookUpdate = zod.object({
    title: zod.string().optional(),
    author: zod.string().optional(),
    description: zod.string().optional(),
    synopsis: zod.string().optional(),
    publishedAt: zod.iso.datetime().optional().transform((time) => time ? new Date(time) : undefined),
    deleteGenre: zod.array(zod.number()).optional(),
    addGenre: zod.array(zod.string()).optional()
})