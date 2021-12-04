import { Request, Response } from "restify";
import { IUserService } from '../services/interfaces/IUserService';
import { ResponseCode } from './ResponseCode';

export async function authenticateUser(request: Request, response: Response, userService: IUserService): Promise<number | null> {
    let authenticatedUserId = await userService.authenticate(request.headers.authorization);
    if (!authenticatedUserId)
        unauthorized(response);
    return authenticatedUserId;
}

function unauthorized(response: Response): void {
    response.status(ResponseCode.UNAUTHORIZED);
    response.end();
}