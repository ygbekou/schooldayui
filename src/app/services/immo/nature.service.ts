import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Constants } from 'app/app.constants';
import { Nature } from 'app/models/immo/Nature';

@Injectable({
  providedIn: 'root'
})
export class NatureService {
  private actionUrl: string;
  private headers: Headers;
  private baseUrlRest = Constants.apiServer + "/service/immobilisation/nature"

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public getAll = (): Observable<Nature[]> => {
    this.actionUrl = this.baseUrlRest + '/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Nature[]>response.json())
      .catch(this.handleError);
}

  public save = (item: Nature): Observable<Nature> => {
    let toAdd = JSON.stringify(item);
    let actionUrl = this.baseUrlRest + '/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
  }

  public delete = (file: Nature): Observable<Boolean> => {
    let toAdd = JSON.stringify(file);
    let actionUrl = this.baseUrlRest + '/delete';
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