import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from '../models/subject';
import { Prerequisit } from '../models/prerequisit';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import {CourseViewInvoice} from "../models/CourseViewInvoice";
import {SubjectInvoiceView} from "../models/SubjectInvoiceView";
import {UserSubject} from "../models/userSubject";
import {User} from "../models/User";
import { SearchText } from 'app/models/searchText';
import { UserSubjectView } from 'app/models/userSubjectView';

@Injectable()
export class SubjectService {

  private actionUrl: string;
  private headers: Headers;
  public subjects: Subject[];

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

    this.subjects = [];
    this.getAll()
      .subscribe((data: Subject[]) => this.subjects = data,
      error => console.log(error),
      () => console.log('Get all Sujects complete'));

  }
  public getAll = (): Observable<Subject[]> => {
    this.actionUrl = Constants.apiServer + '/service/subject/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Subject[]>response.json())
      .catch(this.handleError);
  }

  public save = (subject: Subject): Observable<Subject> => {
    let toAdd = JSON.stringify(subject);
    let actionUrl = Constants.apiServer + '/service/subject/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
  public savePrerequisit = (prerequisit: Prerequisit): Observable<Prerequisit> => {
    let actionUrl = Constants.apiServer + '/service/subject/' + prerequisit.subject.id + '/savePrerequisit';
    prerequisit.subject = null;
    let toAdd = JSON.stringify(prerequisit);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public savePrerequisitWaiver = (prerequisit: Prerequisit): Observable<Prerequisit> => {
    let actionUrl = Constants.apiServer + '/service/subject/' + prerequisit.subject.id + '/savePrerequisit';
    prerequisit.subject = null;
    let toAdd = JSON.stringify(prerequisit);
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getSubject = (subjectId: string): Observable<Subject> => {
    let toAdd = JSON.stringify(subjectId);
    let actionUrl = Constants.apiServer + '/service/subject/getSubject';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (subject: Subject): Observable<Boolean> => {
    let toAdd = JSON.stringify(subject);
    let actionUrl = Constants.apiServer + '/service/subject/delete';
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

  public deletePrerequisit = (prerequisit: Prerequisit): Observable<Boolean> => {
    let toAdd = JSON.stringify(prerequisit);
    let actionUrl = Constants.apiServer + '/service/subject/deletePrerequisit';
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

  
   public getCourses = (subjectId: string): Observable<CourseView[]> => {
    let toAdd = JSON.stringify(subjectId);
    let actionUrl = Constants.apiServer + '/service/subject/getSubjectCourses';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


   public getUserSubjects = (user: User): Observable<SubjectInvoiceView[]> => {
    let toAdd = JSON.stringify(user);
    let actionUrl = Constants.apiServer + '/service/subject/getUserSubjects';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  

/*	
   public getAllUsersSubjects = (): Observable<SubjectInvoiceView[]> => {
    let actionUrl = Constants.apiServer + '/service/subject/getAllUsersSubjects';
    return this.http.post(actionUrl, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  */


   public getAllUsersSubjects = (): Observable<string> => {
    let actionUrl = Constants.apiServer + '/service/subject/getAllUsersSubjects';
    return this.http.post(actionUrl, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

    public deleteUserSubject = (userSubjectId: number): Observable<Boolean> => {
        let toAdd = JSON.stringify(userSubjectId);
        let actionUrl = Constants.apiServer + '/service/subject/deleteUserSubject';
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
  
  public getPrerequisits = (subjectId: number): Observable<Prerequisit[]> => {
    let toAdd = JSON.stringify(subjectId);
    let actionUrl = Constants.apiServer + '/service/subject/getSubjectPrerequisits';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

    public searchSubjectInvoice = (searchText: string): Observable<SubjectInvoiceView[]> => {
        const toAdd= JSON.stringify(searchText);
        const actionUrl = Constants.apiServer + '/service/subject/searchSubjectView';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <SubjectInvoiceView[]>response.json();
            })
            .catch(this.handleError);
    }
  

     public searchUserSubject = (searchText: SearchText, id: number): Observable<UserSubjectView[]> => {
        const toAdd= JSON.stringify(searchText);
        const actionUrl = Constants.apiServer + '/service/subject/searchUserSubject/'+ id;
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <UserSubjectView[]>response.json();
            })
            .catch(this.handleError);
    }
  
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}


