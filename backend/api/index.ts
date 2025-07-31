import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from 'hono/cors';
import studentRouter from "./routes/studentRouter.js";

export const config = {
    runtime: 'edge'
}

const app = new Hono()

app.use('/students', cors({
  origin: '*',
  allowHeaders: ['Content-Type'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.route('/students', studentRouter)

export default handle(app);