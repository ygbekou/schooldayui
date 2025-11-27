import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ContractBank } from '../../models/grh/contractBank';
import { Employee } from '../../models/grh/employee';
import { Constants } from '../../app.constants';
import { Teacher } from 'app/models/teacher';

@Injectable()
export class ContractBankService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<ContractBank[]> => {
    this.actionUrl = Constants.apiServer + '/service/contractBank/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ContractBank[]>response.json())
      .catch(this.handleError);
  }

  public getActive = (): Observable<ContractBank> => {
    this.actionUrl = Constants.apiServer + '/service/contractBank/getAllActive';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ContractBank>response.json())
      .catch(this.handleError);
  }

  public getByEmployee = (employee: Employee): Observable<ContractBank> => {
    const toAdd = JSON.stringify(employee);
    this.actionUrl = Constants.apiServer + '/service/contractBank/getByEmployee';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <ContractBank>response.json())
      .catch(this.handleError);
  }

  public getByTeacher = (teacher: Teacher): Observable<ContractBank> => {
    const toAdd = JSON.stringify(teacher);
    this.actionUrl = Constants.apiServer + '/service/contractBank/getByTeacher';

    return this.http.post(this.actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => <ContractBank>response.json())
      .catch(this.handleError);
  }

  public save = (contractBank : ContractBank): Observable<ContractBank> => {
      let toAdd = JSON.stringify(contractBank);
      let actionUrl = Constants.apiServer + '/service/contractBank/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (contractBank : ContractBank): Observable<Boolean> => {
      let toAdd = JSON.stringify(contractBank);
      let actionUrl = Constants.apiServer + '/service/contractBank/delete';
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
