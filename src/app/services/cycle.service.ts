import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Cycle } from '../models/cycle';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { AnyView } from 'app/models/anyView';

@Injectable()
export class CycleService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }
  public getAll = (): Observable<Cycle[]> => {
    this.actionUrl = Constants.apiServer + '/service/cycle/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Cycle[]>response.json())
      .catch(this.handleError);
  }

    public getAllWithCollge = (): Observable<Cycle[]> => {
    this.actionUrl = Constants.apiServer + '/service/cycle/getAllWithCollge';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Cycle[]>response.json())
      .catch(this.handleError);
  }
  
  
  public save = (cycle: Cycle): Observable<Cycle> => {
    let toAdd = JSON.stringify(cycle);
    let actionUrl = Constants.apiServer + '/service/cycle/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public getCycle = (cycleId: string): Observable<Cycle> => {
    let toAdd = JSON.stringify(cycleId);
    let actionUrl = Constants.apiServer + '/service/cycle/getCycle';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getCourses = (cycleId: string): Observable<CourseView[]> => {
    let toAdd = JSON.stringify(cycleId);
    let actionUrl = Constants.apiServer + '/service/cycle/getCycleCourses';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  public delete = (cycle: Cycle): Observable<Boolean> => {
    let toAdd = JSON.stringify(cycle);
    let actionUrl = Constants.apiServer + '/service/cycle/delete';
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

   public getCyclesBySchoolyear = (schoolYearId: number): Observable<AnyView[]> => {
    let toAdd = JSON.stringify(schoolYearId);
    let actionUrl = Constants.apiServer + '/service/cycle/getCyclesBySchoolyear';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public getLevelsBySchoolyearAndCycle = (searchString: AnyView): Observable<AnyView[]> => {
    let toAdd = JSON.stringify(searchString);
    let actionUrl = Constants.apiServer + '/service/cycle/getLevelsBySchoolyearAndCycle';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

   public getLevelsBySchoolyearAndCycleFromScoolday = (searchString: AnyView): Observable<AnyView[]> => {
    let toAdd = JSON.stringify(searchString);
    let actionUrl = Constants.apiServer + '/service/cycle/getLevelsBySchoolyearAndCycleFromScoolday';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
   public getLevelsBySchoolyearAndCycleOnSite = (searchString: AnyView): Observable<AnyView[]> => {
    let toAdd = JSON.stringify(searchString);
    let actionUrl = Constants.apiServer + '/service/cycle/getLevelsBySchoolyearAndCycleOnSite';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public getProspectByStatusAndLevel = (searchString: AnyView): Observable<AnyView[]> => {
    let toAdd = JSON.stringify(searchString);
    let actionUrl = Constants.apiServer + '/service/cycle/getProspectByStatusAndLevel';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}


