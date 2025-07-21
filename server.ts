import { Hono } from "hono";
import studentRouter from "./src/routes/studentRouter";

const app = new Hono()

app.route('/students', studentRouter)

export default {
    port: 8080,
    fetch: app.fetch
}