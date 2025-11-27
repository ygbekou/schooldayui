import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AvantageValue } from '../../models/grh/avantageValue';
import { Employee } from '../../models/grh/employee';
import { Constants } from '../../app.constants';

@Injectable()
export class AvantageValueService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<AvantageValue[]> => {
    this.actionUrl = Constants.apiServer + '/service/avantageValue/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <AvantageValue[]>response.json())
      .catch(this.handleError);
  }

  public getByEmployee = (employee: Employee): Observable<AvantageValue[]> => {
    const toAdd = JSON.stringify(employee);
    this.actionUrl = Constants.apiServer + '/service/avantageValue/getByEmployee';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <AvantageValue[]>response.json())
      .catch(this.handleError);
  }

  public save = (avantageValue : AvantageValue): Observable<AvantageValue> => {
      let toAdd = JSON.stringify(avantageValue);
      let actionUrl = Constants.apiServer + '/service/avantageValue/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (avantageValue : AvantageValue): Observable<Boolean> => {
      let toAdd = JSON.stringify(avantageValue);
      let actionUrl = Constants.apiServer + '/service/avantageValue/delete';
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
