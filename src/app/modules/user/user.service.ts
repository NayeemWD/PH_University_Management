import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    // if (await Student.isUserExists(payload.id)) {
    //     throw new Error('User already exists!');
    // }

    // if password is not given, use defult password

    // create  a user object
    // const user: NewUser = {};
    const userData: Partial<TUser> = {};

    // if password is not given, use defult password

    userData.password = password || (config.default_password as string);

    // if (!password) {
    //     user.password = config.default_password as string;
    // } else {
    //     user.password = password;
    // }

    // set student role
    userData.role = 'student';

    // find academic seester info
    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester
    );

    // set  grnerated id

    // userData.id = await generateStudentId(admissionSemester); //error

    // userData.id = await generateStudentId(
    //     admissionSemester as TAcademicSemester
    // );

    if (admissionSemester) {
        userData.id = await generateStudentId(admissionSemester);
    } else {
        throw new Error('Admission semester not found');
    }

    // create a user
    const newUser = await User.create(userData);

    // create a dtudent
    if (Object.keys(newUser).length) {
        // set id, _id as user
        payload.id = newUser.id;
        payload.user = newUser._id; //reference _id

        const newStudent = await Student.create(payload);
        return newStudent;
    }
};

export const UserService = {
    createStudentIntoDB,
};
