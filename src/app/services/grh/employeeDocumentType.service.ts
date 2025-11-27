import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { EmployeeDocumentType } from '../../models/grh/employeeDocumentType';
import { Constants } from '../../app.constants';

@Injectable()
export class EmployeeDocumentTypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<EmployeeDocumentType[]> => {
    this.actionUrl = Constants.apiServer + '/service/employeeDocumentType/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <EmployeeDocumentType[]>response.json())
      .catch(this.handleError);
  }

  public getAllActive = (): Observable<EmployeeDocumentType[]> => {
    this.actionUrl = Constants.apiServer + '/service/employeeDocumentType/getAllActive';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <EmployeeDocumentType[]>response.json())
      .catch(this.handleError);
  } //saveAnotherDocument

  public save = (employeeDocumentType : EmployeeDocumentType): Observable<EmployeeDocumentType> => {
      let toAdd = JSON.stringify(employeeDocumentType);
      let actionUrl = Constants.apiServer + '/service/employeeDocumentType/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public saveAnotherDocument = (employeeDocumentType : EmployeeDocumentType): Observable<EmployeeDocumentType> => {
      let toAdd = JSON.stringify(employeeDocumentType);
      let actionUrl = Constants.apiServer + '/service/employeeDocumentType/saveAnotherDocument';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (employeeDocumentType : EmployeeDocumentType): Observable<Boolean> => {
      let toAdd = JSON.stringify(employeeDocumentType);
      let actionUrl = Constants.apiServer + '/service/employeeDocumentType/delete';
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
