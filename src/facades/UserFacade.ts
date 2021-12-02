import { UserDto } from '../db/model';
import { IUserFacade } from './interfaces/IUserFacade';

export class UserFacade implements IUserFacade {

    /**
     * Class constructor
     */
    constructor() {}

    /**
     * 
     */
    public async selectAllUsers(): Promise<UserDto[]> {
        throw new Error('Method not implemented.');
    }
}
