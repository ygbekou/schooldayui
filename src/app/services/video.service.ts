import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Video } from '../models/video';
import { Constants } from '../app.constants';

@Injectable()
export class VideoService { 

  private actionUrl: string;
  private headers: Headers; 
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Video[]> => {    
    this.actionUrl = Constants.apiServer + '/service/video/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Video[]>response.json())
      .catch(this.handleError);
  }

    public getActiveVideos = (): Observable<Video[]> => {    
    this.actionUrl = Constants.apiServer + '/service/video/getActiveVideos';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Video[]>response.json())
      .catch(this.handleError);
  }
  
    public getFirstVideo = (): Observable<Video> => {    
    this.actionUrl = Constants.apiServer + '/service/video/getFirstVideo';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Video>response.json())
      .catch(this.handleError);
  }
  public save = (video : Video): Observable<Video> => {
      let toAdd = JSON.stringify(video);
      let actionUrl = Constants.apiServer + '/service/video/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
   public delete = (video : Video): Observable<Boolean> => {
      let toAdd = JSON.stringify(video);
      let actionUrl = Constants.apiServer + '/service/video/delete';      
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
