import { expect } from "chai";
import { MonitoringResultService } from '../../src/services/MonitoringResultService';
import { IMonitoringResultDao } from '../../src/dao/interfaces/IMonitoringResultDao';
import { IMonitoredEndpointDao } from '../../src/dao/interfaces/IMonitoredEndpointDao';
import { IMock, Mock } from "typemoq";
import { MonitoringResultDto } from '../../src/db/model';

describe("MonitoringResultService", () => {
    let monitoringResultDaoMock: IMonitoringResultDao;
    let monitoredEndpointDaoMock: IMonitoredEndpointDao;

    before(() => {
        let mrDaoMock: IMock<IMonitoringResultDao> = Mock.ofType<IMonitoringResultDao>();
        let meDaoMock: IMock<IMonitoredEndpointDao> = Mock.ofType<IMonitoredEndpointDao>();

        mrDaoMock
            .setup(x => x.insertMonitoringResult({} as MonitoringResultDto))
            .returns(() => Promise.resolve(42));

        monitoringResultDaoMock = mrDaoMock.object;
        monitoredEndpointDaoMock = meDaoMock.object;
    });

    it("instantiates", () => {
        expect(() => new MonitoringResultService(monitoringResultDaoMock, monitoredEndpointDaoMock)).to.not.throw();
    });

    describe("insertResult", () => {
        it("returns 42 as ID of successfully created MointoringResult", async () => {
            let service = new MonitoringResultService(monitoringResultDaoMock, monitoredEndpointDaoMock);
            let dto = {} as MonitoringResultDto;
            let actualResult = await service.insertResult(dto);
            expect(actualResult).to.equal(42);
        });
    });
});