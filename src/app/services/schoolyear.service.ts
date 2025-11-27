import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable} from 'rxjs/Rx';
import { SchoolYear } from '../models/schoolYear';
import { Constants } from '../app.constants';

@Injectable()
export class SchoolYearService {

  private actionUrl: string;
  private headers: Headers;
  public shoolYears : SchoolYear[]; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    
    this.shoolYears = [];
    this.getAll()
      .subscribe((data: SchoolYear[]) => this.shoolYears = data,
      error => console.log(error),
      () => console.log('Get all shoolYears complete'));
  }
  
  public getAll = (): Observable<SchoolYear[]> => {    
    this.actionUrl = Constants.apiServer + '/service/schoolyear/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <SchoolYear[]>response.json())
      .catch(this.handleError);
  }

  public save = (schoolYear : SchoolYear): Observable<SchoolYear> => {
      let toAdd = JSON.stringify(schoolYear);
      let actionUrl = Constants.apiServer + '/service/schoolyear/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (schoolYear : SchoolYear): Observable<Boolean> => {
      let toAdd = JSON.stringify(schoolYear);
      let actionUrl = Constants.apiServer + '/service/schoolyear/delete';      
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


