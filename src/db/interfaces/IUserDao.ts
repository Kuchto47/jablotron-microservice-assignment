import { UserDto } from '../schema/model';

export interface IUserDao {
    insertUser(user: UserDto): void
    selectAllUsers(): Promise<UserDto[]>;
    selectUserWithAccessToken(accessToken: string): Promise<UserDto>;
}