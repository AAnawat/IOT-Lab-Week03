import * as zod from 'zod';

const sex = zod.enum(['male', 'female']);

export const studentCreate = zod.object({
    firstName: zod.string().min(1).max(50),
    lastName: zod.string().min(1).max(50),
    studentID: zod.string().min(8).max(10),
    birthday: zod.iso.date().transform((data) => new Date(data)),
    sex: sex
});

export const studentUpdate = zod.object({
    firstName: zod.string().min(1).max(50).optional(),
    lastName: zod.string().min(1).max(50).optional(),
    studentID: zod.string().min(8).max(10).optional(),
    birthday: zod.iso.date().optional().transform((date) => (date ? new Date(date) : undefined)),
    sex: sex.optional()
})