import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { LevelSubject } from '../models/levelSubject';
import { Constants } from '../app.constants';

@Injectable()
export class LevelSubjectService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<LevelSubject[]> => {    
    this.actionUrl = Constants.apiServer + '/service/levelSubject/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <LevelSubject[]>response.json())
      .catch(this.handleError);
  }
  
  public getSubjectLevel = (levelSubjectId: string): Observable<LevelSubject> => {
    const toAdd = JSON.stringify(levelSubjectId);
    const actionUrl = Constants.apiServer + '/service/levelSubject/getLevelSubject';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public search = (searchText: string): Observable<LevelSubject[]> => {
    const toAdd= JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + '/service/levelSubject/search';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <LevelSubject[]>response.json();
      })
      .catch(this.handleError);
  }

  public save = (levelSubject: LevelSubject): Observable<LevelSubject> => {
      const toAdd = JSON.stringify(levelSubject);
      const actionUrl = Constants.apiServer + '/service/levelSubject/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (levelSubject: LevelSubject): Observable<Boolean> => {
      const toAdd = JSON.stringify(levelSubject);
      const actionUrl = Constants.apiServer + '/service/levelSubject/delete';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            if (response && response.json()==='Success') {                 
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
