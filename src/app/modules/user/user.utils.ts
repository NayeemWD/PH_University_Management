import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// const findLastStudentId = async () => {
//     const lastStudent = await User.findOne(
//         {
//             role: 'student',
//         },
//         {
//             id: 1,
//             _id: 0,
//         }
//     )
//         .sort({
//             createdAt: -1,
//         })
//         .lean();

//     return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
// };

// export const generateStudentId = async (payload: TAcademicSemester) => {
//     // first time 0000
//     // 0001 => 1
//     const currentId = (await findLastStudentId()) || (0).toString();

//     let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//     incrementId = `${payload.year}.${payload.code}.${incrementId}`;

//     return incrementId;
// };



//ChatGPT code

// const findLastStudentId = async () => {
//     const lastStudent = await User.findOne(
//         { role: 'student' },
//         { id: 1, _id: 0 }
//     )
//         .sort({ createdAt: -1 })
//         .lean();

//     if (!lastStudent?.id) return undefined;

//     // Extract only the last numeric ID (4 digits)
//     const idParts = lastStudent.id.split('.'); // Split by "."
//     const lastPart = idParts[idParts.length - 1]; // Get last segment

//     return /^\d+$/.test(lastPart) ? lastPart : undefined; // Ensure it's a number
// };

// export const generateStudentId = async (payload: TAcademicSemester) => {
//     const currentId = (await findLastStudentId()) || "0000"; // Ensure a valid number
//     const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//     return `${payload.year}.${payload.code}.${incrementId}`;
// };



// deepseek code
const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0,
        }
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    // Extract the last part of the ID (e.g., "0005" from "2021.03.4.0005")
    return lastStudent?.id ? lastStudent.id.split('.').pop() : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
    // Get the last student ID or default to "0000" if no student exists
    const currentId = (await findLastStudentId()) || '0000';

    // Ensure currentId is a valid number, then increment and pad with zeros
    const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    // Construct the final ID in the desired format: year.code.incrementId
    const studentId = `${payload.year}.${payload.code}.${incrementId}`;

    return studentId;
};
