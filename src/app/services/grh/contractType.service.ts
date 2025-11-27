import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ContractType } from '../../models/grh/contractType';
import { Constants } from '../../app.constants';

@Injectable()
export class ContractTypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<ContractType[]> => {
    this.actionUrl = Constants.apiServer + '/service/contractType/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ContractType[]>response.json())
      .catch(this.handleError);
  }

  public save = (contractType : ContractType): Observable<ContractType> => {
      let toAdd = JSON.stringify(contractType);
      let actionUrl = Constants.apiServer + '/service/contractType/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (contractType : ContractType): Observable<Boolean> => {
      let toAdd = JSON.stringify(contractType);
      let actionUrl = Constants.apiServer + '/service/contractType/delete';
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
