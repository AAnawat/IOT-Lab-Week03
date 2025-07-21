import { Hono } from "hono";
import studentController from "../controllers/studentController";
import { zValidator } from "@hono/zod-validator";
import { studentCreate, studentUpdate } from "../controllers/validators/studentValidator";

let studentRouter: Hono = new Hono()

studentRouter.get("/", studentController.getAll)
studentRouter.get("/:id", studentController.get)
studentRouter.post("/", zValidator('json', studentCreate), studentController.post)
studentRouter.put('/:id', zValidator('json', studentUpdate), studentController.put)
studentRouter.delete("/:id", studentController.delete)

export default studentRouter