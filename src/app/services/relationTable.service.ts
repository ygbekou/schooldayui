import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ParentTable } from '../models/parentTable';
import { Constants } from '../app.constants';
import { LookUpTable } from '../models/lookUpTable';
import { RelationAssignment } from '../models/relationAssignment';
import { RelationTable } from '../models/relationTable';

@Injectable()
export class RelationTableService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public save = (relationTable: RelationTable, tableName: string): Observable<RelationTable> => {
    let toAdd = JSON.stringify(relationTable);
    let actionUrl = Constants.apiServer + '/service/relationTable/' + tableName + '/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
  public getChildAll = (lookUpTable: LookUpTable, tableName: string): Observable<RelationAssignment> => {
    let toAdd = JSON.stringify(lookUpTable);
    let actionUrl = Constants.apiServer + '/service/relationTable/' + tableName + '/getChildAll';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
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
