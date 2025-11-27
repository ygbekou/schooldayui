import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Schooling } from '../models/schooling';
import { SchoolingView } from '../models/schoolingView';
import { Constants } from '../app.constants';
import { School } from 'app/models/school';

@Injectable()
export class SchoolService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getById = (id: number): Observable<School> => {
    this.actionUrl = Constants.apiServer + '/service/school/' + id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <School>response.json())
      .catch(this.handleError);
  }

  public getByNamePath = (namePath: string): Observable<School> => {
    this.actionUrl = Constants.apiServer + '/service/school/' + namePath;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <School>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<School[]> => {
    this.actionUrl = Constants.apiServer + '/service/school/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <School[]>response.json())
      .catch(this.handleError);
  }

  public save = (school: School): Observable<School> => {
    const toAdd = JSON.stringify(school);
    const actionUrl = Constants.apiServer + '/service/school/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (school: School): Observable<Boolean> => {
    const toAdd = JSON.stringify(school);
    const actionUrl = Constants.apiServer + '/service/school/delete';
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
