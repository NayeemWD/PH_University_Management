/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

// const globalErrorHandler = (
//     err: any,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const statusCode = 5000;
//     const message = err.message || 'Something went wromng!';

//     return res.status(statusCode).json({
//         success: false,
//         message,
//         error: err,
//     });
// };


// VhatGPT code:
const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Explicitly return void
    const statusCode = err.status || 500; // Ensure status code is valid
    const message = err.message || 'Something went wrong!';

    res.status(statusCode).json({
        success: false,
        message,
        error: err, // Consider filtering out sensitive error details
    });
};

export default globalErrorHandler;
