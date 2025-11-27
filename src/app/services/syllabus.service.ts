import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Syllabus} from '../models/syllabus';
import {Constants} from '../app.constants';
import {SyllabusView} from '../models/syllabusView';

@Injectable()
export class SyllabusService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getSyllabuses = (courseId: string, levelId: string, subjectId: string): Observable<SyllabusView[]> => {
    let actionUrl = Constants.apiServer + '/service/syllabus/list/' + courseId + '/' + levelId + '/' + subjectId;
    return this.http.get(actionUrl, {headers: this.headers})
      .map((response: Response) => <SyllabusView[]>response.json())
      .catch(this.handleError);
  }

  public getAll = (): Observable<Syllabus[]> => {
    this.actionUrl = Constants.apiServer + '/service/syllabus/getAll';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Syllabus[]>response.json())
      .catch(this.handleError);
  }

  public getSyllabus = (syllabusId: string): Observable<Syllabus> => {
    let toAdd = JSON.stringify(syllabusId);
    let actionUrl = Constants.apiServer + '/service/syllabus/getSyllabus';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getActiveSyllabuss = (): Observable<Syllabus[]> => {
    this.actionUrl = Constants.apiServer + '/service/syllabus/getActiveSyllabuss';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Syllabus[]>response.json())
      .catch(this.handleError);
  }

  public save = (syllabus: SyllabusView): Observable<SyllabusView> => {
    const toAdd = JSON.stringify(syllabus);
    const actionUrl = Constants.apiServer + '/service/syllabus/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveStatus = (syllabus: SyllabusView): Observable<SyllabusView> => {
    const toAdd = JSON.stringify(syllabus);
    const actionUrl = Constants.apiServer + '/service/syllabus/saveStatus';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveDelegStatus = (syllabus: SyllabusView): Observable<SyllabusView> => {
    const toAdd = JSON.stringify(syllabus);
    const actionUrl = Constants.apiServer + '/service/syllabus/saveDelgStatus';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
  public delete = (syllabus: Syllabus): Observable<Boolean> => {
    let toAdd = JSON.stringify(syllabus);
    let actionUrl = Constants.apiServer + '/service/syllabus/delete';
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
