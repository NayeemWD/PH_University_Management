import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
    AcademicSemesterCode,
    AcademicSemesterName,
    Months,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterName,
        },
        year: {
            type: String,
            required: [true, 'year is required'],
        },
        // year: {
        //     type: Date,
        //     required: [true, 'year is required'],
        // },
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterCode,
        },
        startMonth: {
            type: String,
            required: true,
            enum: Months,
        },
        endMonth: {
            type: String,
            required: true,
            enum: Months,
        },
    },
    {
        timestamps: true,
    }
);

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name,
    });

    if (isSemesterExists) {
        throw new Error('Semester is already exists!');
    }
    next();
});

// academicSemesterSchema.pre('save', async function (next) {
//     try {
//         const isSemesterExists = await AcademicSemester.findOne({
//             year: this.year,
//             name: this.name,
//         });

//         if (isSemesterExists) {
//             const error = new Error('Semester already exists!');
//             return next(error); // Properly passing error to Mongoose error handling
//         }
//         next();
//     } catch (error: any) {
//         next(error); // Ensuring any DB-related errors are handled properly
//     }
// });



// academicSemesterSchema.pre('save', async function (next) {
//     try {
//         const isSemesterExists = await AcademicSemester.findOne({
//             year: this.year,
//             name: this.name,
//         });

//         if (isSemesterExists) {
//             throw new Error('Semester already exists!');
//         }
//         next();
//     } catch (error: any) {
//         next(error); // Pass the error to Mongoose
//     }
// });


export const AcademicSemester = model<TAcademicSemester>(
    'Academic-Semester',
    academicSemesterSchema
);
