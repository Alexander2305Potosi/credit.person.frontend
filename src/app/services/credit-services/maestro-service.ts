import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderMaestro } from '../../base/providerMaestro';
import { CONSTANST } from '../../utils/constanst';


@Injectable()
export class MaestroService implements ProviderMaestro {
  constructor(private httpClient: HttpClient) { }

  getlistPerson(): Observable<any> {
     return this.httpClient.get(CONSTANST.routes.maestro_list.person);
  }

  getListTypeIdentification(): Observable<any> {
    return this.httpClient.get(CONSTANST.routes.maestro_list.typeIdentification);
  }

  getListCity(): Observable<any> {
    return this.httpClient.get(CONSTANST.routes.maestro_list.city);
  }

  getListSuburbByCity(): Observable<any> {
    return this.httpClient.get(CONSTANST.routes.maestro_list.suburbByCity);
  }

}
