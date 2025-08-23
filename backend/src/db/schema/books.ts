import { relations } from "drizzle-orm";
import { bigserial, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { booksToGenres } from "./booksToGenres";

export const books = pgTable('books', {
    id: bigserial({mode: "number"}).primaryKey().notNull(),
    title: varchar({length: 255}).notNull(),
    description: text().notNull(),
    synopsis: text().notNull()
})

export const booksRelations = relations(books, ({many}) => ({
    booksToGenres: many(booksToGenres)
}))