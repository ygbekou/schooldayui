/*import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Constants } from '../../app.constants';
import { ImmobilizationFile } from 'app/models/immo/ImmobilizationFile';

@Injectable()
export class FileService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public getAll = (): Observable<ImmobilizationFile[]> => {
    this.actionUrl = Constants.apiServer + '/service/immoFile/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ImmobilizationFile[]>response.json())
      .catch(this.handleError);
}
  
public getNotAssignatedFiles = (): Observable<ImmobilizationFile[]> => {
  this.actionUrl = Constants.apiServer + '/service/immoFile/getNotAssignatedFiles';

  return this.http.get(this.actionUrl)
    .map((response: Response) => <ImmobilizationFile[]>response.json())
    .catch(this.handleError);
}

  public save = (file: ImmobilizationFile): Observable<ImmobilizationFile> => {
    let toAdd = JSON.stringify(file);
    let actionUrl = Constants.apiServer + '/service/immoFile/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
  }
  
  public print = (date: Date): Observable<String> => {
    let toAdd = JSON.stringify(date);
    let actionUrl = Constants.apiServer + '/service/immoFile/printFiles';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (file: ImmobilizationFile): Observable<Boolean> => {
    let toAdd = JSON.stringify(file);
    let actionUrl = Constants.apiServer + '/service/immoFile/delete';
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
*/