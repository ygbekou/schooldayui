import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { TeacherTypeNew } from '../../models/grh/teacherTypeNew';
import { Constants } from '../../app.constants';

@Injectable()
export class TeacherTypeNewService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<TeacherTypeNew[]> => {
    this.actionUrl = Constants.apiServer + '/service/teacherTypeNew/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <TeacherTypeNew[]>response.json())
      .catch(this.handleError);
  }

  public save = (teacherTypeNew : TeacherTypeNew): Observable<TeacherTypeNew> => {
      let toAdd = JSON.stringify(teacherTypeNew);
      let actionUrl = Constants.apiServer + '/service/teacherTypeNew/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (teacherTypeNew : TeacherTypeNew): Observable<Boolean> => {
      let toAdd = JSON.stringify(teacherTypeNew);
      let actionUrl = Constants.apiServer + '/service/teacherTypeNew/delete';
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
