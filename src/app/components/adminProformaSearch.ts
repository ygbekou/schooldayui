import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Constants } from '../app.constants';
import { Message } from 'primeng/primeng';
import { User } from '../models/User';
import { InvoiceService } from '../services/invoice.service';
import { ProformaService } from '../services/proforma.service';
import { LookUpTableService } from '../services/lookUpTable.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Proforma } from "../models/proforma";
import { SearchText } from "../models/searchText";
import { InvoiceView } from "../models/invoiceView";
@Component({
    selector: 'app-admin-proformasearch',
    templateUrl: '../pages/adminProformaSearch.html',
    providers: [Constants, InvoiceService, ProformaService, LookUpTableService]
})

// tslint:disable-next-line:component-class-suffix
export class AdminProformaSearch implements OnInit, OnDestroy {
    //invoicesType: SelectItem[];
    //public invoices: Invoice[];
    public invoicesView: InvoiceView[];
    public invoiceView: InvoiceView;
    public selectedInvoiceView: InvoiceView;
    public proformas: Proforma[];
    public error: String = '';
    newProforma = false;
    proforma: Proforma = new Proforma();
    selectedProforma: Proforma;
    //newProforma: boolean = false;
    searchTextObject: SearchText = new SearchText();

    @Output() onProformaSelected = new EventEmitter<InvoiceView>();
    @Output() onNewProformaSelected = new EventEmitter();

    cols: any[];
    msgs: Message[] = [];
    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    public constant: Constants;

    DETAIL: string = Constants.DETAIL;
    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;
    ADD_LABEL: string = Constants.ADD_LABEL;

    INVOICE_SEARCH_PARTS: string = Constants.INVOICE_SEARCH_PARTS;

    public searchText = "";

    public invoiceType: number;

    constructor
        (
        private proformaService: ProformaService) {

    }

    ngOnDestroy() {
        this.proformas = [];
        this.error = null;
        this.proforma = null;
        this.selectedProforma = null;
        //this.selectedUser = null;
        this.cols = null;
    }

    ngOnInit() {
        this.cols = [
            { field: 'number', header: Constants.INVOICE_NUMBER, sortable: 'true', filter: 'true' },
            { field: 'customerName', header: Constants.INVOICE_CUSTUMER_NAME, sortable: 'true', filter: 'true' },
            { field: 'invoiceDate', header: Constants.INVOICE_DATE, type: 'Date', sortable: 'false', filter: 'false' },
            { field: 'costHt', header: Constants.INVOICE_TOTAL_HT, sortable: 'false', filter: 'false' },
            { field: 'costTtc', header: Constants.INVOICE_TOTAL_TTC, sortable: 'false', filter: 'false' },
            { field: 'statusDescription', header: Constants.INVOICE_STATE, sortable: 'false', filter: 'false' }
        ];
    }

    public getAll(): void {
        this.error = '';
        this.invoicesView = [];
        this.proformaService.getAll()
            .subscribe((data: InvoiceView[]) => {
                this.invoicesView = data;
                console.log(data);
            },
                error => console.log(error),
                () => console.log('Get all Proformas complete'));
    }

    onRowSelect(event) {
        //this.selectedUser = event.data;
        this.invoiceView = this.clone(event.data);
        //this.displayDialog = true;
        this.onProformaSelected.emit(this.invoiceView);
        console.log(this.invoiceView);
    }

    clone(i: InvoiceView): InvoiceView {
        const nInvoiceView = new InvoiceView();
        // tslint:disable-next-line:forin
        for (const prop in i) {
            nInvoiceView[prop] = i[prop];
        }
        return nInvoiceView;
    }
    public addNewProforma() {
        this.proforma.tax = 18;
        this.onNewProformaSelected.emit();
    }

    public cancelNewInvoice() {
        this.initialise();
    }

    public initialise() {
        this.newProforma = false;
        this.proforma = new Proforma();
    }

    public search() {
        this.error = null;

        this.invoicesView = [];
        this.proformaService.search(this.searchTextObject)
            .subscribe((data: InvoiceView[]) => {
                this.invoicesView = data;
                console.log(data);
            },
                error => console.log(error),
                () => console.log('Get all Proformas like : ' + this.searchTextObject.beginDate + ''
                    + this.searchTextObject.endDate));

    }

}
