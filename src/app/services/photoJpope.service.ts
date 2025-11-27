import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Constants } from '../app.constants';
import { PhotoJpope } from 'app/models/photoJpope';

@Injectable()
export class PhotoJpopeService { 

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<PhotoJpope[]> => {
    this.actionUrl = Constants.apiServer + '/service/photoJpope/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PhotoJpope[]>response.json())
      .catch(this.handleError);
  }

    public getActiveImages = (): Observable<PhotoJpope[]> => {
      this.actionUrl = Constants.apiServer + '/service/photoJpope/getActiveImages';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PhotoJpope[]>response.json())
      .catch(this.handleError);
  }

  public getBySchoolYear = (codeSchoolYear: string): Observable<PhotoJpope[]> => {
    this.actionUrl = Constants.apiServer + '/service/photoJpope/getBySchoolYear/' + codeSchoolYear;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <PhotoJpope[]>response.json())
      .catch(this.handleError);
  }
  
  public getPhotoJpope = (photoJpopeId: string): Observable<PhotoJpope> => {
    let toAdd = JSON.stringify(photoJpopeId);
    let actionUrl = Constants.apiServer + '/service/photoJpope/getPhotoJpope';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public save = (photoJpope: PhotoJpope): Observable<PhotoJpope> => {
    console.log(photoJpope);
    let toAdd = JSON.stringify(photoJpope);
    let actionUrl = Constants.apiServer + '/service/photoJpope/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      });
  }

  public delete = (photoJpope: PhotoJpope): Observable<Boolean> => {
    let toAdd = JSON.stringify(photoJpope);
    let actionUrl = Constants.apiServer + '/service/photoJpope/delete';
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
