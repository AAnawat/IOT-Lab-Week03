import { Hono } from "hono";
import genreController from "../controllers/genreController";

const genreRouter = new Hono();

genreRouter.get('/', genreController.getAll)
genreRouter.get('/:genre', genreController.getBook)

export default genreRouter