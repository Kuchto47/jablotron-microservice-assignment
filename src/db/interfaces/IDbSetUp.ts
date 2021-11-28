export interface IDbSetUp {
    prepareDbSchema(): IDbSetUp;
    seedDataIntoDb(): Promise<void>;
    then(): IDbSetUp;
}