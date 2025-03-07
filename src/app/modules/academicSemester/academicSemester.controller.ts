import httpStatus from 'http-status'; // Default import
import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsyne from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsyne(
    async (req, res, next) => {
        const result = AcademicSemesterServices.createAcademicSemesterIntoDB(
            req.body
        );

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic Semester is created succesfully',
            data: result,
        });
    }
);

export const AcademicSemesterControllers = {
    createAcademicSemester,
};
