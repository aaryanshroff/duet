import { Request } from 'express';
import { UserTable } from '../db/models';

export interface MulterFile extends Express.Multer.File {
    location: string;
}

export interface ReqUser extends Request {
    user?: Payload;
}

export interface Payload extends UserTable {
    user_id?: number
}