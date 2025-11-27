import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Assignment } from '../models/assignment';
import { AssignmentResponse } from '../models/assignmentResponse';
import { Constants } from '../app.constants';

@Injectable()
export class AssignmentService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
   public getById = (id : number): Observable<Assignment> => {    
    this.actionUrl = Constants.apiServer + '/service/assignment/' + id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Assignment>response.json())
      .catch(this.handleError);
  }
  
  public getByCourse = (courseId : number): Observable<Assignment[]> => {    
    this.actionUrl = Constants.apiServer + '/service/assignment/list/course/' + courseId;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Assignment[]>response.json())
      .catch(this.handleError);
  }
  
  public save = (assignment : Assignment): Observable<Assignment> => {
      let toAdd = JSON.stringify(assignment);
      let actionUrl = Constants.apiServer + '/service/assignment/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (assignment : Assignment): Observable<Boolean> => {
      let toAdd = JSON.stringify(assignment);
      let actionUrl = Constants.apiServer + '/service/assignment/delete';      
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
  
  
  
  
  
  
  public saveResponse = (assignmentResponse: AssignmentResponse): Observable<AssignmentResponse> => {
      let toAdd = JSON.stringify(assignmentResponse);
      let actionUrl = Constants.apiServer + '/service/assignment/response/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public deleteResponse = (assignmentResponse: AssignmentResponse): Observable<Boolean> => {
      let toAdd = JSON.stringify(assignmentResponse);
      let actionUrl = Constants.apiServer + '/service/assignment/response/delete';      
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
  
  public getAssignmentResponse = (id : number): Observable<AssignmentResponse> => {    
    this.actionUrl = Constants.apiServer + '/service/assignment/response/' + id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <AssignmentResponse>response.json())
      .catch(this.handleError);
  }
  
  public getResponsesByAssignment = (assignmentId : number): Observable<AssignmentResponse[]> => {    
    this.actionUrl = Constants.apiServer + '/service/assignment/response/list/' + assignmentId;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <AssignmentResponse[]>response.json())
      .catch(this.handleError);
  }
  
  public getResponseById = (id : number): Observable<AssignmentResponse> => {    
    this.actionUrl = Constants.apiServer + '/service/assignment/response/get/' + id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <AssignmentResponse>response.json())
      .catch(this.handleError);
  }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
