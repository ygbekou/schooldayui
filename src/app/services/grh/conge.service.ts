import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Bank } from '../../models/grh/bank';
import { Constants } from '../../app.constants';
import { GetConge } from 'app/models/grh/getConge';
import { Employee } from 'app/models/grh/employee';
import { CongeHistory } from 'app/models/grh/congeHistory';

@Injectable()
export class CongeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAllEmployeeConge = (employeeId: number): Observable<GetConge[]> => {
    this.actionUrl = Constants.apiServer + '/service/conge/getAllGetConge/'+employeeId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <GetConge[]>response.json())
      .catch(this.handleError);
  }

  public saveGetConge = (conge : GetConge): Observable<GetConge> => {
      let toAdd = JSON.stringify(conge);
      let actionUrl = Constants.apiServer + '/service/conge/saveGetConge';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

    public accepte = (conge: GetConge): Observable<GetConge> => {
      let toAdd = JSON.stringify(conge);
      let actionUrl = Constants.apiServer + '/service/conge/accepte';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

    public refuse = (conge: GetConge): Observable<GetConge> => {
      let toAdd = JSON.stringify(conge);
      let actionUrl = Constants.apiServer + '/service/conge/refuse';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

    public close = (conge: GetConge): Observable<GetConge> => {
      let toAdd = JSON.stringify(conge);
      let actionUrl = Constants.apiServer + '/service/conge/close';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public deleteGetConge = (conge: GetConge): Observable<Boolean> => {
      let toAdd = JSON.stringify(conge);
      let actionUrl = Constants.apiServer + '/service/conge/deleteGetConge';
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

   public getCongeById = (id: number): Observable<GetConge> => {
    this.actionUrl = Constants.apiServer + '/service/conge/getCongeById/'+id;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <GetConge>response.json())
      .catch(this.handleError);
  }

   public getEmployeeCongeHistory = (id: number): Observable<CongeHistory[]> => {
     console.log('service');
    this.actionUrl = Constants.apiServer + '/service/conge/getEmployeeCongeHistory/'+id;
    return this.http.get(this.actionUrl)
      .map((response: Response) => <CongeHistory[]>response.json())
      .catch(this.handleError);
  }


    public printAllEmployeeCongeStatus = (): Observable<string> => {
    this.actionUrl = Constants.apiServer + '/service/conge/printAllEmployeeCongeStatus/';
    return this.http.get(this.actionUrl)
      .map((response: Response) => <string>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
