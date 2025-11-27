import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Configuration } from '../models/configuration';
import { Constants } from '../app.constants';

@Injectable()
export class ConfigurationService {

  private actionUrl: string;
  private headers: Headers;
  public configurations : Configuration[]; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    
    this.configurations = [];
    this.getAll()
      .subscribe((data: Configuration[]) => this.configurations = data,
      error => console.log(error),
      () => console.log('Get all Configurations complete'));
    
  }
  public getAll = (): Observable<Configuration[]> => {    
    this.actionUrl = Constants.apiServer + '/service/configuration/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Configuration[]>response.json())
      .catch(this.handleError);
  }

  public save = (configuration : Configuration): Observable<Configuration> => {
      let toAdd = JSON.stringify(configuration);
      let actionUrl = Constants.apiServer + '/service/configuration/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (configuration : Configuration): Observable<Boolean> => {
      let toAdd = JSON.stringify(configuration);
      let actionUrl = Constants.apiServer + '/service/configuration/delete';      
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


