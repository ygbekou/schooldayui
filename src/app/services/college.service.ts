import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {College} from '../models/college';
import {CourseView} from '../models/courseView';
import {Constants} from '../app.constants';

@Injectable()
export class CollegeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<College[]> => {
    this.actionUrl = Constants.apiServer + '/service/college/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <College[]>response.json())
      .catch(this.handleError);
  }

  public getAllWithLevel = (): Observable<College[]> => {
    this.actionUrl = Constants.apiServer + '/service/college/getAllWithLevel';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <College[]>response.json())
      .catch(this.handleError);
  }
  public save = (college: College): Observable<College> => {
    let toAdd = JSON.stringify(college);
    let actionUrl = Constants.apiServer + '/service/college/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public getCollege = (collegeId: string): Observable<College> => {
    let toAdd = JSON.stringify(collegeId);
    let actionUrl = Constants.apiServer + '/service/college/getCollege';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getCourses = (collegeId: string): Observable<CourseView[]> => {
    let toAdd = JSON.stringify(collegeId);
    let actionUrl = Constants.apiServer + '/service/college/getCollegeCourses';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
    public checkStudentCollege = (userId: number,collegeId: Number): Observable<number> => {
        //let toAdd = JSON.stringify(collegeId);
        let actionUrl = Constants.apiServer + '/service/college/checkStudentCollege/' + userId + "/" + collegeId;
        return this.http.post(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }
    
  public delete = (college: College): Observable<Boolean> => {
    let toAdd = JSON.stringify(college);
    let actionUrl = Constants.apiServer + '/service/college/delete';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
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


   public getAllColleges = (): Observable<College[]> => {
    this.actionUrl = Constants.apiServer + '/service/college/getAllColleges';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <College[]>response.json())
      .catch(this.handleError);
  }

}


