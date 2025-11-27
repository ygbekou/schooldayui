import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Parent } from '../models/parent';
import { User } from '../models/User';
import { Constants } from '../app.constants';

@Injectable()
export class ParentService { 

  private actionUrl: string;
  private headers: Headers; 
  
  public selectedParentUserId: number;
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getByUser = (user : User): Observable<Parent> => {    
    this.actionUrl = Constants.apiServer + '/service/parent/getByUser/' + user.id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Parent>response.json())
      .catch(this.handleError);
  }
  
  public getAll = (): Observable<Parent[]> => {    
    this.actionUrl = Constants.apiServer + '/service/parent/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Parent[]>response.json())
      .catch(this.handleError);
  }

  public save = (parent : Parent): Observable<Parent> => {
      let toAdd = JSON.stringify(parent);
      let actionUrl = Constants.apiServer + '/service/parent/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (parent : Parent): Observable<Boolean> => {
      let toAdd = JSON.stringify(parent);
      let actionUrl = Constants.apiServer + '/service/parent/delete';      
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
