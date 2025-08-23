import { relations } from "drizzle-orm";
import { bigserial, pgTable, varchar } from "drizzle-orm/pg-core";
import { booksToGenres } from "./booksToGenres";

export const genres = pgTable('genres', {
    id: bigserial({ mode: 'number' }).primaryKey().notNull(),
    title: varchar({length: 255}).notNull().unique()
})

export const genresRelations = relations(genres, ({ many }) => ({
    booksToGenres: many(booksToGenres)
}))