import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

const router = Router();

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);

const modeuleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
];

modeuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
