import { IEndpointProbe } from "./IEndpointProbe";

export class EndpointProbe implements IEndpointProbe {

    /**
     * Class constructor
     */
    constructor() {}

    public start(): void {
        // Get all monitored endpoints.

        // For each, store them in a map <id, {monitoredEndpoint(url, intervalTime is enough), interval(fn)}>,
        // where interval is a method running each "monitoredInterval" seconds.
        // Value of this map could be a class

        // This repetitive method fetches url and creates MonitoringResult with current date, response code and response payload.
        // This should be persisted via MonitoringResultFacade.
        // Same current date as for MonitoringResult should be used to update lastCheckDate in MonitoredEndpoint with respective id via facade EndpointFacade.
        throw new Error("Method not implemented.");
    }

    // upon called, should request all monitored endpoints from DB

        // then it should check already monitored endpoints and:
        //      - remove those, that are missing in DB response (use case delete)
        //          - close interval first, then remove from map

        //      - do not touch those, that are both monitored already and in DB response, and url and interval are the same

        //      - update those that are in db response and already monitored and are different in url and/or interval (use case update)
        //          - close original interval and start new one with new value

        //      - insert those that are in DB response and not in map (use case insert)
        //          - start new interval for them

    /**
     * Load Endpoint with given ID from DB and start monitoring
     * @param endpointId ID of newly inserted endpoint to monitor
     */
    public onInsert(endpointId: number): void {
        throw new Error("Method not implemented.");
    }

    /**
     * Load Endpoint with given ID from DB and update data for monitoring
     * @param endpointId ID of updated endpoint
     */
    public onUpdate(endpointId: number): void {
        throw new Error("Method not implemented.");
    }

    /**
     * Stop monitoring Endpoint with given ID and remove it from monitoring
     * @param endpointId ID of recently deleted endpoint
     */
    public onDelete(endpointId: number): void {
        throw new Error("Method not implemented.");
    }

}