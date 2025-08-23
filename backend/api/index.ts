import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from 'hono/cors';
import { bearerAuth } from 'hono/bearer-auth'
import { env } from "hono/adapter";
import studentRouter from "../src/routes/studentRouter";
import bookRouter from "../src/routes/bookRourter.js";
import genreRouter from "../src/routes/genreRouter.js";

export const config = {
    runtime: 'edge'
}

const app = new Hono().basePath("/api")

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use('*', bearerAuth({
    verifyToken: async (token, c) => {
        const { SECRET } = env<{ SECRET: string }>(c);
        return token === SECRET
    }
}))


app.route('/students', studentRouter)
app.route('/books', bookRouter)
app.route('/genres', genreRouter);

export default handle(app);