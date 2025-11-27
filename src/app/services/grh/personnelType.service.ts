import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { PersonnelType } from '../../models/grh/personnelType';
import { Constants } from '../../app.constants';

@Injectable()
export class PersonnelTypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<PersonnelType[]> => {
    this.actionUrl = Constants.apiServer + '/service/personnelType/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PersonnelType[]>response.json())
      .catch(this.handleError);
  }

  public save = (personnelType : PersonnelType): Observable<PersonnelType> => {
      let toAdd = JSON.stringify(personnelType);
      let actionUrl = Constants.apiServer + '/service/personnelType/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (personnelType : PersonnelType): Observable<Boolean> => {
      let toAdd = JSON.stringify(personnelType);
      let actionUrl = Constants.apiServer + '/service/personnelType/delete';
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
