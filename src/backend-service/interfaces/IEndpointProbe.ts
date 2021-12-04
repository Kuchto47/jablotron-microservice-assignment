export interface IEndpointProbe {
    /**
     * Starts monitoring of endpoints in DB
     */
    start(): Promise<void>;

    /**
     * Load Endpoint with given ID from DB and start monitoring
     * 
     * @param endpointId ID of newly inserted endpoint to monitor
     */
    onInsert(endpointId: number): void;

    /**
     * Load Endpoint with given ID from DB and update data for monitoring
     * 
     * @param endpointId ID of updated endpoint
     */
    onUpdate(endpointId: number): void;

    /**
     * Stop monitoring Endpoint with given ID and remove it from monitoring
     * 
     * @param endpointId ID of recently deleted endpoint
     */
    onDelete(endpointId: number): void;
}