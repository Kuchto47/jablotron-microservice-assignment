export interface IProbeMonitoredEndpoint {
    /**
     * Updates monitored URL
     * 
     * @param url new url to monitor
     */
    updateMetaData(url: string, intervalTime: number): void;

    /**
     * Cancels existing monitoring
     * 
     * Call before removal from Probe
     */
    cancelMonitoring(): void;
}