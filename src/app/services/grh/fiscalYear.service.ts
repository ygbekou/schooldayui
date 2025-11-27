import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { FiscalYear } from '../../models/grh/fiscalYear';
import { Constants } from '../../app.constants';

@Injectable()
export class FiscalYearService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<FiscalYear[]> => {
    this.actionUrl = Constants.apiServer + '/service/fiscalYear/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <FiscalYear[]>response.json())
      .catch(this.handleError);
  }

  public save = (fiscalYear : FiscalYear): Observable<FiscalYear> => {
      let toAdd = JSON.stringify(fiscalYear);
      let actionUrl = Constants.apiServer + '/service/fiscalYear/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public getFiscalYear = (fiscalYearId: string): Observable<FiscalYear> => {
    let toAdd = JSON.stringify(fiscalYearId);
    let actionUrl = Constants.apiServer + '/service/fiscalYear/getFiscalYear';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public delete = (fiscalYear : FiscalYear): Observable<Boolean> => {
      let toAdd = JSON.stringify(fiscalYear);
      let actionUrl = Constants.apiServer + '/service/fiscalYear/delete';
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
