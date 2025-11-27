import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { HourlyCost } from '../../models/grh/hourlyCost';
import { Constants } from '../../app.constants';

@Injectable()
export class HourlyCostService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<HourlyCost[]> => {
    this.actionUrl = Constants.apiServer + '/service/hourlyCost/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <HourlyCost[]>response.json())
      .catch(this.handleError);
  }

  public save = (hourlyCost : HourlyCost): Observable<HourlyCost> => {
      let toAdd = JSON.stringify(hourlyCost);
      let actionUrl = Constants.apiServer + '/service/hourlyCost/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (hourlyCost : HourlyCost): Observable<Boolean> => {
      let toAdd = JSON.stringify(hourlyCost);
      let actionUrl = Constants.apiServer + '/service/hourlyCost/delete';
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
