import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Position } from '../models/position';
import { Constants } from '../app.constants';

@Injectable()
export class PositionService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
     
  }
  public getAll = (): Observable<Position[]> => {    
    this.actionUrl = Constants.apiServer + '/service/position/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Position[]>response.json())
      .catch(this.handleError);
  }

  public save = (position : Position): Observable<Position> => {
      let toAdd = JSON.stringify(position);
      let actionUrl = Constants.apiServer + '/service/position/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
   public getPosition = (positionId: string): Observable<Position> => {
    let toAdd = JSON.stringify(positionId);
    let actionUrl = Constants.apiServer + '/service/position/getPosition';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  } 
  
   public delete = (position : Position): Observable<Boolean> => {
      let toAdd = JSON.stringify(position);
      let actionUrl = Constants.apiServer + '/service/position/delete';      
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


