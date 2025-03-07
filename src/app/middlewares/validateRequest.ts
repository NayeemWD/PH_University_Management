import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

// const shenaBahini = (): void => {
//     async (req: Request, res: Response, next: NextFunction) => {
//         console.log('I am a shenabahini');
//         next();
//     };
// };
// router.post('/create-student', shenaBahini, UserController.createStudent);

// const shenaBahini = (): RequestHandler => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         console.log('I am a shenabahini');
//         next();
//     };
// };
const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // validation check
            //if everything allright next() ->
            await schema.parseAsync({
                body: req.body,
            });

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default validateRequest;
