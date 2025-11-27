import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ExamConfiguration } from '../models/examConfiguration';
import { Constants } from '../app.constants';

@Injectable()
export class ExamConfigService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
     
  }
  public getAll = (): Observable<ExamConfiguration[]> => {    
    this.actionUrl = Constants.apiServer + '/service/examConfiguration/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <ExamConfiguration[]>response.json())
      .catch(this.handleError);
  }

  public save = (examConfiguration : ExamConfiguration): Observable<ExamConfiguration> => {
      let toAdd = JSON.stringify(examConfiguration);
      let actionUrl = Constants.apiServer + '/service/examConfiguration/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
   public getExamConfiguration = (examConfigurationId: string): Observable<ExamConfiguration> => {
    let toAdd = JSON.stringify(examConfigurationId);
    let actionUrl = Constants.apiServer + '/service/examConfiguration/getExamConfiguration';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  } 
  
   public delete = (examConfiguration : ExamConfiguration): Observable<Boolean> => {
      let toAdd = JSON.stringify(examConfiguration);
      let actionUrl = Constants.apiServer + '/service/examConfiguration/delete';      
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


