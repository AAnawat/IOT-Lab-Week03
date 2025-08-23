import { Context } from "hono";
import { getAllGenre, getBookFromGenre } from "../models/genreModel";

class genreController {
    public async getAll(packet: Context) {
        try {
            const result = await getAllGenre();
            return packet.json({status: 200, result})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to fetch data"})
        }
    }

    public async getBook(packet: Context) {
        try {
            const genre = packet.req.param('genre');
            const result = await getBookFromGenre(genre);
            return packet.json({status: 200, result})
        } catch (error) {
            console.log(error);
            return packet.json({status: 500, message: "Failed to fetch data"})
        }
    }
}

export default new genreController()