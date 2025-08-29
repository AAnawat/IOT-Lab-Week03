import { relations } from "drizzle-orm";
import { bigint, bigserial, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { booksToGenres } from "./booksToGenres";

export const books = pgTable('books', {
    id: bigserial({mode: "number"}).primaryKey().notNull(),
    title: varchar({length: 255}).notNull(),
    author: varchar({length: 255}).notNull(),
    description: text().notNull(),
    synopsis: text().notNull(),
    publishedAt: bigint({mode: 'number'}).notNull()
})

export const booksRelations = relations(books, ({many}) => ({
    booksToGenres: many(booksToGenres)
}))