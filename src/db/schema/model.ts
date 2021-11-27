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
    creationDate: any; //DateTime
    lastCheckDate: any; //DateTime
    monitoredInterval: number; //in seconds
    ownerId: number
}

export class MonitoringResultDto {
    id?: number;
    checkDate: any; //DateTime
    responseCode: number;
    payloadReturned: string;
    monitoredEndpointId: number;
}