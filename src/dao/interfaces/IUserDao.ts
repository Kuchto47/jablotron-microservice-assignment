import { UserDto } from '../../db/model';

export interface IUserDao {
    insertUser(user: UserDto): void
    selectAllUsers(): Promise<UserDto[]>;
    selectUserWithAccessToken(accessToken: string): Promise<UserDto>;
}