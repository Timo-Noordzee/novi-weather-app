import {UserRecord} from 'firebase-functions/lib/providers/auth';

declare global {
    namespace Express {
        interface Request {
            user?: UserRecord;
        }
    }
}
