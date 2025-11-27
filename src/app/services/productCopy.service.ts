import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { ProductCopy } from '../models/productCopy';
import { Constants } from '../app.constants';

@Injectable()
export class ProductCopyService { 

  private actionUrl: string;
  private headers: Headers; 
  
  constructor(private http: Http) { 
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }
  
  public save = (productCopy : ProductCopy): Observable<ProductCopy> => {
      let toAdd = JSON.stringify(productCopy);
      let actionUrl = Constants.apiServer + '/service/productCopy/save';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
        .map((response: Response) => {
            return  response.json();
        }) 
        .catch(this.handleError);
   }
  
  public getProductCopies = (productId: number): Observable<ProductCopy[]> => {
    this.actionUrl = Constants.apiServer + '/service/productCopy/productId/' + productId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ProductCopy[]>response.json())
      .catch(this.handleError);
  }
  
    public getInStockProductCopies = (productId: number): Observable<ProductCopy[]> => {
    this.actionUrl = Constants.apiServer + '/service/productCopy/getInStockProductCopies/' + productId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ProductCopy[]>response.json())
      .catch(this.handleError);
  }
  
  public delete = (productCopy : ProductCopy): Observable<string> => {
      let toAdd = JSON.stringify(productCopy);
      let actionUrl = Constants.apiServer + '/service/productCopy/delete';      
      return this.http.post(actionUrl, toAdd, { headers: this.headers })
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
