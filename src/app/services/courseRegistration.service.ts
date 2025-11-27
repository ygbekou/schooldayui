import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { CourseRegistration } from '../models/courseRegistration';
import { Constants } from '../app.constants';

@Injectable()
export class CourseRegistrationService { 

  private actionUrl: string;
  private headers: Headers; 
  public courseRegistrations: CourseRegistration[];
  public courseTotalCost: number;
  public courseTotalDuration: number;
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<CourseRegistration[]> => {    
    this.actionUrl = Constants.apiServer + '/service/courseRegistration/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <CourseRegistration[]> response.json())
      .catch(this.handleError);
  }

  public register = (): Observable<string> => {
     
    let toAdd = JSON.stringify(this.courseRegistrations);    
    console.log(toAdd);
    let actionUrl = Constants.apiServer + '/service/courseRegistration/save';    
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
  public save = (courseRegistrations : CourseRegistration []): Observable<CourseRegistration []> => {
      let toAdd = JSON.stringify(courseRegistrations);
      let actionUrl = Constants.apiServer + '/service/courseRegistration/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (courseRegistration : CourseRegistration): Observable<Boolean> => {
      let toAdd = JSON.stringify(courseRegistration);
      let actionUrl = Constants.apiServer + '/service/courseRegistration/delete';      
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
