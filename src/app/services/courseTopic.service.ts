import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CourseTopic } from '../models/courseTopic';
import { Constants } from '../app.constants';
import { SubjectLevelView } from '../models/subjectLevelView';

@Injectable()
export class CourseTopicService { 

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getCourseTopics = (subjectId:  string, levelId:  string): Observable<CourseTopic[]> => {
    let actionUrl = Constants.apiServer + '/service/courseTopic/list/' + subjectId + '/' + levelId;
    return this.http.get(actionUrl, { headers: this.headers })
      .map((response: Response) => <CourseTopic[]>response.json())
      .catch(this.handleError);
  }
  
  public getAll = (): Observable<CourseTopic[]> => {
    this.actionUrl = Constants.apiServer + '/service/courseTopic/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseTopic[]>response.json())
      .catch(this.handleError);
  }

  public getCourseTopic = (courseTopicId: string): Observable<CourseTopic> => {
    let toAdd = JSON.stringify(courseTopicId);
    let actionUrl = Constants.apiServer + '/service/courseTopic/getCourseTopic';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
  public getActiveCourseTopics = (): Observable<CourseTopic[]> => {
    this.actionUrl = Constants.apiServer + '/service/courseTopic/getActiveCourseTopics';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseTopic[]>response.json())
      .catch(this.handleError);
  }
  
  public getSubjectLevels = (): Observable<SubjectLevelView[]> => {
    this.actionUrl = Constants.apiServer + '/service/courseTopic/getSubjectLevels';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <SubjectLevelView[]>response.json())
      .catch(this.handleError);
  }
  
   public save = (courseTopic: CourseTopic): Observable<CourseTopic> => {
    let toAdd = JSON.stringify(courseTopic);
    let actionUrl = Constants.apiServer + '/service/courseTopic/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (courseTopic: CourseTopic): Observable<Boolean> => {
    let toAdd = JSON.stringify(courseTopic);
    let actionUrl = Constants.apiServer + '/service/courseTopic/delete';
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
