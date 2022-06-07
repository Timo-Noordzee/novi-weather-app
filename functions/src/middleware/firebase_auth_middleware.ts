import {auth} from "firebase-admin"
import {NextFunction, Request, Response} from 'express';

export const firebaseAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        const idToken = req.headers.authorization.split(' ')[1];
        auth()
            .verifyIdToken(idToken)
            .then((decoded) => {
                auth()
                    .getUser(decoded.uid)
                    .then((user) => {
                        req.user = user;
                        next();
                    })
                    .catch((_) => next());
            })
            .catch((_) => next());
    } else {
        next();
    }
}
