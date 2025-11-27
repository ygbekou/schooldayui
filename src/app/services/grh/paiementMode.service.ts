import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { PaiementMode } from '../../models/grh/paiementMode';
import { Constants } from '../../app.constants';

@Injectable()
export class PaiementModeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<PaiementMode[]> => {
    this.actionUrl = Constants.apiServer + '/service/paiementMode/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaiementMode[]>response.json())
      .catch(this.handleError);
  }

  public save = (paiementMode : PaiementMode): Observable<PaiementMode> => {
      let toAdd = JSON.stringify(paiementMode);
      let actionUrl = Constants.apiServer + '/service/paiementMode/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (paiementMode : PaiementMode): Observable<Boolean> => {
      let toAdd = JSON.stringify(paiementMode);
      let actionUrl = Constants.apiServer + '/service/paiementMode/delete';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            if (response && response.json()=='Success') {
              return true;
            }else {
              return false;
            }
        })
        .catch(this.handleError);
   }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
