import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Surveillance } from '../../models/grh/surveillance';
import { Constants } from '../../app.constants';
import { Evaluation } from 'app/models/grh/evaluation';

@Injectable()
export class SurveillanceService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<Surveillance[]> => {
    this.actionUrl = Constants.apiServer + '/service/surveillance/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Surveillance[]>response.json())
      .catch(this.handleError);
  }

  public getListByEvaluation = (evaluation : Evaluation): Observable<Surveillance[]> => {
      let toAdd = JSON.stringify(evaluation);
      let actionUrl = Constants.apiServer + '/service/surveillance/getListByEvaluation';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

  public save = (surveillance : Surveillance): Observable<Surveillance> => {
      let toAdd = JSON.stringify(surveillance);
      let actionUrl = Constants.apiServer + '/service/surveillance/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (surveillance : Surveillance): Observable<Boolean> => {
      let toAdd = JSON.stringify(surveillance);
      let actionUrl = Constants.apiServer + '/service/surveillance/delete';
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
