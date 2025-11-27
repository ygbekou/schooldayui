import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { CloseSemestreGroup } from '../models/closeSemestreGroup';
import { Exam } from '../models/exam';
import { Constants } from '../app.constants';

@Injectable()
export class CloseSemestreGroupService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<CloseSemestreGroup[]> => {
    this.actionUrl = Constants.apiServer + '/service/closeSemestreGroup/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <CloseSemestreGroup[]>response.json())
      .catch(this.handleError);
  }

  public save = (closeSemestreGroup : CloseSemestreGroup): Observable<CloseSemestreGroup> => {
      let toAdd = JSON.stringify(closeSemestreGroup);
      let actionUrl = Constants.apiServer + '/service/closeSemestreGroup/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public getCloseSemestreGroup = (closeSemestreGroupId: string): Observable<CloseSemestreGroup> => {
    let toAdd = JSON.stringify(closeSemestreGroupId);
    let actionUrl = Constants.apiServer + '/service/closeSemestreGroup/getCloseSemestreGroup';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getCloseSemestreGroupBySemestreGroupAndCycleAndSchoolYear = (exam : Exam): Observable<CloseSemestreGroup> => {
      console.log("CLOSE");
      let toAdd = JSON.stringify(exam);
      let actionUrl = Constants.apiServer + '/service/closeSemestreGroup/getCloseSemestreGroupBySemestreGroupAndCycleAndSchoolYear';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (closeSemestreGroup : CloseSemestreGroup): Observable<Boolean> => {
      let toAdd = JSON.stringify(closeSemestreGroup);
      let actionUrl = Constants.apiServer + '/service/closeSemestreGroup/delete';
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
