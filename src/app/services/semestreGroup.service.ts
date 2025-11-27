import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { SemestreGroup } from '../models/semestreGroup';
import { Constants } from '../app.constants';

@Injectable()
export class SemestreGroupService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<SemestreGroup[]> => {
    this.actionUrl = Constants.apiServer + '/service/semestreGroup/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <SemestreGroup[]>response.json())
      .catch(this.handleError);
  }

  public save = (semestreGroup : SemestreGroup): Observable<SemestreGroup> => {
      let toAdd = JSON.stringify(semestreGroup);
      let actionUrl = Constants.apiServer + '/service/semestreGroup/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }
   public getSemestreGroup = (semestreGroupId: string): Observable<SemestreGroup> => {
    let toAdd = JSON.stringify(semestreGroupId);
    let actionUrl = Constants.apiServer + '/service/semestreGroup/getSemestreGroup';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public delete = (semestreGroup : SemestreGroup): Observable<Boolean> => {
      let toAdd = JSON.stringify(semestreGroup);
      let actionUrl = Constants.apiServer + '/service/semestreGroup/delete';
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
