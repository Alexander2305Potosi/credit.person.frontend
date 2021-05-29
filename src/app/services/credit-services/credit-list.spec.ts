import { TestBed } from '@angular/core/testing';

import { CreditListService } from './credit-list';
import { of, throwError } from 'rxjs';
describe('CreditService', () => {
  const http = jest.fn();

  describe('Test Unit ReportService', () => {
    test('test services', done => {
      const recovereds = { "idPerson": 1 };
      const httpMock = {
        post: jest.fn().mockReturnValue(of(recovereds)),
        get: jest.fn().mockReturnValue(of(recovereds))
      };
      const service = new CreditListService(httpMock as any);
      service.listCredit(recovereds).subscribe(data => {
        expect(httpMock.post).toBeDefined();
        expect(httpMock.post).toHaveBeenCalled();
        expect(data).toEqual(recovereds);
        done();
      });

    });
  });
});
