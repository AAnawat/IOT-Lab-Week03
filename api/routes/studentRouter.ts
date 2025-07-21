import { Hono } from "hono";
import { bearerAuth } from 'hono/bearer-auth'
import { env } from 'hono/adapter'
import studentController from "../controllers/studentController.js";

let studentRouter: Hono = new Hono()

studentRouter.use('*', bearerAuth({
    verifyToken: async (token, c) => {
        const { SECRET } = env<{ SECRET: string }>(c);
        return token === SECRET
    }
}))

studentRouter.get("/", studentController.getAll)
studentRouter.get("/:id", studentController.get)
studentRouter.post("/", studentController.post)
studentRouter.put('/:id', studentController.put)
studentRouter.delete("/:id", studentController.delete)

export default studentRouter