/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
    const a = 10;
    res.send(a);
};

app.get('/', test);

// Error-handling middleware

app.use(globalErrorHandler);

///////////// tring multupal way solve this errer:
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = 5000;
//     const message = err.message || 'Something went wromng!';

//     return res.status(statusCode).json({
//         success: false,
//         message,
//         error: err,
//     });
// });

// ✅ Correct error-handling middleware
// app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
//     const statusCode = error.statusCode || 500; // Use 500 instead of 5000
//     const message = error.message || 'Something went wrong!';

//     res.status(statusCode).json({
//         success: false,
//         message,
//         error: error.stack, // Include error stack for debugging
//     });
// });

// import { ErrorRequestHandler } from 'express';

// const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
//     const statusCode = error.statusCode || 500;
//     const message = error.message || 'Something went wrong!';

//     res.status(statusCode).json({
//         success: false,
//         message,
//         error: error.stack,
//     });
// };

// // ✅ Use the properly typed error handler
// app.use(errorHandler);

///////////

// Not Found
app.use(notFound);

export default app;
