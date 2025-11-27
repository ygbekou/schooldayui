import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { PayParameter } from '../../models/grh/payParameter';
import { Constants } from '../../app.constants';

@Injectable()
export class PayParameterService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<PayParameter[]> => {
    this.actionUrl = Constants.apiServer + '/service/payParameter/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PayParameter[]>response.json())
      .catch(this.handleError);
  }

  public save = (payParameter : PayParameter): Observable<PayParameter> => {
      let toAdd = JSON.stringify(payParameter);
      let actionUrl = Constants.apiServer + '/service/payParameter/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (payParameter : PayParameter): Observable<Boolean> => {
      let toAdd = JSON.stringify(payParameter);
      let actionUrl = Constants.apiServer + '/service/payParameter/delete';
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
