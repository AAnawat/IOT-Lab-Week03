import { eq } from "drizzle-orm";
import { db } from "../db/dbCon";
import { students } from "../db/schema/students";
import { type student } from "../db/interfaces/student";

export async function getStudents() {
    return await db.select()
                    .from(students)
}

export async function getStudent(studentID: string) {
    return await db.select()
                    .from(students)
                    .where(eq(students.studentID, studentID))
}

export async function createStudent(student: student) {
    await db.insert(students)
            .values(student)
}

export async function updateStudent(student: student, studentID: string) {
    await db.update(students)
            .set(student)
            .where(eq(students.studentID, studentID))
}

export async function deleteStudent(studentID: string) {
    await db.delete(students)
            .where(eq(students.studentID, studentID))
}