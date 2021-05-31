
import { MaestroService } from './maestro-service';
import { of } from 'rxjs';
import { Maestro } from '../../models/maestro';

describe('MaestroService', () => {

    describe('Test Unit MaestroService', () => {
        test('test services', done => {
            const maestro: Maestro = JSON.parse('{"id": 1, "name": "name"}');
            const httpMock = {
                get: jest.fn().mockReturnValue(of(maestro)),
            };

            const service = new MaestroService(httpMock as any);

            service.getlistPerson().subscribe(data => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(maestro);
                done();
            });

            service.getListTypeIdentification().subscribe(data => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(maestro);
                done();
            });

            service.getListCity().subscribe(data => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(maestro);
                done();
            });

            
            service.getListSuburbByCity().subscribe(data => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(maestro);
                done();
            });

        });
    });
});
