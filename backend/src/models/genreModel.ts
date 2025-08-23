import { eq } from "drizzle-orm";
import drizzle from "../db/dbCon";
import { genres } from "../db/schema/genres";

export async function getAllGenre() {
    return await drizzle.select()
                    .from(genres)
}

export async function getBookFromGenre(genre: string) {
    return await drizzle.query.genres.findMany({
        where: eq(genres.title, genre),
        with: {
            booksToGenres: {
                with: {
                    book: true
                }
            }
        }
    })
}