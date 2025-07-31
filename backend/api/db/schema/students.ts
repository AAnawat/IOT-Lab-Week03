import { varchar, bigserial, pgTable, date, pgEnum } from "drizzle-orm/pg-core";

export const sexEnum = pgEnum('sex', ['male', 'female'])

export const students = pgTable('students', {
    id: bigserial({mode: 'number'}).primaryKey(),
    firstName: varchar({length: 50}),
    lastName: varchar({length: 50}),
    studentID: varchar({length: 10}).unique(),
    birthday: date({mode: 'date'}),
    sex: sexEnum()
})