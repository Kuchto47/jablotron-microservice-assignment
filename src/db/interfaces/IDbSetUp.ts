export interface IDbSetUp {
    /**
     * Prepares DB schema if it does not exist
     * 
     * @returns itself
     */
    prepareDbSchema(): IDbSetUp;

    /**
     * Seeds data into existing DB and schema
     */
    seedDataIntoDb(): Promise<void>;

    /**
     * Simplifies usage
     * 
     * @returns itself
     */
    then(): IDbSetUp;
}