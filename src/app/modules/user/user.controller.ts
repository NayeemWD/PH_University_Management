import httpStatus from 'http-status'; // Default import
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsyne from '../../utils/catchAsync';

// const createStudent = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
// const createStudent: RequestHandler = async (req, res, next) => {
//     try {
//         const { password, student: studentData } = req.body;
//         const result = await UserService.createStudentIntoDB(
//             password,
//             studentData
//         );

//         // res.status(200).json({
//         //     success: true,
//         //     message: 'Student is created succesfully',
//         //     data: result,
//         // });
//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Student is created succesfully',
//             data: result,
//         });
//     } catch (error) {
//         next(error);
//     }
// };
const createStudent: RequestHandler = catchAsyne(async (req, res, next) => {
    const { password, student: studentData } = req.body;
    const result = await UserService.createStudentIntoDB(password, studentData);

    // res.status(200).json({
    //     success: true,
    //     message: 'Student is created succesfully',
    //     data: result,
    // });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created succesfully',
        data: result,
    });
});

export const UserController = {
    createStudent,
};
