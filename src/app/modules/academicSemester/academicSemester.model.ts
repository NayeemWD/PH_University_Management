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

export const AcademicSemester = model<TAcademicSemester>(
    'Academic-Semester',
    academicSemesterSchema
);
