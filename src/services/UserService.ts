import { UserDto } from '../db/model';
import { IUserService } from './interfaces/IUserService';
import { IUserDao } from '../dao/interfaces/IUserDao';

export class UserService implements IUserService {

    /**
     * Class constructor
     * 
     * @param userDao UserDao dependency
     */
    constructor(private readonly userDao: IUserDao) {}

    public async selectAllUsers(): Promise<UserDto[]> {
        throw new Error('Method not implemented.');
    }

    public async authenticate(userAccessToken: string): Promise<number | null> {
        try {
            return (await this.userDao.selectUserWithAccessToken(userAccessToken)).id;
        } catch (e) {
            return null;
        }
    }
}
