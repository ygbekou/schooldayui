import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ProductCopy} from '../models/productCopy';
import {Constants} from '../app.constants';
import {ProductCopyUser} from '../models/productCopyUser';

@Injectable()
export class ProductCopyUserService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public getAll = (): Observable<ProductCopyUser[]> => {
    this.actionUrl = Constants.apiServer + '/service/productCopyUser/getAll';

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ProductCopyUser[]>response.json())
      .catch(this.handleError);
  }

  public save = (productCopyUser: ProductCopyUser): Observable<string> => {
    let toAdd = JSON.stringify(productCopyUser);
    let actionUrl = Constants.apiServer + '/service/productCopyUser/save';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  public saveBasket = (userId: number, productCopies: ProductCopy[]): Observable<ProductCopyUser[]> => {
    let toAdd = JSON.stringify(productCopies);
    let actionUrl = Constants.apiServer + '/service/productCopyUser/' + userId + '/saveBasket';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }


  public getProductCopyUsers = (userId: number): Observable<ProductCopyUser[]> => {
    this.actionUrl = Constants.apiServer + '/service/productCopyUser/userId/' + userId;

    return this.http.get(this.actionUrl)
      .map((response: Response) => <ProductCopyUser[]>response.json())
      .catch(this.handleError);
  }

  public delete = (productCopyUser: ProductCopyUser): Observable<Boolean> => {
    let toAdd = JSON.stringify(productCopyUser);
    let actionUrl = Constants.apiServer + '/service/productCopyUser/delete';
    return this.http.post(actionUrl, toAdd, {headers: this.headers})
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
