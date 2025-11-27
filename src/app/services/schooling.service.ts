import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Schooling } from '../models/schooling';
import { SchoolingView } from '../models/schoolingView';
import { Constants } from '../app.constants';

@Injectable()
export class SchoolingService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getById = (id: number): Observable<Schooling> => {
    this.actionUrl = Constants.apiServer + '/service/schooling/schooling/' + id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Schooling>response.json())
      .catch(this.handleError);
  }

  public getByStudent = (userId: number): Observable<SchoolingView[]> => {
    this.actionUrl = Constants.apiServer + '/service/schooling/student/getByUser/' + userId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <SchoolingView[]>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<Schooling[]> => {
    this.actionUrl = Constants.apiServer + '/service/schooling/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Schooling[]>response.json())
      .catch(this.handleError);
  }

  public save = (schooling: Schooling): Observable<Schooling> => {
    const toAdd = JSON.stringify(schooling);
    const actionUrl = Constants.apiServer + '/service/schooling/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (schooling: Schooling): Observable<Boolean> => {
    const toAdd = JSON.stringify(schooling);
    const actionUrl = Constants.apiServer + '/service/schooling/delete';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
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
