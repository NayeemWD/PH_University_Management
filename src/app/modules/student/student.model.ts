// import bcrypt from 'bcrypt';
// import config from '../../config';

import { model, Schema } from 'mongoose';
import {
    StudentModel,
    TGuardian,
    TLocalGuardian,
    TStudent,
    TUserName,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        require: [true, 'First Name is required'],
        maxLength: [20, 'Name can not be more then 20 characters'],
        trim: true,
        set: function (value: string): string {
            return value.replace(/\s+/g, ' ').trim();
        },
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        require: [true, 'Last Name is required'],
        maxLength: [20, 'Name can not be more then 20 characters'],
        trim: true,
        set: function (value: string): string {
            return value.replace(/\s+/g, ' ').trim();
        },
    },
});

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        trim: true,
        set: function (value: string): string {
            return value.replace(/\s+/g, ' ').trim();
        },
    },
    fatherOccupation: {
        type: String,
        trim: true,
        required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact No is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother Name is required'],
        trim: true,
        set: function (value: string): string {
            return value.replace(/\s+/g, ' ').trim();
        },
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is required'],
        trim: true,
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact No is required'],
    },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
});

const studentSchema = new Schema<TStudent, StudentModel>(
    {
        id: { type: String, required: [true, 'ID is required'], unique: true },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, 'User id is required'],
            unique: true,
            ref: 'User',
        },
        // password: {
        //     type: String,
        //     required: [true, 'Password is required'],
        //     maxlength: [20, 'Password can not be more than 20 characters'],
        // },
        name: {
            type: userNameSchema,
            required: [true, 'Name is required'],
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female', 'other'],
                message: '{VALUE} is not a valid gender',
            },
            required: [true, 'Gender is required'],
        },
        dateOfBirth: { type: Date },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        contactNo: {
            type: String,
            required: [true, 'Contact number is required'],
        },
        emergencyContactNo: {
            type: String,
            required: [true, 'Emergency contact number is required'],
        },
        bloogGroup: {
            type: String,
            enum: {
                values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                message: '{VALUE} is not a valid blood group',
            },
        },
        presentAddress: {
            type: String,
            required: [true, 'Present address is required'],
        },
        permanentAddress: {
            type: String,
            required: [true, 'Permanent address is required'],
        },
        guardian: {
            type: guardianSchema,
            required: [true, 'Guardian information is required'],
        },
        localGuardian: {
            type: localGuradianSchema,
            required: [true, 'Local guardian information is required'],
        },
        profileImg: { type: String },
        // isActive: {      its user to user model
        //     type: String,
        //     enum: {
        //         values: ['active', 'blocked'],
        //         message: '{VALUE} is not a valid status',
        //     },
        //     default: 'active',
        // },
        admissionSemester: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicSemester',
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// virtual
studentSchema.virtual('fullName').get(function () {
    return this.name.firstName + this.name.middleName + this.name.lastName;

    //     const { firstName, middleName, lastName } = this.name;
    //   // Ensure that middleName is only added if it exists
    //   return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`;
});

// // pre save middleware/ hook : will work on create()  save()
// studentSchema.pre('save', async function (next) {
//     // console.log(this, 'pre hook : we will save  data');
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const user = this; // doc
//     // hashing password and save into DB
//     user.password = await bcrypt.hash(
//         user.password,
//         Number(config.bcrypt_salt_rounds)
//     );
//     next();
// });

// // post save middleware / hook
// studentSchema.post('save', function (doc, next) {
//     doc.password = '';
//     next();
// });

// Query Middleware
studentSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

studentSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
