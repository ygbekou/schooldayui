import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { SalaryType } from '../../models/grh/salaryType';
import { Constants } from '../../app.constants';

@Injectable()
export class SalaryTypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<SalaryType[]> => {
    this.actionUrl = Constants.apiServer + '/service/salaryType/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <SalaryType[]>response.json())
      .catch(this.handleError);
  }

  public save = (salaryType : SalaryType): Observable<SalaryType> => {
      let toAdd = JSON.stringify(salaryType);
      let actionUrl = Constants.apiServer + '/service/salaryType/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (salaryType : SalaryType): Observable<Boolean> => {
      let toAdd = JSON.stringify(salaryType);
      let actionUrl = Constants.apiServer + '/service/salaryType/delete';
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
