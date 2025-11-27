import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Cico } from '../models/cico';
import { Constants } from '../app.constants';
import { User } from 'app/models/User';
import { AnyView } from 'app/models/anyView';

@Injectable()
export class CicoService {

  private actionUrl: string;
  private headers: Headers;
  x: number;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getById = (id: number): Observable<Cico> => {
    this.actionUrl = Constants.apiServer + '/service/cico/getById/' + id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Cico>response.json())
      .catch(this.handleError);
  }

  public getCicoCleanupTime = (): Observable<number> => {
    this.actionUrl = Constants.apiServer + '/service/cico/getCicoCleanupTime';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <number>response.json())
      .catch(this.handleError);
  }

  public getUserCicos = (user: User): Observable<Cico[]> => {
    this.actionUrl = Constants.apiServer + '/service/cico/getUserCicos/' + user.id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Cico[]>response.json())
      .catch(this.handleError);
  }

  public save = (cico: Cico): Observable<Cico> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl = Constants.apiServer + '/service/cico/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (cico: Cico): Observable<string> => {
    const toAdd = JSON.stringify(cico);
    const actionUrl = Constants.apiServer + '/service/cico/delete';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }

  public adminKiosk = (): Observable<AnyView[]> => {
    this.actionUrl = Constants.apiServer + '/service/cico/getKioskUserCICO/';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <AnyView[]>response.json())
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
