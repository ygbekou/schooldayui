import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Book } from '../models/book';
import { Subject } from '../models/subject';
import { Constants } from '../app.constants';

@Injectable()
export class BookService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getBySubject = (subject : Subject): Observable<Book[]> => {    
    this.actionUrl = Constants.apiServer + '/service/book/getBySubject/' + subject.id;
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Book[]>response.json())
      .catch(this.handleError);
  }
  
  public getAll = (): Observable<Book[]> => {    
    this.actionUrl = Constants.apiServer + '/service/book/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Book[]> response.json())
      .catch(this.handleError);
  }

  public save = (book : Book): Observable<Book> => {
      let toAdd = JSON.stringify(book);
      let actionUrl = Constants.apiServer + '/service/book/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (book : Book): Observable<Boolean> => {
      let toAdd = JSON.stringify(book);
      let actionUrl = Constants.apiServer + '/service/book/delete';      
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
