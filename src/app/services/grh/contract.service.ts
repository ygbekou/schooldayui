import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Contract } from '../../models/grh/contract';
import { Employee } from '../../models/grh/employee';
import { Constants } from '../../app.constants';
import { Teacher } from 'app/models/teacher';

@Injectable()
export class ContractService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<Contract[]> => {
    this.actionUrl = Constants.apiServer + '/service/contract/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Contract[]>response.json())
      .catch(this.handleError);
  }

  public getByEmployee = (employee: Employee): Observable<Contract> => {
    const toAdd = JSON.stringify(employee);
    this.actionUrl = Constants.apiServer + '/service/contract/getByEmployee';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <Contract>response.json())
      .catch(this.handleError);
  }

  public getByTeacher = (teacher:Teacher): Observable<Contract> =>{
    const toAdd = JSON.stringify(teacher);
    this.actionUrl = Constants.apiServer + '/service/contract/getByTeacher';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <Contract>response.json())
      .catch(this.handleError);
  }

  public save = (contract : Contract): Observable<Contract> => {
      let toAdd = JSON.stringify(contract);
      let actionUrl = Constants.apiServer + '/service/contract/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (contract : Contract): Observable<Boolean> => {
      let toAdd = JSON.stringify(contract);
      let actionUrl = Constants.apiServer + '/service/contract/delete';
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
