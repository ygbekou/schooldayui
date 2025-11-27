import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from '../models/subject';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { Author } from '../models/author';

@Injectable()
export class AuthorService {

  private actionUrl: string;
  private headers: Headers;
  public authors: Author[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.authors = [];
    this.getAll()
      .subscribe((data: Author[]) => this.authors = data,
      error => console.log(error),
      () => console.log('Get all Authors complete'));

  }
  public getAll = (): Observable<Author[]> => {
    this.actionUrl = Constants.apiServer + '/service/author/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Author[]>response.json())
      .catch(this.handleError);
  }

  public save = (author: Author): Observable<Author> => {
    let toAdd = JSON.stringify(author);
    let actionUrl = Constants.apiServer + '/service/author/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getAuthor = (authorId: string): Observable<Author> => {
    let toAdd = JSON.stringify(authorId);
    let actionUrl = Constants.apiServer + '/service/author/getAuthor';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (author: Author): Observable<Boolean> => {
    let toAdd = JSON.stringify(author);
    let actionUrl = Constants.apiServer + '/service/author/delete';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() == 'Success') {
          return true;
        } else {
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


