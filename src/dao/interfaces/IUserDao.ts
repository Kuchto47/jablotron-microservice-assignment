import { UserDto } from '../../db/model';

export interface IUserDao {
    /**
     * Inserts given user into DB.
     * 
     * @param user User to insert
     */
    insertUser(user: UserDto): void

    /**
     * Selects all users from DB
     * 
     * @returns all users in DB
     */
    selectAllUsers(): Promise<UserDto[]>;

    /**
     * Get user with given access token
     * 
     * @param accessToken to look for in DB
     * 
     * @returns User
     */
    selectUserWithAccessToken(accessToken: string): Promise<UserDto>;

    /**
     * Get user with given id
     * 
     * @param id ID of user to look for in DB
     * 
     * @returns User
     */
    selectUserWithId(id: number): Promise<UserDto>;
}