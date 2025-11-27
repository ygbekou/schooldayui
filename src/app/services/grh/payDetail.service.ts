import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { PayDetail } from '../../models/grh/payDetail';
import { Employee } from '../../models/grh/employee';
import { Constants } from '../../app.constants';

@Injectable()
export class PayDetailService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<PayDetail[]> => {
    this.actionUrl = Constants.apiServer + '/service/payDetail/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PayDetail[]>response.json())
      .catch(this.handleError);
  }

  public getByEmployee = (employee: Employee): Observable<PayDetail> => {
    const toAdd = JSON.stringify(employee);
    this.actionUrl = Constants.apiServer + '/service/payDetail/getByEmployee';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PayDetail>response.json())
      .catch(this.handleError);
  }

  public getListByEmployee = (employee: Employee): Observable<PayDetail[]> => {
    const toAdd = JSON.stringify(employee);
    this.actionUrl = Constants.apiServer + '/service/payDetail/getListByEmployee';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PayDetail[]>response.json())
      .catch(this.handleError);
  }

  public save = (payDetail : PayDetail): Observable<PayDetail> => {
      let toAdd = JSON.stringify(payDetail);
      let actionUrl = Constants.apiServer + '/service/payDetail/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (payDetail : PayDetail): Observable<Boolean> => {
      let toAdd = JSON.stringify(payDetail);
      let actionUrl = Constants.apiServer + '/service/payDetail/delete';
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
