import { UserDto } from '../../db/model';

export interface IUserFacade {
    selectAllUsers(): Promise<UserDto[]>;
    authenticate(userAccessToken: string): Promise<number | null>;
}