import { UserDto } from '../../db/model';

export interface IUserFacade {
    selectAllUsers(): Promise<UserDto[]>;
}