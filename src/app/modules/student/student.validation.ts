import { z } from 'zod';

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    middleName: z.string(),
    lastName: z.string(),
});

const guardianValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

export const createStudentValidationSchema = z.object({
    body: z.object({
        // id: z.string(),
        // user: z
        //     .string({ required_error: 'User id is required' }) // Ensures it's a string
        //     .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format'), // Validates MongoDB ObjectId
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']),
            dateOfBirth: z.string().optional(),
            email: z.string().email(),
            contactNo: z.string(),
            emergencyContactNo: z.string(),
            bloogGroup: z.enum([
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-',
                'O+',
                'O-',
            ]),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImg: z.string(),
            admissionSemester: z.string(),
            // isActive: z.enum(['active', 'blocked']).default('active'),
            // isDeleted: z.boolean().optional(),
        }),
    }),
});

export const studentValidations = {
    createStudentValidationSchema,
};
