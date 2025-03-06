import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    // if (await Student.isUserExists(studentData.id)) {
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

    // set manually grnerated id
    userData.id = '2030100003';

    // create a user
    const newUser = await User.create(userData);

    // create a dtudent
    if (Object.keys(newUser).length) {
        // set id, _id as user
        studentData.id = newUser.id;
        studentData.user = newUser._id; //reference _id

        const newStudent = await Student.create(studentData);
        return newStudent;
    }
};

export const UserService = {
    createStudentIntoDB,
};
