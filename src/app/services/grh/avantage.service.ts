import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Avantage } from '../../models/grh/avantage';
import { Constants } from '../../app.constants';

@Injectable()
export class AvantageService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<Avantage[]> => {
    this.actionUrl = Constants.apiServer + '/service/avantage/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Avantage[]>response.json())
      .catch(this.handleError);
  }

  public save = (avantage : Avantage): Observable<Avantage> => {
      let toAdd = JSON.stringify(avantage);
      let actionUrl = Constants.apiServer + '/service/avantage/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (avantage : Avantage): Observable<Boolean> => {
      let toAdd = JSON.stringify(avantage);
      let actionUrl = Constants.apiServer + '/service/avantage/delete';
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
