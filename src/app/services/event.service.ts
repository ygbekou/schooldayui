import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Event } from '../models/event';
import { Constants } from '../app.constants';

@Injectable()
export class EventService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Event[]> => {    
    this.actionUrl = Constants.apiServer + '/service/event/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Event[]>response.json())
      .catch(this.handleError);
  }

  public getActiveEvents = (): Observable<Event[]> => {    
    this.actionUrl = Constants.apiServer + '/service/event/getActiveEvents';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Event[]>response.json())
      .catch(this.handleError);
  }
  public save = (event : Event): Observable<Event> => {
      let toAdd = JSON.stringify(event);
      let actionUrl = Constants.apiServer + '/service/event/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (event : Event): Observable<Boolean> => {
      let toAdd = JSON.stringify(event);
      let actionUrl = Constants.apiServer + '/service/event/delete';      
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
  
    public getLatestEvents = (): Observable<Event[]> => {    
    this.actionUrl = Constants.apiServer + '/service/event/getLatestEvents';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Event[]>response.json())
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
