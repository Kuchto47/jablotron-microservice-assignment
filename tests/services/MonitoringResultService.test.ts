import { expect, use } from "chai";
import { MonitoringResultService } from '../../src/services/MonitoringResultService';
import { IMonitoringResultDao } from '../../src/dao/interfaces/IMonitoringResultDao';
import { IMonitoredEndpointDao } from '../../src/dao/interfaces/IMonitoredEndpointDao';
import { IMock, Mock } from "typemoq";
import { MonitoredEndpointDto, MonitoringResultDto } from '../../src/db/model';

use(require("chai-as-promised"));

describe("MonitoringResultService", () => {
    let monitoringResultDaoMock: IMonitoringResultDao;
    let monitoredEndpointDaoMock: IMonitoredEndpointDao;

    before(() => {
        let mrDaoMock: IMock<IMonitoringResultDao> = Mock.ofType<IMonitoringResultDao>();
        let meDaoMock: IMock<IMonitoredEndpointDao> = Mock.ofType<IMonitoredEndpointDao>();

        mrDaoMock
            .setup(x => x.insertMonitoringResult)
            .returns((_: MonitoringResultDto) => (_) => Promise.resolve(42));

        mrDaoMock
            .setup(x => x.selectLast10MonitoringResultsForEndpoint)
            .returns((_: number) => (_) => Promise.resolve([{} as MonitoringResultDto]));

        let fakeEndpoint: MonitoredEndpointDto = {
            name: "",
            url: "",
            creationDate: "",
            monitoredInterval: 47,
            ownerId: 1
        };

        meDaoMock
            .setup(x => x.selectMonitoredEndpointById)
            .returns((_: number) => (_) => Promise.resolve(fakeEndpoint));

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

    describe("selectLast10ResultsForEndpoint", () => {
        it("returns list of MonitoringResults", async () => {
            let service = new MonitoringResultService(monitoringResultDaoMock, monitoredEndpointDaoMock);
            let actualResult = await service.selectLast10ResultsForEndpoint(1, 1);
            expect(actualResult.length).to.equal(1);
            expect(actualResult).to.eql([{} as MonitoringResultDto]);
        });

        it("throws because endpoint belongs to somebody else", async () => {
            let service = new MonitoringResultService(monitoringResultDaoMock, monitoredEndpointDaoMock);
            expect(service.selectLast10ResultsForEndpoint(1, 2)).to.eventually.throw();
        });
    });
});