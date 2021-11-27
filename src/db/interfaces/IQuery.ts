import { IUserDao } from "../schema/model";

export interface IQuery {
    selectAllUsers(): Promise<IUserDao[]>;
}