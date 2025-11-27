import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from 'rxjs/operators';
import { Observable } from "rxjs/Rx";
import { News } from "../models/news";
import { Constants } from "../app.constants";

@Injectable()
export class NewsService {
  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    this.headers.append("Accept", "application/json");
  }
  public getAll = (): Observable<News[]> => {
    this.actionUrl = Constants.apiServer + "/service/news/getAll";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <News[]>response.json())
      .catch(this.handleError);
  };

  public getNews = (newsId: string): Observable<News> => {
    let toAdd = JSON.stringify(newsId);
    let actionUrl = Constants.apiServer + "/service/news/getNews";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  };

  public getNews0 = (): Observable<News> => {
    this.actionUrl = Constants.apiServer + "/service/news/getNews0";
    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <News>response.json())
      .catch(this.handleError);
  };

  public getFirst3 = (): Observable<News[]> => {
    this.actionUrl = Constants.apiServer + "/service/news/getFirst3";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <News[]>response.json())
      .catch(this.handleError);
  };

  public getLatestNews = (): Observable<News[]> => {
    this.actionUrl = Constants.apiServer + "/service/news/getLatestNews";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <News[]>response.json())
      .catch(this.handleError);
  };
  public get3Plus = (): Observable<News[][]> => {
    this.actionUrl = Constants.apiServer + "/service/news/get3Plus";

    return this.http
      .get(this.actionUrl)
      .map((response: Response) => <News[][]>response.json())
      .catch(this.handleError);
  };
  
  public save = (news: News): Observable<News> => {
    let toAdd = JSON.stringify(news);
    let actionUrl = Constants.apiServer + '/service/news/save';
    
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (news: News): Observable<Boolean> => {
    let toAdd = JSON.stringify(news);
    let actionUrl = Constants.apiServer + "/service/news/delete";
    return this.http
      .post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        if (response && response.json() == "Success") {
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  };

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }



}
