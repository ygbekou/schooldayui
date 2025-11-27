import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {TimeTable} from '../models/timeTable';
import {Constants} from '../app.constants';
import {TimeTableView} from '../models/timeTableView';
import {ScheduleEvent} from '../models/scheduleEvent';

@Injectable()
export class TimeTableService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getTimeTables = (courseId: string): Observable<TimeTableView[]> => {
    let actionUrl = Constants.apiServer + '/service/timeTable/list/' + courseId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <TimeTableView[]>response.json())
      .catch(this.handleError);
  }

  public getScheduleEvents = (courseId: number, termId: number): Observable<ScheduleEvent[]> => {
    const actionUrl = Constants.apiServer + '/service/timeTable/scheduleEvents/' + courseId + '/' + termId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ScheduleEvent[]>response.json())
      .catch(this.handleError);
  }

  public getClassScheduleEvents = (classId: number, termId: number): Observable<ScheduleEvent[]> => {
    const actionUrl = Constants.apiServer + '/service/timeTable/scheduleEvents/class/' + classId + '/' + termId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ScheduleEvent[]>response.json())
      .catch(this.handleError);
  }

  public getClassScheduleEventsTimeTable = (classId: number, schoolYearId: number, termId: number): Observable<ScheduleEvent[]> => {
    const actionUrl = Constants.apiServer + '/service/timeTable/scheduleEvents/class/' + classId + '/' + schoolYearId + '/' + termId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ScheduleEvent[]>response.json())
      .catch(this.handleError);
  }

  public getFullClassScheduleEvents = (classId: string): Observable<ScheduleEvent[]> => {
    const actionUrl = Constants.apiServer + '/service/timeTable/fullScheduleEvents/class/' + classId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ScheduleEvent[]>response.json())
      .catch(this.handleError);
  }

  public getFullStudentScheduleEvents = (userId: string): Observable<ScheduleEvent[]> => {
    const actionUrl = Constants.apiServer + '/service/timeTable/fullScheduleEvents/student/' + userId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ScheduleEvent[]>response.json())
      .catch(this.handleError);
  }

  public getFullTeacherScheduleEvents = (userId: string): Observable<ScheduleEvent[]> => {
    const actionUrl = Constants.apiServer + '/service/timeTable/fullScheduleEvents/teacher/' + userId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <ScheduleEvent[]>response.json())
      .catch(this.handleError);
  }
  public getAll = (): Observable<TimeTable[]> => {
    this.actionUrl = Constants.apiServer + '/service/timeTable/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <TimeTable[]>response.json())
      .catch(this.handleError);
  }

  public getTimeTable = (timeTableId: string): Observable<TimeTable> => {
    let toAdd = JSON.stringify(timeTableId);
    let actionUrl = Constants.apiServer + '/service/tableTable/getTimeTable';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public save = (timeTable: TimeTable): Observable<TimeTable> => {
    const toAdd = JSON.stringify(timeTable);
    const actionUrl = Constants.apiServer + '/service/timeTable/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (timeTable: TimeTable): Observable<Boolean> => {
    let toAdd = JSON.stringify(timeTable);
    let actionUrl = Constants.apiServer + '/service/timeTable/delete';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
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
