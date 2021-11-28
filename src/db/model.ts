export class UserDto {
    public id?: number;
    public name: string;
    public email: string;
    public accessToken: string;
}

export class MonitoredEndpointDto {
    id?: number;
    name: string;
    url: string;
    creationDate: string; //date string
    lastCheckDate?: string; //date string
    monitoredInterval: number; //in seconds
    ownerId: number
}

export class MonitoringResultDto {
    id?: number;
    checkDate: string; //date string
    responseCode: number;
    payloadReturned: string;
    monitoredEndpointId: number;
}