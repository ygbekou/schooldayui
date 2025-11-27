import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from '../models/subject';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { Author } from '../models/author';
import { TimeSheetEntry } from "../models/timeSheetEntry";
import { TimeSheetEntryGroup } from "../models/timeSheetEntryGroup";
import { TimeSheetEntryDetail } from 'app/models/timeSheetEntryDetail';

@Injectable()
export class TimeSheetService {

  private actionUrl: string;
  private headers: Headers;
  public authors: Author[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.authors = [];
    this.getAll()
      .subscribe((data: Author[]) => this.authors = data,
      error => console.log(error),
      () => console.log('Get all Authors complete'));

  }

  public getAll = (): Observable<Author[]> => {
    this.actionUrl = Constants.apiServer + '/service/author/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Author[]>response.json())
      .catch(this.handleError);
  }

  public save = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toAdd = JSON.stringify(timeSheetEntryGroup);

    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/details/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteTimeSheetEntry = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toDelete = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/delete';
    return this.http.post(actionUrl, toDelete, { headers: this.headers })
      .map((response: Response) => {
         return response.json();
      })
      .catch(this.handleError);
  }

  public approve = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toSave = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/approve';
    return this.http.post(actionUrl, toSave, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public approveByDCMC = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toSave = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/approveByDCMC';
    return this.http.post(actionUrl, toSave, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public approveBySG = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toSave = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/approveBySG';
    return this.http.post(actionUrl, toSave, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public reject = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toSave = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/reject';
    return this.http.post(actionUrl, toSave, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public rejectByDCMC = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toSave = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/rejectByDCMC';
    return this.http.post(actionUrl, toSave, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public rejectBySG = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntryGroup> => {
    let toSave = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/rejectBySG';
    return this.http.post(actionUrl, toSave, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getHeaders = (): Observable<String[]> => {
    this.actionUrl = Constants.apiServer + '/service/timeSheetEntry/getHeaders';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <string[]>response.json())
      .catch(this.handleError);
  }

  public getTeacherTimeSheetEntries = (teacherId: number): Observable<TimeSheetEntryGroup[]> => {
    this.actionUrl = Constants.apiServer + '/service/timeSheetEntry/list/byteacher/' + teacherId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getTeacherTimeSheetEntriesByCourse = (courseId: number): Observable<TimeSheetEntryGroup[]> => {
    this.actionUrl = Constants.apiServer + '/service/timeSheetEntry/list/bycourse/' + courseId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getTimeSheetEntryDetailsDto = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntry[]> => {

    let toAdd = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/getTimeSheetEntryDetailsDtoByCourse';
    /* let actionUrl = Constants.apiServer + '/service/timeSheetEntry/getTimeSheetEntryDetailsDto'; */
     return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getTimeSheetEntryDetailsDtoByCourse = (timeSheetEntryGroup: TimeSheetEntryGroup): Observable<TimeSheetEntry[]> => {

    let toAdd = JSON.stringify(timeSheetEntryGroup);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/getTimeSheetEntryDetailsDtoByCourse';
     return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }



  public saveTimeSheetEntryDetailsByCourseAndTimeSheetEntryDetail = (detail: TimeSheetEntryDetail): Observable<TimeSheetEntryDetail> => {

    let data = JSON.stringify(detail);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/saveTimeSheetEntryDetailsByCourseAndTimeSheetEntryDetail';
     return this.http.post(actionUrl, data, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public editTimeSheetEntryDetailsByTimeSheetEntryDetail = (detail: TimeSheetEntryDetail): Observable<TimeSheetEntryDetail[]> => {

    let data = JSON.stringify(detail);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/editTimeSheetEntryDetailsByTimeSheetEntryDetail';
     return this.http.post(actionUrl, data, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAllTimeSheetEntryDetailsCourseClassOfTeacherByTimeSheetEntryDetail = (detail: TimeSheetEntryDetail): Observable<TimeSheetEntryDetail[]> => {

    let data = JSON.stringify(detail);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/getAllTimeSheetEntryDetailsCourseClassOfTeacherByTimeSheetEntryDetail';
     return this.http.post(actionUrl, data, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public deleteTimeSheetEntryDetailsByTimeSheetEntryDetail = (detail: TimeSheetEntryDetail): Observable<string> => {

    let data = JSON.stringify(detail);
    let actionUrl = Constants.apiServer + '/service/timeSheetEntry/deleteTimeSheetEntryDetailsByTimeSheetEntryDetail';
     return this.http.post(actionUrl, data, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
