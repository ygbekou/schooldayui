import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Invoice} from '../models/invoice';
import {Constants} from '../app.constants';
import {User} from "../models/User";
import {SearchText} from "../models/searchText";
import {Enrollment} from "../models/enrollment";
import {InvoiceView} from "../models/invoiceView";
import { InvoiceContact } from '../models/InvoiceContact';

@Injectable()
export class InvoiceService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    /*public getAll = (): Observable<Invoice[]> => {
      this.actionUrl = Constants.apiServer + '/service/invoice/getAll';

      return this.http.get(this.actionUrl)
        .map((response: Response) => <Invoice[]> response.json())
        .catch(this.handleError);
    }*/

    public getAll = (): Observable<InvoiceView[]> => {
        this.actionUrl = Constants.apiServer + '/service/invoice/getAllInvoicesView';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <InvoiceView[]> response.json())
            .catch(this.handleError);
    }

    public getInvoiceNumber = (): Observable<string> => {
        this.actionUrl = Constants.apiServer + '/service/invoice/generateInvoiceNumber';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <string> response.json())
            .catch(this.handleError);
    }

    public save = (invoice: Invoice): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoice);
        const actionUrl = Constants.apiServer + '/service/invoice/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public update = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoice/update';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public search = (searchText: SearchText): Observable<InvoiceView[]> => {
        let toAdd = JSON.stringify(searchText);
        let actionUrl = Constants.apiServer + '/service/invoice/searchInvoiceView';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceView[]>response.json();
            })
            .catch(this.handleError);
    }

    public getInvoiceById = (invoiceView: InvoiceView): Observable<Invoice> => {
        let actionUrl = Constants.apiServer + '/service/invoice/getByInvoice/' + invoiceView.invoiceId;
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return <Invoice>response.json();
            })
            .catch(this.handleError);
    }

    public getInvoiceViewById = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        let actionUrl = Constants.apiServer + '/service/invoice/getByInvoiceViewById/' + invoiceView.invoiceId;
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceView>response.json();
            })
            .catch(this.handleError);
    }

    public delete = (invoice: Invoice): Observable<Boolean> => {
        let toAdd = JSON.stringify(invoice);
        let actionUrl = Constants.apiServer + '/service/invoice/delete';
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

    public sendToClient = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoice/sendToclient';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public clientApproveInvoiceByView = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoice/clientAproveInvoice';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public clientReject = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoice/clientreject';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public printInvoice = (invoiceView: InvoiceView): Observable<string> => {
        let toAdd = JSON.stringify(invoiceView);
        let actionUrl = Constants.apiServer + '/service/invoice/printInvoice';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <string>response.json();
            })
            .catch(this.handleError);
    }
	
	/* Invoice Contact */

    public saveInvoiceContact = (invoiceContact: InvoiceContact): Observable<InvoiceContact> => {
        const toAdd = JSON.stringify(invoiceContact);
        const actionUrl = Constants.apiServer + '/service/base/saveInvoiceContact';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
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
