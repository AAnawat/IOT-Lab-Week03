import { eq } from "drizzle-orm";
import drizzle from "../db/dbCon.js";
import { students } from "../db/schema/students.js";
import { type student } from "../db/interfaces/student.js";

export async function getStudents() {
    return await drizzle.select()
                    .from(students)
}

export async function getStudent(studentID: string) {
    return await drizzle.select()
                    .from(students)
                    .where(eq(students.studentID, studentID))
}

export async function createStudent(student: student) {
    await drizzle.insert(students)
            .values(student)
}

export async function updateStudent(student: student, studentID: string) {
    await drizzle.update(students)
            .set(student)
            .where(eq(students.studentID, studentID))
}

export async function deleteStudent(studentID: string) {
    await drizzle.delete(students)
            .where(eq(students.studentID, studentID))
}