import { Hono } from "hono";
import { bearerAuth } from 'hono/bearer-auth'
import { env } from 'hono/adapter'
import studentController from "../controllers/studentController.js";
import { zValidator } from "@hono/zod-validator";
import { studentCreate, studentUpdate } from "../controllers/validators/studentValidator";

let studentRouter: Hono = new Hono()

studentRouter.use('*', bearerAuth({
    verifyToken: async (token, c) => {
        const { SECRET } = env<{ SECRET: string }>(c);
        return token === SECRET
    }
}))

studentRouter.get("/", studentController.getAll)
studentRouter.get("/:id", studentController.get)
studentRouter.post("/", zValidator('json', studentCreate), studentController.post)
studentRouter.put('/:id', zValidator('json', studentUpdate), studentController.put)
studentRouter.delete("/:id", studentController.delete)


export default studentRouter