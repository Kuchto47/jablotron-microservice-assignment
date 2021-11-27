export class UserDto {
    public id?: number;
    public name: string;
    public email: string;
    public accessToken: string;
}

export interface IMonitoredEndpointDto {
    id?: number;
    name: string;
    url: string;
    creationDate: any; //DateTime
    lastCheckDate: any; //DateTime
    monitoredInterval: number; //in seconds
    _owner: UserDto
}