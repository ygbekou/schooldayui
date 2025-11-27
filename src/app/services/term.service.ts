import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { Term } from '../models/term';
import { Constants } from '../app.constants';

@Injectable()
export class TermService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<Term[]> => {    
    this.actionUrl = Constants.apiServer + '/service/term/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Term[]> response.json())
      .catch(this.handleError);
  }

  public save = (term : Term): Observable<Term> => {
      let toAdd = JSON.stringify(term);
      let actionUrl = Constants.apiServer + '/service/term/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
   
   public delete = (term : Term): Observable<Boolean> => {
      let toAdd = JSON.stringify(term);
      let actionUrl = Constants.apiServer + '/service/term/delete';      
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
