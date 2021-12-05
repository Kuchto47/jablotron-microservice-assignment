import { expect } from 'chai';
import { IMock, Mock } from 'typemoq';
import { IMonitoredEndpointDao } from '../../src/dao/interfaces/IMonitoredEndpointDao';
import { MonitoredEndpointDto } from '../../src/db/model';
import { MonitoredEndpointService } from '../../src/services/MonitoredEndpointService';
import { MonitoredEndpointPayload } from '../../src/services/model';

describe("MonitoredEndpointService", () => {
    let monitoredEndpointDao: IMonitoredEndpointDao;

    before(() => {
        let meDao: IMock<IMonitoredEndpointDao> = Mock.ofType<IMonitoredEndpointDao>();

        meDao.setup(x => x.insertMonitoredEndpoint)
             .returns((_: MonitoredEndpointDto) => (_) => Promise.resolve(47));
        
        meDao.setup(x => x.selectMonitoredEndpointsForUser)
             .returns((_: number) => (_) => Promise.resolve([{} as MonitoredEndpointDto]));

        monitoredEndpointDao = meDao.object;
    });

    it("instantiates", () => {
        expect(() => new MonitoredEndpointService(monitoredEndpointDao)).to.not.throw();
    });

    describe("insertEndpoint", () => {
        let payload = {} as MonitoredEndpointPayload;
        it("returns ID of successfully inserted endpoint", () => {
            let service = new MonitoredEndpointService(monitoredEndpointDao);
            let actualResult = service.insertEndpoint(42, payload);
            expect(actualResult).to.eventually.equal(47);
        });

        it("throws on unsuccessful inserting", () => {
            let meDao: IMock<IMonitoredEndpointDao> = Mock.ofType<IMonitoredEndpointDao>();
            meDao.setup(x => x.insertMonitoredEndpoint).returns((_: MonitoredEndpointDto) => (_) => Promise.reject());
            let service = new MonitoredEndpointService(meDao.object);
            expect(service.insertEndpoint(1, payload)).to.eventually.throw();
        });
    });

    describe("selectAllEndpointsForUser", () => {
        it("returns list of MonitoredEndpointDtos", () => {
            let service = new MonitoredEndpointService(monitoredEndpointDao);
            expect(service.selectAllEndpointsForUser(1)).to.eventually.eql([{} as MonitoredEndpointDto]);
        });

        it("returns empty list when user does not own any endpoints", () => {
            let meDao: IMock<IMonitoredEndpointDao> = Mock.ofType<IMonitoredEndpointDao>();
            meDao.setup(x => x.selectMonitoredEndpointsForUser).returns((_: number) => (_) => Promise.resolve([]));
            let service = new MonitoredEndpointService(monitoredEndpointDao);
            expect(service.selectAllEndpointsForUser(0)).length.to.eventually.equal(0);
        });

        it("throws on DAO error", () => {
            let meDao: IMock<IMonitoredEndpointDao> = Mock.ofType<IMonitoredEndpointDao>();
            meDao.setup(x => x.selectMonitoredEndpointsForUser).returns((_: number) => (_) => Promise.reject());
            let service = new MonitoredEndpointService(monitoredEndpointDao);
            expect(service.selectAllEndpointsForUser(0)).to.eventually.throw();
        });
    });

    /* AND SO ON ... */
});