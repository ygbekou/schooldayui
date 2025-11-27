import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Teacher } from '../models/teacher';
import { TeamMember } from '../models/teamMember';
import { User } from '../models/User';
import { Constants } from '../app.constants';
import { AnyView } from 'app/models/anyView';

@Injectable()
export class TeacherService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getByUser = (user: User): Observable<Teacher> => {
    this.actionUrl = Constants.apiServer + '/service/teacher/getByUser/' + user.id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Teacher>response.json())
      .catch(this.handleError);
  }

  public getByUserObject = (user: User): Observable<Teacher> => {
    const toAdd = JSON.stringify(user);
    this.actionUrl = Constants.apiServer + '/service/teacher/getByUser';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <Teacher>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<Teacher[]> => {
    this.actionUrl = Constants.apiServer + '/service/teacher/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Teacher[]>response.json())
      .catch(this.handleError);
  }

  public getAllActives = (): Observable<Teacher[]> => {
    this.actionUrl = Constants.apiServer + '/service/teacher/getAllActives';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Teacher[]>response.json())
      .catch(this.handleError);
  }

  public getTeamMembers = (): Observable<TeamMember[]> => {
    this.actionUrl = Constants.apiServer + '/service/teacher/getTeamMembers';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <TeamMember[]>response.json())
      .catch(this.handleError);
  }

  public getDeptMembers = (dept: number): Observable<TeamMember[]> => {
    this.actionUrl = Constants.apiServer + '/service/teacher/getTeamMembers/' + dept;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <TeamMember[]>response.json())
      .catch(this.handleError);
  }

  public save = (teacher: Teacher): Observable<Teacher> => {
    
    const toAdd = JSON.stringify(teacher);
    const actionUrl = Constants.apiServer + '/service/teacher/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
        console.log('service '+ teacher);
      })
      .catch(this.handleError);
  }

  public delete = (teacher: Teacher): Observable<Boolean> => {
    const toAdd = JSON.stringify(teacher);
    const actionUrl = Constants.apiServer + '/service/teacher/delete';
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
  public printCard = (matricule: string): Observable<string> => {
    const toAdd = JSON.stringify(matricule);
    const actionUrl = Constants.apiServer + '/service/teacher/printCard';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return <string>response.json();
      })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public getAllTeacherHaveCourseToday = (info: AnyView): Observable<AnyView[]> => {
    const toAdd = JSON.stringify(info);
    const actionUrl = Constants.apiServer + '/service/teacher/getAllTeacherHaveCourseToday';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  


}
