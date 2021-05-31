
import { CreditListService } from './credit-service';
import { of } from 'rxjs';
import { Credit } from 'src/app/models/credit';
describe('CreditListService', () => {

    describe('Test Unit CreditListService', () => {
        test('test services', done => {
            const search = "value";
            const credit: Credit = JSON.parse('{"idCredit": 1, "totalCost": 1, "totalFee": 1, "idPerson": 1}');
            const httpMock = {
                post: jest.fn().mockReturnValue(of(credit)),
                get: jest.fn().mockReturnValue(of(credit)),
                put: jest.fn().mockReturnValue(of(credit)),
                delete: jest.fn().mockReturnValue(of(credit))
            };
            const service = new CreditListService(httpMock as any);
            service.getListCredit(search).subscribe(data => {
                expect(httpMock.get).toBeDefined();
                expect(httpMock.get).toHaveBeenCalled();
                expect(data).toEqual(credit);
                done();
            });

            service.save(credit).subscribe(data => {
                expect(httpMock.post).toBeDefined();
                expect(httpMock.post).toHaveBeenCalled();
                expect(data).toEqual(credit);
                done();
            });

            service.update(credit).subscribe(data => {
                expect(httpMock.put).toBeDefined();
                expect(httpMock.put).toHaveBeenCalled();
                expect(data).toEqual(credit);
                done();
            });

            service.delete(1).subscribe(data => {
                expect(httpMock.put).toBeDefined();
                expect(httpMock.put).toHaveBeenCalled();
                expect(data).toEqual(credit);
                done();
            });

        });
    });
});
