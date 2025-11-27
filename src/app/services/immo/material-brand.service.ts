import { Injectable } from '@angular/core';
import { Constants } from 'app/app.constants';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { MaterialBrand } from 'app/models/immo/MaterialBrand';

@Injectable({
  providedIn: 'root'
})
export class MaterialBrandService {
  private actionUrl: string;
  private headers: Headers;
  private baseUrlRest = Constants.apiServer + "/service/immobilisation/materialBrand"

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');

  }

  public getAll = (): Observable<MaterialBrand[]> => {
    this.actionUrl = this.baseUrlRest + '/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <MaterialBrand[]>response.json())
      .catch(this.handleError);
}

  public save = (item: MaterialBrand): Observable<MaterialBrand> => {
    let toAdd = JSON.stringify(item);
    let actionUrl = this.baseUrlRest + '/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
  }

  public delete = (file: MaterialBrand): Observable<Boolean> => {
    let toAdd = JSON.stringify(file);
    let actionUrl = this.baseUrlRest + '/delete';
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