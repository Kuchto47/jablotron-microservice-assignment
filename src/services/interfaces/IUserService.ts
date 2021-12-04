import { UserDto } from '../../db/model';

export interface IUserService {
    /**
     * Selects all users
     * 
     * @returns List of Users
     */
    selectAllUsers(): Promise<UserDto[]>;

    /**
     * Authenticates user. 
     * 
     * @param userAccessToken Token to authenticate
     * 
     * @returns If user is allowed, this user's ID is returned, otherwise null
     */
    authenticate(userAccessToken: string): Promise<number | null>;
}