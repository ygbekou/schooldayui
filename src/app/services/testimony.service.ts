import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Testimony } from '../models/testimony';
import { User } from '../models/User';
import { Constants } from '../app.constants';

@Injectable()
export class TestimonyService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getByUser = (user : User): Observable<Testimony[]> => {    
    this.actionUrl = Constants.apiServer + '/service/testimony/getByUser/' + user.id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Testimony[]>response.json())
      .catch(this.handleError);
  }
  
    public getByTeacher = (user : User): Observable<Testimony[]> => {    
    this.actionUrl = Constants.apiServer + '/service/testimony/getByTeacher/' + user.id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Testimony[]>response.json())
      .catch(this.handleError);
  }
  public getAll = (): Observable<Testimony[]> => {    
    this.actionUrl = Constants.apiServer + '/service/testimony/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Testimony[]>response.json())
      .catch(this.handleError);
  }

  public getActiveTestimonies = (): Observable<Testimony[]> => {    
    this.actionUrl = Constants.apiServer + '/service/testimony/getActiveTestimonies';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Testimony[]>response.json())
      .catch(this.handleError);
  }
  
  public getFirstTestimony = (): Observable<Testimony> => {    
    this.actionUrl = Constants.apiServer + '/service/testimony/getFirstTestimony';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Testimony>response.json())
      .catch(this.handleError);
  }
  public save = (testimony : Testimony): Observable<Testimony> => {
      let toAdd = JSON.stringify(testimony);
      let actionUrl = Constants.apiServer + '/service/testimony/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (testimony : Testimony): Observable<Boolean> => {
      let toAdd = JSON.stringify(testimony);
      let actionUrl = Constants.apiServer + '/service/testimony/delete';      
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
