import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
    '/create-academic-semester',
    validateRequest(
        AcademicSemesterValidationSchema.createAcademicSemesterValidationSchema
    ),
    AcademicSemesterControllers.createAcademicSemester
);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.delete('/:studentId', StudentControllers.deleteStudent);

// router.get('/', StudentControllers.getAllStudents);

export const AcademicSemesterRoutes = router;
