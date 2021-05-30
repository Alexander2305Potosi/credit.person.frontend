import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderCredit } from '../../base/providerCredit';
import { Credit } from 'src/app/models/credit';
import { CONSTANST } from 'src/app/utils/constanst';

@Injectable()
export class CreditListService implements ProviderCredit {
  constructor(private httpClient: HttpClient) { }

  getListCredit(search : string): Observable<any> {
    return this.httpClient.get(CONSTANST.routes.credit.list + search);
  }

  save(credit: Credit): Observable<Response> {
    return this.httpClient.post<Response>(
      CONSTANST.routes.credit.save,
      {
        idCredit: 0,
        totalCost: credit.totalCost,
        totalFee: credit.totalFee,
        idPerson: credit.idPerson
      }
    );
  }


  update(credit: Credit): Observable<Response> {
    return this.httpClient.put<Response>(
      CONSTANST.routes.credit.update,
      {
        idCredit: credit.idCredit,
        totalCost: credit.totalCost,
        totalFee: credit.totalFee,
        idPerson: credit.idPerson
      }
    );
  }

}
