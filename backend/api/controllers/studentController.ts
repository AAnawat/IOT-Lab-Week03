import { type Context } from "hono"
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../models/studentModel.js"

class studentController {
    public async getAll(packet: Context) {
        try {
            return packet.json(await getStudents())
        } catch (error) {
            console.log(error)
            return packet.json({status: 400, error: 'error'})
        }
    }

    public async get(packet: Context) {
        try {
            return packet.json(await getStudent(packet.req.param("id")))
        } catch (error) {
            console.log(error)
            return packet.json({status: 400, error: 'error'})
        }
    }

    public async post(packet: any) {
        try {
            const data = await packet.req.valid('json');
            await createStudent(data);
            return packet.json({ status: 201, message: 'Student created successfully' })
        } catch (error) {
            console.log(error)
            return packet.json({ status: 400, error: 'Failed to create student' })
        }
    }

    public async put(packet: any) {
        try {
            const data = await packet.req.valid('json');
            const id = packet.req.param("id");
            await updateStudent(data, id);
            return packet.json({ status: 201, message: 'Updated information' })
        } catch (error) {
            console.log(error);
            return packet.json({ status: 400, error: 'Failed to create student' });
        }
    }

    public async delete(packet: Context) {
        try {
            await deleteStudent(packet.req.param("id"))
            return packet.json({ status: 201, message: 'Deleted student' })
        } catch (error) {
            console.log(error);
            return packet.json({ status: 400, error: 'Failed to create student' });
        }
    }
}

export default new studentController()