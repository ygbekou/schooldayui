import { Component, OnInit, OnDestroy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Constants } from '../app.constants';
import { Message, SelectItem } from 'primeng/primeng';
import { User } from '../models/User';
import { InvoiceService } from '../services/invoice.service';
import { ProformaService } from '../services/proforma.service';
import { LookUpTableService } from '../services/lookUpTable.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Invoice } from "../models/invoice";
import { UserService } from '../services';
import { Company } from "../models/company";
import { LookUpTable } from "../models/lookUpTable";
import { Proforma } from "../models/proforma";
import { SearchText } from "../models/searchText";
import { InvoiceView } from "../models/invoiceView";
@Component({
    selector: 'app-admin-invoice-search',
    templateUrl: '../pages/adminInvoiceSearch.html',
    providers: [Constants, InvoiceService, ProformaService, LookUpTableService]
})

export class AdminInvoiceSearch implements OnInit, OnDestroy {
    invoicesType: SelectItem[];
    public invoices: Invoice[];
    public invoicesView: InvoiceView[];
    public proformas: Proforma[];
    public error: String = '';
    public errorClient: String = '';
    public errorReference: String = '';
    public errorSaleCond: String = '';
    displayDialog: boolean;
    invoice: Invoice = new Invoice();
    invoiceView: InvoiceView = new InvoiceView();
    selectedInvoice: Invoice;
    selectedInvoiceView: InvoiceView;
    newInvoice: boolean = false;
    proforma: Proforma = new Proforma();
    selectedProforma: Proforma;
    newProforma: boolean = false;
    searchTextObject: SearchText = new SearchText();

    @Output() onInvoiceSelected = new EventEmitter<InvoiceView>();
    @Output() onNewInvoiceSelected = new EventEmitter();

    cols: any[];
    company: Company = new Company();
    public selectedCompany: Company;
    public companies: Company[];
    public lookUpTables: LookUpTable[];
    public users: User[];
    user: User = new User();
    public selectedUser: User;
    msgs: Message[] = [];

    userCols: any[];
    companiesCols: any[];

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    public constant: Constants;

    DETAIL: string = Constants.DETAIL;
    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;
    ADD_LABEL: string = Constants.ADD_LABEL;

    INVOICE_SEARCH_PARTS: string = Constants.INVOICE_SEARCH_PARTS;

    public searchText: string = "";

    public invoiceType: number;

    constructor
        (
        private invoiceService: InvoiceService,
        private proformaService: ProformaService,
        private userService: UserService,
        private lookUpTableService: LookUpTableService,

        private changeDetectorRef: ChangeDetectorRef
        ) {

    }

    ngOnDestroy() {
        this.invoices = null;
        this.error = null;
        this.invoice = null;
        this.selectedInvoice = null;
        this.selectedUser = null;
        this.cols = null;
    }

    ngOnInit() {

        this.user = JSON.parse(atob(Cookie.get('user')));

        this.cols = [
            { field: 'number', header: Constants.INVOICE_NUMBER, sortable: 'true', filter: 'true' },
            { field: 'customerName', header: Constants.INVOICE_CUSTUMER_NAME, sortable: 'true', filter: 'true' },
            { field: 'invoiceDate', header: Constants.INVOICE_DATE, type: 'Date', sortable: 'false', filter: 'false' },
            { field: 'costHt', header: Constants.INVOICE_TOTAL_HT, sortable: 'false', filter: 'false' },
            { field: 'costTtc', header: Constants.INVOICE_TOTAL_TTC, sortable: 'false', filter: 'false' },
            { field: 'statusDescription', header: Constants.INVOICE_STATE, sortable: 'false', filter: 'false' }
        ];

        this.userCols = [
            { field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true' },
            { field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true' },
            { field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true' }
        ];

        this.companiesCols = [
            { field: 'name', header: Constants.NOM_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string1', header: Constants.PHONE_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string2', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' }
        ];

    }

    public getAll(): void {
        this.error = '';
        this.invoicesView = [];
        this.invoiceService.getAll()
            .subscribe((data: InvoiceView[]) => {
                this.invoicesView = data;
                console.log(data);
            },
                error => console.log(error),
                () => console.log('Get all Invoices complete'));
    }


    onRowSelect(event) {
        //this.invoice = this.clone(event.data);
        this.invoiceView = this.clone(event.data);

        //this.onInvoiceSelected.emit(this.invoice);
        this.onInvoiceSelected.emit(this.invoiceView);
        console.log(this.invoice);
    }

    clone(i: InvoiceView): InvoiceView {
        let nInvoiceView = new InvoiceView();
        for (let prop in i) {
            nInvoiceView[prop] = i[prop];
        }
        return nInvoiceView;
    }

    onCompanySelected(event) {
        //this.selectedCompany = event.data;
        this.invoice.company = event.data;
    }

    public addNewInvoice0() {
        //this.newInvoice = true;
        this.invoiceType = 0;
        this.invoice.tax = 18;
    }

    public addNewInvoice1() {
        this.newInvoice = true;
        this.invoiceType = 1;
        this.invoice.tax = 18;
        this.onNewInvoiceSelected.emit();
    }

    public cancelNewInvoice() {
        this.initialise();
    }

    public initialise() {
        this.newInvoice = false;
        this.invoice = new Invoice();
        this.selectedUser = null;
        this.users = [];
        this.selectedCompany = null;
        this.lookUpTables = [];
        this.companiesCols = null;
        this.userCols = null;

        this.errorSaleCond = null;
        this.errorReference = null;
        this.errorClient = null;
    }

    public searchCompany() {
        this.lookUpTables = [];
        this.lookUpTableService.getAll("COMPANY")
            .subscribe((data: LookUpTable[]) => this.lookUpTables = data,
                error => console.log(error),
                () => console.log('Get all Companies complete'));
    }

    public search() {
        this.error = null;

        this.invoicesView = [];
        this.invoiceService.search(this.searchTextObject)
            .subscribe((data: InvoiceView[]) => {
                this.invoicesView = data;
                console.log(data);
            },
                error => console.log(error),
                () => console.log('Get all Invoices like : ' + this.searchTextObject.beginDate + ''
                    + this.searchTextObject.endDate));

    }

}
