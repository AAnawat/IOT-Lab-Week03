import { Hono } from "hono";
import studentController from "../controllers/studentController.js";
import { zValidator } from "@hono/zod-validator";
import { studentCreate, studentUpdate } from "./validators/studentValidator.js";

let studentRouter: Hono = new Hono()

studentRouter.get("/", studentController.getAll)
studentRouter.get("/:id", studentController.get)
studentRouter.post("/", zValidator('json', studentCreate), studentController.post)
studentRouter.put('/:id', zValidator('json', studentUpdate), studentController.put)
studentRouter.delete("/:id", studentController.delete)


export default studentRouter