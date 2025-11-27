import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { FiscalYearPayParameter } from '../../models/grh/fiscalYearPayParameter';
import { Constants } from '../../app.constants';

@Injectable()
export class FiscalYearPayParameterService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<FiscalYearPayParameter[]> => {
    this.actionUrl = Constants.apiServer + '/service/fiscalYearPayParameter/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <FiscalYearPayParameter[]>response.json())
      .catch(this.handleError);
  }

  public save = (fiscalYearPayParameter : FiscalYearPayParameter): Observable<FiscalYearPayParameter> => {
      let toAdd = JSON.stringify(fiscalYearPayParameter);
      let actionUrl = Constants.apiServer + '/service/fiscalYearPayParameter/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (fiscalYearPayParameter : FiscalYearPayParameter): Observable<Boolean> => {
      let toAdd = JSON.stringify(fiscalYearPayParameter);
      let actionUrl = Constants.apiServer + '/service/fiscalYearPayParameter/delete';
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
