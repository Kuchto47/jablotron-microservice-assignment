export interface IUserDao {
    id?: number;
    name: string;
    email: string;
    accessToken: string;
}

export interface IMonotoredEndpointDao {
    id?: number;
    name: string;
    url: string;
    creationDate: any; //DateTime
    lastCheckDate: any; //DateTime
    monitoredInterval: number; //in seconds
    owner: IUserDao
}