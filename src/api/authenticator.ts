import { Request, Response } from "restify";
import { IUserService } from '../services/interfaces/IUserService';

export async function authenticateUser(request: Request, response: Response, userService: IUserService): Promise<number | null> {
    let authenticatedUserId = await userService.authenticate(request.headers.authorization);
    if (!authenticatedUserId) this.unathorized(response);
    return authenticatedUserId;
}

function unathorized(response: Response): void {
    response.status(401);
    response.end();
}