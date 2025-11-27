import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Evaluation } from '../../models/grh/evaluation';
import { Constants } from '../../app.constants';

@Injectable()
export class EvaluationService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<Evaluation[]> => {
    this.actionUrl = Constants.apiServer + '/service/evaluation/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Evaluation[]>response.json())
      .catch(this.handleError);
  }

  public save = (evaluation : Evaluation): Observable<Evaluation> => {
      let toAdd = JSON.stringify(evaluation);
      let actionUrl = Constants.apiServer + '/service/evaluation/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

   public delete = (evaluation : Evaluation): Observable<Boolean> => {
      let toAdd = JSON.stringify(evaluation);
      let actionUrl = Constants.apiServer + '/service/evaluation/delete';
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

   public printRecapitulatifGlobalVirementSalaireParBanque = (evaluation: Evaluation): Observable<string> => {
     const toAdd = JSON.stringify(evaluation);
     const actionUrl = Constants.apiServer + '/service/evaluation/printEtatRecapitulatifPaiementSurveillants';
     return this.http.post(actionUrl, toAdd, { headers: this.headers })
       .map((response: Response) => {
         return <string>response.json();
       })
       .catch(this.handleError);
   }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
