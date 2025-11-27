import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Faqs } from '../models/faqs';
import { Constants } from '../app.constants';

@Injectable()
export class FaqService { 

  private actionUrl: string;
  private headers: Headers;
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  public getAll = (): Observable<Faqs[]> => {
    this.actionUrl = Constants.apiServer + '/service/faq/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Faqs[]>response.json())
      .catch(this.handleError);
  }

  public getFaq = (faqId: string): Observable<Faqs> => {
    let toAdd = JSON.stringify(faqId);
    let actionUrl = Constants.apiServer + '/service/faq/getFaq';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }
  
    public getActiveFaqs = (): Observable<Faqs[]> => {
    this.actionUrl = Constants.apiServer + '/service/faq/getActiveFaqs';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Faqs[]>response.json())
      .catch(this.handleError);
  }
   public save = (faq: Faqs): Observable<Faqs> => {
    let toAdd = JSON.stringify(faq);
    let actionUrl = Constants.apiServer + '/service/faq/save';
    return this.http.post(actionUrl, toAdd, { headers: this.headers })
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public delete = (faq: Faqs): Observable<Boolean> => {
    let toAdd = JSON.stringify(faq);
    let actionUrl = Constants.apiServer + '/service/faq/delete';
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
