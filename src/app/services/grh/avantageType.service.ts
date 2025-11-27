import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { AvantageType } from '../../models/grh/avantageType';
import { Constants } from '../../app.constants';

@Injectable()
export class AvantageTypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<AvantageType[]> => {
    this.actionUrl = Constants.apiServer + '/service/avantageType/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <AvantageType[]>response.json())
      .catch(this.handleError);
  }

  public save = (avantageType : AvantageType): Observable<AvantageType> => {
      let toAdd = JSON.stringify(avantageType);
      let actionUrl = Constants.apiServer + '/service/avantageType/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (avantageType : AvantageType): Observable<Boolean> => {
      let toAdd = JSON.stringify(avantageType);
      let actionUrl = Constants.apiServer + '/service/avantageType/delete';
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
