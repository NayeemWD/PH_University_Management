import httpStatus from 'http-status'; // Default import
import { NextFunction, Request, RequestHandler, Response } from 'express';
// import studentValidationSchema from './student.validation';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsyne from '../../utils/catchAsync';

// const getAllStudents = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
const getAllStudents: RequestHandler = async (req, res, next) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        // res.status(200).json({
        //     success: true,
        //     message: 'Students are retrieved succesfully',
        //     data: result,
        // });
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Students are retrieved succesfully',
            data: result,
        });
    } catch (error) {
        // res.status(500).json({
        //     success: false,
        //     message: error.message || 'something went wrong',
        //     errer: error,
        // });
        next(error);
    }
};

// const getSingleStudent: RequestHandler = async (req, res, next) => {
//     try {
//         const { studentId } = req.params;

//         const result = await StudentServices.getSingleStudentFromDB(studentId);

//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Students is retrieved succesfully',
//             data: result,
//         });
//     } catch (error: any) {
//         next(error);
//     }
// };

//move to catch Async.ts file
// const catchAsyne = (fn: RequestHandler) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//     };
// };

const getSingleStudent = catchAsyne(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students is retrieved succesfully',
        data: result,
    });
});

const deleteStudent: RequestHandler = catchAsyne(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students is deleted succesfully',
        data: result,
    });
});

// const deleteStudent: RequestHandler = async (req, res, next) => {
//     try {
//         const { studentId } = req.params;
//         const result = await StudentServices.getSingleStudentFromDB(studentId);

//         sendResponse(res, {
//             statusCode: httpStatus.OK,
//             success: true,
//             message: 'Students is deleted succesfully',
//             data: result,
//         });
//     } catch (error: any) {
//         next(error);
//     }
// };

export const StudentControllers = {
    // createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};
