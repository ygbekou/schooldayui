import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { TeacherLevelNew } from '../../models/grh/teacherLevelNew';
import { Constants } from '../../app.constants';

@Injectable()
export class TeacherLevelNewService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<TeacherLevelNew[]> => {
    this.actionUrl = Constants.apiServer + '/service/teacherLevelNew/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <TeacherLevelNew[]>response.json())
      .catch(this.handleError);
  }

  public save = (teacherLevelNew : TeacherLevelNew): Observable<TeacherLevelNew> => {
      let toAdd = JSON.stringify(teacherLevelNew);
      let actionUrl = Constants.apiServer + '/service/teacherLevelNew/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (teacherLevelNew : TeacherLevelNew): Observable<Boolean> => {
      let toAdd = JSON.stringify(teacherLevelNew);
      let actionUrl = Constants.apiServer + '/service/teacherLevelNew/delete';
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
