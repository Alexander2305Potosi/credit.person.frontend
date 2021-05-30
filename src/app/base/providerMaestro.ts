import { Observable } from 'rxjs';

export abstract class ProviderMaestro {

  constructor() { }

  abstract getlistPerson(): Observable<Response>;

  abstract getListTypeIdentification(): Observable<Response>;

  abstract getListCity(): Observable<Response>;

  abstract getListSuburbByCity(): Observable<Response>;

}
