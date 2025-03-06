import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';

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
];

modeuleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
