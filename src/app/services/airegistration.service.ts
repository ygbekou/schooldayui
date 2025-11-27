import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Constants } from "app/app.constants";
import { AiRegister } from "app/models/aiRegister";
import { Observable } from "rxjs";

@Injectable()
export class AiRegisterService {
  private headers: Headers;
  public DAYS_MAP: {[key: number]: string} = {};
  public TIME_PERIOD_MAP: {[key: number]: string} = {};

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public save = (register: AiRegister): Observable<AiRegister> => {
    const toAdd = JSON.stringify(register);
    const actionUrl = Constants.apiServer + '/service/aiRegister/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
        console.log('service '+ register);
      })
      .catch(this.handleError);
  }

  public getAll = (): Observable<AiRegister[]> => {    
    let actionUrl = Constants.apiServer + '/service/aiRegister/getAll';
    
    return this.http.get(actionUrl)
      .map((response: Response) => <AiRegister[]>response.json())
      .catch(this.handleError);
  }
  
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}