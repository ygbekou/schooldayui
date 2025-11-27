import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Bank } from '../../models/grh/bank';
import { Constants } from '../../app.constants';

@Injectable()
export class BankService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<Bank[]> => {
    this.actionUrl = Constants.apiServer + '/service/grh/bank/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Bank[]>response.json())
      .catch(this.handleError);
  }

  public getAllActive = (): Observable<Bank[]> => {
    this.actionUrl = Constants.apiServer + '/service/grh/bank/getAllActive';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Bank[]>response.json())
      .catch(this.handleError);
  }

  public save = (bank : Bank): Observable<Bank> => {
      let toAdd = JSON.stringify(bank);
      let actionUrl = Constants.apiServer + '/service/grh/bank/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (bank : Bank): Observable<Boolean> => {
      let toAdd = JSON.stringify(bank);
      let actionUrl = Constants.apiServer + '/service/grh/bank/delete';
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
