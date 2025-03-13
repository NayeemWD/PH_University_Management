import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartments } from './academicDepartment.service';
import catchAsync from '../../utils/catchAsync';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartments.createAcademicDepartmentIntoDB(
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is created succesfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result =
        await AcademicDepartments.getSingleAcademicDepartmentFromDB(
            departmentId
        );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is retrieved succesfully',
        data: result,
    });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartments.updateAcademicDepartmentFromDB(
        departmentId,
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Department is updated succesfully',
        data: result,
    });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartments.getAllAcademicDepartmentsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Departments are retrieved successfully',
        data: result,
    });
});

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};
