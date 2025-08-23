import { eq, and, inArray } from "drizzle-orm";
import drizzle from "../db/dbCon";
import { books } from "../db/schema/books";
import { genres } from "../db/schema/genres";
import { booksToGenres } from "../db/schema/booksToGenres";

export async function getAllBooks() {
    return drizzle.select()
        .from(books);
}

export async function getBook(id: number) {
    return drizzle.query.books.findFirst({
        where: eq(books.id, id),
        with: {
            booksToGenres: {
                with: {
                    genre: true
                }
            }
        }
    })
}

interface insertBookData {
    book: book
    genre: genre[]
}
export async function addBook(data: insertBookData) {
    return drizzle.transaction(async (tx) => {
        const insertID: number = (await tx.insert(books).values(data.book).returning({ id: books.id }))[0].id
        await tx.insert(genres).values(data.genre).onConflictDoNothing();
        const genresID: number[] = (await tx.select({id: genres.id}).from(genres).where(inArray(genres.title, data.genre.map((tmp) => tmp.title)))).map((value) => value.id)
        console.log(genresID);

        const booksGenresData: bookToGenre[] = []
        for (let id in genresID) {
            booksGenresData.push({
                bookID: insertID,
                genresID: genresID[id]
            })
        }

        await tx.insert(booksToGenres).values(booksGenresData).onConflictDoNothing();
    })
}

export async function deleteBook(bookID: number) {
    return drizzle.delete(books)
                    .where(eq(books.id, bookID))
}

interface updateBookData {
    book?: book
    deleteGenre?: number[]
    addGenre?: string[]
}
export async function updateBook(id: number, data: updateBookData) {
    return drizzle.transaction(async (tx) => {
        if (data.book) {
            await tx.update(books)
                .set(data.book)
                .where(eq(books.id, id))
        }

        if (data.deleteGenre) {
            await tx.delete(booksToGenres)
                .where(and(
                    eq(booksToGenres.bookID, id),
                    inArray(booksToGenres.genresID, data.deleteGenre)
                ))
        }

        if (data.addGenre) {
            const insertingList = data.addGenre.map((tag) => {return {title: tag}})
            await tx.insert(genres).values(insertingList).onConflictDoNothing()
            const genresID: number[] = (await tx.select().from(genres).where(inArray(genres.title, data.addGenre))).map((gen) => gen.id)

            const booksGenresData: bookToGenre[] = []
            for (let gID in genresID) {
                booksGenresData.push({
                    bookID: id,
                    genresID: genresID[gID]
                })
            }

            await tx.insert(booksToGenres).values(booksGenresData).onConflictDoNothing();
        }
    })
}