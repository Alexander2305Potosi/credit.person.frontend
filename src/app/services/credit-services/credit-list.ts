import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CreditListService {
  constructor(private httpClient: HttpClient) { }

  listCredit(data): Observable<any> {
    return this.httpClient.post('http://localhost:8080/credit-person/list', data);
  }

}
