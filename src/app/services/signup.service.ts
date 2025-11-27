import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Constants } from '../app.constants';
import { SignUp } from '../models/signup';

@Injectable()
export class SignupService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<SignUp[]> => {    
    this.actionUrl = Constants.apiServer + '/service/signup/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <SignUp[]>response.json())
      .catch(this.handleError);
  }
 
  public save = (signup : SignUp): Observable<SignUp> => {
      let toAdd = JSON.stringify(signup);
      let actionUrl = Constants.apiServer + '/service/signup/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
