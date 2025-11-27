import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { PayParameterType } from '../../models/grh/payParameterType';
import { Constants } from '../../app.constants';

@Injectable()
export class PayParameterTypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<PayParameterType[]> => {
    this.actionUrl = Constants.apiServer + '/service/payParameterType/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PayParameterType[]>response.json())
      .catch(this.handleError);
  }

  public save = (payParameterType : PayParameterType): Observable<PayParameterType> => {
      let toAdd = JSON.stringify(payParameterType);
      let actionUrl = Constants.apiServer + '/service/payParameterType/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (payParameterType : PayParameterType): Observable<Boolean> => {
      let toAdd = JSON.stringify(payParameterType);
      let actionUrl = Constants.apiServer + '/service/payParameterType/delete';
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
