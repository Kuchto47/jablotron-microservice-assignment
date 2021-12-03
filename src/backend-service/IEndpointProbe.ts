export interface IEndpointProbe {
    start(): void;
    onInsert(endpointId: number): void;
    onUpdate(endpointId: number): void;
    onDelete(endpointId: number): void;
}