import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { PaySlip } from '../../models/grh/paySlip';
import { Employee } from '../../models/grh/employee';
import { Constants } from '../../app.constants';
import { PaySlipHistory } from 'app/models/grh/paySlipHistory';

@Injectable()
export class PaySlipService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<PaySlip[]> => {
    this.actionUrl = Constants.apiServer + '/service/paySlip/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlip[]>response.json())
      .catch(this.handleError);
  }

  public getPaySlipById = (Id: number): Observable<PaySlip> => {
    this.actionUrl = Constants.apiServer + '/service/paySlip/getById/' + Id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlip>response.json())
      .catch(this.handleError);
  }

  public getPaySlipByHistoryId = (Id: number): Observable<PaySlip> => {
    this.actionUrl = Constants.apiServer + '/service/paySlip/getByHistory/' + Id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <PaySlip>response.json())
      .catch(this.handleError);
  }

  public getByEmployee = (employee: Employee): Observable<PaySlip> => {
    const toAdd = JSON.stringify(employee);
    this.actionUrl = Constants.apiServer + '/service/paySlip/getByEmployee';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PaySlip>response.json())
      .catch(this.handleError);
  }

  public getListPaySlipByPSHistory = (paySlipHistory: PaySlipHistory): Observable<PaySlip[]> => {
    const toAdd = JSON.stringify(paySlipHistory);
    this.actionUrl = Constants.apiServer + '/service/paySlip/getListPaySlipByPSHistory';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <PaySlip[]>response.json())
      .catch(this.handleError);
  }

  public save = (paySlip : PaySlip): Observable<PaySlip> => {
      let toAdd = JSON.stringify(paySlip);
      let actionUrl = Constants.apiServer + '/service/paySlip/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (paySlip : PaySlip): Observable<Boolean> => {
      let toAdd = JSON.stringify(paySlip);
      let actionUrl = Constants.apiServer + '/service/paySlip/delete';
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
