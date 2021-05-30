import { Credit } from '../models/credit';
import { Observable } from 'rxjs';

export abstract class ProviderCredit {

  constructor() { }

  abstract getListCredit(search : string): Observable<Response>;

  abstract save(credit: Credit): Observable<Response>;

  abstract update(credit: Credit): Observable<Response>;

}
