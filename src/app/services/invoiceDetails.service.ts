import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {User} from '../models/User';
import {Constants} from '../app.constants';
import {InvoiceDetails} from "../models/invoiceDetails";
import {Invoice} from "../models/invoice";
import {InvoiceView} from "../models/invoiceView";

@Injectable()
export class InvoiceDetailsService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll = (): Observable<InvoiceDetails[]> => {
        this.actionUrl = Constants.apiServer + '/service/invoiceDetail/getAll';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <InvoiceDetails[]>response.json())
            .catch(this.handleError);
    }

    public printInvoiceDetails = (invoiceDetails: InvoiceDetails): Observable<string> => {
        const toAdd= JSON.stringify(invoiceDetails);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/printInvoiceDetail';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <string>response.json();
            })
            .catch(this.handleError);
    }

    public searchInvoiceDetails = (searchText: string): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(searchText);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/searchInvoiceDetail';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }

    public saveInvoiceDetails = (invoiceDetails: InvoiceDetails): Observable<InvoiceDetails> => {
        const toAdd= JSON.stringify(invoiceDetails);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/saveInvoiceDetail';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails>response.json();
            })
            .catch(this.handleError);
    }

    public saveProformaDetails = (invoiceDetails: InvoiceDetails): Observable<InvoiceDetails> => {
        const toAdd= JSON.stringify(invoiceDetails);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/saveProformaDetail';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails>response.json();
            })
            .catch(this.handleError);
    }

    public getRegisteredInvoiceDetails = (invoiceView: InvoiceView): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/getInvoiceDetails';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }

    public getRegisteredProformaDetails = (invoiceView: InvoiceView): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/getProformaViewDetails';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }

    /*public getRegisteredInvoiceDetails = (invoice: Invoice): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(invoice);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/getInvoiceDetails';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }*/

    public getRegisteredInvoiceFees = (invoiceView: InvoiceView): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/getinvoiceViewDetailsFees';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }

    public getRegisteredProformaFees = (invoiceView: InvoiceView): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/getProformaViewDetailsFees';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }

    /*public getRegisteredInvoiceFees = (invoice: Invoice): Observable<InvoiceDetails[]> => {
        const toAdd= JSON.stringify(invoice);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/getinvoiceDetailsFees';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails[]>response.json();
            })
            .catch(this.handleError);
    }*/

    public removeInvoiceDetails = (invoiceDetails: InvoiceDetails): Observable<InvoiceDetails> => {
        const toAdd= JSON.stringify(invoiceDetails);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/deleteInvoiceDetail';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails>response.json();
            })
            .catch(this.handleError);
    }

    public removeProformaDetails = (invoiceDetails: InvoiceDetails): Observable<InvoiceDetails> => {
        const toAdd= JSON.stringify(invoiceDetails);
        const actionUrl = Constants.apiServer + '/service/invoiceDetail/deleteProformaDetail';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceDetails>response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
