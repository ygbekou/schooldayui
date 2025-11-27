import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { LevelSubject } from '../models/levelSubject';
import { Constants } from '../app.constants';
import { LevelSubjectPro } from 'app/models/levelSubjectPro';

@Injectable()
export class LevelSubjectProService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<LevelSubjectPro[]> => {    
    this.actionUrl = Constants.apiServer + '/service/levelSubjectPro/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <LevelSubjectPro[]>response.json())
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
  public search = (searchText: string): Observable<LevelSubjectPro[]> => {
    const toAdd= JSON.stringify(searchText);
    const actionUrl = Constants.apiServer + '/service/levelSubjectPro/search';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return <LevelSubjectPro[]>response.json();
      })
      .catch(this.handleError);
  }

  public save = (levelSubject: LevelSubjectPro): Observable<LevelSubjectPro> => {
      const toAdd = JSON.stringify(levelSubject);
      const actionUrl = Constants.apiServer + '/service/levelSubjectPro/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (levelSubject: LevelSubjectPro): Observable<Boolean> => {
      const toAdd = JSON.stringify(levelSubject);
      const actionUrl = Constants.apiServer + '/service/levelSubjectPro/delete';      
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
