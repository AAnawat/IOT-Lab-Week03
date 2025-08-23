import { Hono } from "hono";
import bookController from "../controllers/bookController";
import { zValidator } from "@hono/zod-validator";
import { bookCreate, bookUpdate } from "./validators/bookValidator";

const bookRouter = new Hono()

bookRouter.get("/", bookController.getAll)
bookRouter.get('/:id', bookController.get)
bookRouter.post('/', zValidator('json', bookCreate), bookController.post)
bookRouter.patch('/:id', zValidator('json', bookUpdate), bookController.patch)
bookRouter.delete('/:id', bookController.delete)

export default bookRouter