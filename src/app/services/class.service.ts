import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Class } from '../models/class';
import { Constants } from '../app.constants';

@Injectable()
export class ClassService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<Class[]> => {    
    this.actionUrl = Constants.apiServer + '/service/class/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Class[]> response.json())
      .catch(this.handleError);
  }

  public save = (classe : Class): Observable<Class> => {
      let toAdd = JSON.stringify(classe);
      let actionUrl = Constants.apiServer + '/service/class/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (classe : Class): Observable<Boolean> => {
      let toAdd = JSON.stringify(classe);
      let actionUrl = Constants.apiServer + '/service/class/delete';      
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
