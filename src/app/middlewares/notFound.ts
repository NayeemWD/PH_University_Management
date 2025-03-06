/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status'; // Default import

const notFound = (req: Request, res: Response, next: NextFunction): void => {
    res.status(httpStatus.NOT_FOUND).json({
        // Correct usage
        success: false,
        message: 'API Not Found !!',
        error: '',
    });
};


// error:
// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status'; // Default import

// const notFound = (req: Request, res: Response, next: NextFunction) => {
//     return res.status(httpStatus.NOT_FOUND).json({
//         // Correct usage
//         success: false,
//         message: 'API Not Found !!',
//         error: '',
//     });
// };

export default notFound;
