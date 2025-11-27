import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Level } from '../models/level';
import { Constants } from '../app.constants';
import { Course } from '../models/course';
import { CourseView } from '../models/courseView';

@Injectable()
export class LevelService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Level[]> => {    
    this.actionUrl = Constants.apiServer + '/service/level/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Level[]>response.json())
      .catch(this.handleError);
  }

  public getAllActiveLevel = (): Observable<Level[]> => {    
    this.actionUrl = Constants.apiServer + '/service/level/getAllActiveLevel';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Level[]>response.json())
      .catch(this.handleError);
  }
    public getByLevel = (levelId : string): Observable<Course[]> => {    
    this.actionUrl = Constants.apiServer + '/service/course/getByLevel/' + levelId;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Course[]>response.json())
      .catch(this.handleError);
  }
  public getLevel = (levelId: string): Observable<Level> => {
    let toAdd = JSON.stringify(levelId);
    let actionUrl = Constants.apiServer + '/service/level/getLevel';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getCourses = (levelId: string): Observable<CourseView[]> => {
    let toAdd = JSON.stringify(levelId);
    let actionUrl = Constants.apiServer + '/service/level/getLevelCourses';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getCoursesPro = (levelId: string): Observable<CourseView[]> => {
    let toAdd = JSON.stringify(levelId);
    let actionUrl = Constants.apiServer + '/service/level/getLevelCoursesPro';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public save = (level : Level): Observable<Level> => {
      let toAdd = JSON.stringify(level);
      let actionUrl = Constants.apiServer + '/service/level/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (level : Level): Observable<Boolean> => {
      let toAdd = JSON.stringify(level);
      let actionUrl = Constants.apiServer + '/service/level/delete';      
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
