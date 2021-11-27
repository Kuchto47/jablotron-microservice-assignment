export interface IDbFiller {
    prepareDbSchema(): void;
    seedDataIntoDb(): void;
}