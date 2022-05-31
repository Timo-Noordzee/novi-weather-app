import {NextFunction, Request, Response} from 'express';

export function exceptionHandler(error: Error, req: Request, res: Response, _: NextFunction) {
    console.error(error);
    res.status(500).send(error);
}
