import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Product } from '../models/product';
import { Constants } from '../app.constants';

@Injectable()
export class ProductService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public getAll = (): Observable<Product[]> => {    
    this.actionUrl = Constants.apiServer + '/service/product/getAll';
    
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Product[]> response.json())
      .catch(this.handleError);
  }

  public save = (product : Product): Observable<Product> => {
      const toAdd = JSON.stringify(product);
      const actionUrl = Constants.apiServer + '/service/product/save';
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
   }

  public searchProducts = (searchText: string): Observable<Product[]> => {
    this.actionUrl = Constants.apiServer + '/service/product/search/' + searchText;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <Product[]>response.json())
      .catch(this.handleError);
  }
  
   public delete = (product : Product): Observable<Boolean> => {
      let toAdd = JSON.stringify(product);
      let actionUrl = Constants.apiServer + '/service/product/delete';      
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
