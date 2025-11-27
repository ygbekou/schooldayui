import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Constants } from '../../app.constants';
import { PaySlipHistory } from 'app/models/grh/paySlipHistory';

@Injectable()
export class PaySlipHistoryService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public getAll = (): Observable<PaySlipHistory[]> => {
    this.actionUrl = Constants.apiServer + '/service/paySlipHistory/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlipHistory[]>response.json())
      .catch(this.handleError);
  }

  public getAllOrderByPeriodeStartDateDesc = (): Observable<PaySlipHistory[]> => {
    this.actionUrl = Constants.apiServer + '/service/paySlipHistory/getAllOrderByPeriodeStartDateDesc';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlipHistory[]>response.json())
      .catch(this.handleError);
  }

  public getAllOrderByPeriodeStartDateAsc = (): Observable<PaySlipHistory[]> => {
    this.actionUrl = Constants.apiServer + '/service/paySlipHistory/getAllOrderByPeriodeStartDateAsc';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlipHistory[]>response.json())
      .catch(this.handleError);
  }
  
  public getPaySlipHistoryById = (Id: number): Observable<PaySlipHistory> => {
    this.actionUrl = Constants.apiServer + '/service/paySlipHistory/getById/' + Id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlipHistory>response.json())
      .catch(this.handleError);
  }


  public save = (paySlipHistory : PaySlipHistory): Observable<PaySlipHistory> => {
      let toAdd = JSON.stringify(paySlipHistory);
    let actionUrl = Constants.apiServer + '/service/paySlipHistory/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (paySlipHistory : PaySlipHistory): Observable<Boolean> => {
     let toAdd = JSON.stringify(paySlipHistory);
     let actionUrl = Constants.apiServer + '/service/paySlipHistory/delete';
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
