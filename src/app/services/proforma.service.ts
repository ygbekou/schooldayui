import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Invoice} from '../models/invoice';
import {Constants} from '../app.constants';
import {User} from "../models/User";
import {SearchText} from "../models/searchText";
import {Enrollment} from "../models/enrollment";
import {InvoiceView} from "../models/invoiceView";
import {Proforma} from "../models/proforma";
import { InvoiceContact } from 'app/models/InvoiceContact';

@Injectable()
export class ProformaService {

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
        this.actionUrl = Constants.apiServer + '/service/proforma/getAllProformasView';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <InvoiceView[]> response.json())
            .catch(this.handleError);
    }

    public getProformaNumber = (): Observable<string> => {
        this.actionUrl = Constants.apiServer + '/service/proforma/generateProformaNumber';

        return this.http.get(this.actionUrl)
            .map((response: Response) => <string> response.json())
            .catch(this.handleError);
    }

    public save = (proforma: Proforma): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(proforma);
        const actionUrl = Constants.apiServer + '/service/proforma/save';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public update = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/proforma/update';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public search = (searchText: SearchText): Observable<InvoiceView[]> => {
        let toAdd = JSON.stringify(searchText);
        let actionUrl = Constants.apiServer + '/service/proforma/searchProformaView';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceView[]>response.json();
            })
            .catch(this.handleError);
    }

    public getProformaById = (invoiceView: InvoiceView): Observable<Proforma> => {
        let actionUrl = Constants.apiServer + '/service/proforma/getByProforma/' + invoiceView.proformaId;
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return <Proforma>response.json();
            })
            .catch(this.handleError);
    }

    public getProformaViewById = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        let actionUrl = Constants.apiServer + '/service/proforma/getByProformaViewById/' + invoiceView.proformaId;
        return this.http.get(actionUrl, {headers: this.headers})
            .map((response: Response) => {
                return <InvoiceView>response.json();
            })
            .catch(this.handleError);
    }

    public delete = (invoice: Invoice): Observable<Boolean> => {
        let toAdd = JSON.stringify(invoice);
        let actionUrl = Constants.apiServer + '/service/proforma/delete';
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
        const actionUrl = Constants.apiServer + '/service/proforma/sendToclient';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public clientApproveProformaByView = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/proforma/clientAproveProforma';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public clientReject = (invoiceView: InvoiceView): Observable<InvoiceView> => {
        const toAdd = JSON.stringify(invoiceView);
        const actionUrl = Constants.apiServer + '/service/proforma/clientreject';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    public printProforma = (invoiceView: InvoiceView): Observable<string> => {
        let toAdd = JSON.stringify(invoiceView);
        let actionUrl = Constants.apiServer + '/service/proforma/printProforma';
        return this.http.post(actionUrl, toAdd, {headers: this.headers})
            .map((response: Response) => {
                return <string>response.json();
            })
            .catch(this.handleError);
	}
	
	/* Proforma Contact */

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
