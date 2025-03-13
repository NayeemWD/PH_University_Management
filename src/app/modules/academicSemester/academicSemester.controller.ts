import httpStatus from 'http-status'; // Default import
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsyne from '../../utils/catchAsync';

const createAcademicSemester = catchAsyne(async (req, res, next) => {
    const result = AcademicSemesterServices.createAcademicSemesterIntoDB(
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is created succesfully',
        data: result,
    });
});

const getAllAcademicSemester = catchAsyne(async (req, res) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFroDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester are retrieved succesfully',
        data: result,
    });
});

const getSingleAcademicSemester = catchAsyne(async (req, res) => {
    const { semesterId } = req.params;

    const result =
        AcademicSemesterServices.getSingleAcademicSemesterFroDB(semesterId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is retrieved succesfully',
        data: result,
    });
});

const updateAcademicSemester = catchAsyne(async (req, res) => {
    const { semesterId } = req.params;

    const result = AcademicSemesterServices.updateAcademicSemesterFroDB(
        semesterId,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester is updated succesfully',
        data: result,
    });
});

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester,
};
