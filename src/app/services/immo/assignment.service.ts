import { Injectable } from '@angular/core';
import { Constants } from 'app/app.constants';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Assignment } from 'app/models/immo/Assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private actionUrl: string;
  private headers: Headers;
  private baseUrlRest = Constants.apiServer + "/service/immobilisation/assignment"

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public getAll = (): Observable<Assignment[]> => {
    this.actionUrl = this.baseUrlRest + '/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Assignment[]>response.json())
      .catch(this.handleError);
}

  public save = (item: Assignment): Observable<any> => {
    let toAdd = JSON.stringify(item);
    let actionUrl = this.baseUrlRest + '/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
  }

  public delete = (file: Assignment): Observable<Boolean> => {
    let toAdd = JSON.stringify(file);
    let actionUrl = this.baseUrlRest + '/delete';
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

  public getAllByiSUnassign = (isUnassign: boolean): Observable<Assignment[]> => {
    this.actionUrl = this.baseUrlRest + '/getAllByiSUnassign/'+isUnassign;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Assignment[]>response.json())
      .catch(this.handleError);
}

}