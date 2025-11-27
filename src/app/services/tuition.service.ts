import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { Tuition } from '../models/tuition';
import { Constants } from '../app.constants';

@Injectable()
export class TuitionService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<Tuition[]> => {    
    this.actionUrl = Constants.apiServer + '/service/tuition/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Tuition[]> response.json())
      .catch(this.handleError);
  }

  public save = (tuition : Tuition): Observable<Tuition> => {
      let toAdd = JSON.stringify(tuition);
      let actionUrl = Constants.apiServer + '/service/tuition/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
   
   public delete = (tuition : Tuition): Observable<Boolean> => {
      let toAdd = JSON.stringify(tuition);
      let actionUrl = Constants.apiServer + '/service/tuition/delete';      
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
