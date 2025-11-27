import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LookUpTable } from '../models/lookUpTable';
import { Constants } from '../app.constants';
import {User} from "../models/User";
import {SearchText} from "../models/searchText";
import {Company} from "../models/company";

@Injectable()
export class LookUpTableService {

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (tableName: string): Observable<LookUpTable[]> => {
    this.actionUrl = Constants.apiServer + '/service/lookUpTable/' + tableName + '/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <LookUpTable[]>response.json())
      .catch(this.handleError);
  }

  public getLookUpTable = (lookUpTableId: string): Observable<LookUpTable> => {
    let toAdd = JSON.stringify(lookUpTableId);
    let actionUrl = Constants.apiServer + '/service/lookUpTable/getLookUpTable';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public save = (lookUpTable: LookUpTable, tableName: string): Observable<LookUpTable> => {
    let toAdd = JSON.stringify(lookUpTable);
    let actionUrl = Constants.apiServer + '/service/lookUpTable/' + tableName + '/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public search = (tableName: string, searchText: string): Observable<LookUpTable> => {
    let toAdd = JSON.stringify(searchText);
    let actionUrl = Constants.apiServer + '/service/lookUpTable/' + tableName + '/findByName';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (lookUpTable: LookUpTable, tableName: string): Observable<Boolean> => {
    let toAdd = JSON.stringify(lookUpTable);
    let actionUrl = Constants.apiServer + '/service/lookUpTable/' + tableName + '/delete';
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

    public searchCompany = (searchText: SearchText): Observable<Company[]> => {
        let toAdd = JSON.stringify(searchText);
        let actionUrl = Constants.apiServer + '/service/base/getCompany';
        return this.http.post(actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => {
                return <Company[]>response.json();
            })
            .catch(this.handleError);
    }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
