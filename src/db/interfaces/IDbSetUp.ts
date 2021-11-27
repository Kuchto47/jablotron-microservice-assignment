export interface IDbSetUp {
    prepareDbSchema(): void;
    seedDataIntoDb(): void;
}