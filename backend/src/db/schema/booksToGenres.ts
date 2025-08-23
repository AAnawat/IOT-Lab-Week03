import { relations } from "drizzle-orm";
import { bigint, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { books } from "./books";
import { genres } from "./genres";

export const booksToGenres = pgTable('booksToGenres', {
    bookID: bigint({mode: 'number'}).notNull().references(() => books.id, {onDelete: 'cascade'}),
    genresID: bigint({mode: 'number'}).notNull().references(() => genres.id)
}, (t) => [
    primaryKey({columns: [t.bookID, t.genresID]})
])

export const booksToGenresRelations = relations(booksToGenres, ({ one }) => ({
    book: one(books, {
        fields: [booksToGenres.bookID],
        references: [books.id],
    }),
    genre: one(genres, {
        fields: [booksToGenres.genresID],
        references: [genres.id],
    }),
}));