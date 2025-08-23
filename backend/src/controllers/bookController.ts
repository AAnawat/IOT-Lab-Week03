import { Context } from "hono";
import { addBook, deleteBook, getAllBooks, getBook, updateBook } from "../models/bookModel";
import { bookCreate } from "../routes/validators/bookValidator";

class bookController {
    public async getAll(packet: Context) {
        try {
            const result = await getAllBooks()
            return packet.json({status: 200, result})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to fetch data"})
        }
    }

    public async get(packet: Context) {
        try {
            const query = await getBook(Number(packet.req.param("id")))

            if (!query) {
                throw new Error("No book")
            }

            const full = {...query, genres: query.booksToGenres.map((gen) => gen.genre)}
            const {booksToGenres, ...result} = full
            

            return packet.json({status: 200, result})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to fetch data"})
        }
        
    }

    public async post(packet: any) {
        try {
            const data = await packet.req.valid('json')
            const genres: genre[] = data.genres.map((genre: string) => {return {title: genre}});
            const payload = {
                book: {
                    title: data.title,
                    description: data.description,
                    synopsis: data.synopsis
                },
                genre: genres
            } 
            await addBook(payload);
            return packet.json({status: 200, message: "Created book"})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to create data"})
        }
    }

    public async patch(packet: any) {
        try {
            const data = await packet.req.valid('json')
            let payload: any = {}
            if (data.title) {
                payload.book = {
                    title: data.title,
                    description: data.description,
                    synopsis: data.synopsis
                }
            }
            if (data.deleteGenre) payload.deleteGenre = data.deleteGenre
            if (data.addGenre) payload.addGenre = data.addGenre
            await updateBook(packet.req.param("id"), payload)
            return packet.json({status: 200, message: "Update data already"})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to update data"})
        }
    }

    public async delete(packet: Context) {
        try {
            await deleteBook(Number(packet.req.param("id")))
            return packet.json({status: 200, message: "Deleted"})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to update data"})
        }
    }
}

export default new bookController