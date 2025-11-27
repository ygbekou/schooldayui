import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Constants} from '../app.constants';
import {ProductCopy} from '../models/productCopy';
import {Message, SelectItem} from 'primeng/primeng';
import {User} from '../models/User';
import {InvoiceService} from '../services/invoice.service';
import {LookUpTableService} from '../services/lookUpTable.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {FileUploader} from './fileUploader';
import {Invoice} from "../models/invoice";
import {UserService} from '../services';
import {Company} from "../models/company";
import {LookUpTable} from "../models/lookUpTable";
import {AdminInvoiceInfo} from "./adminInvoiceInfo";
import {AdminInvoiceInfoOnly} from "./adminInvoiceInfoOnly";
import {AdminInvoiceDetails} from "./adminInvoiceDetails";
import {Proforma} from "../models/proforma";
import {SearchText} from "../models/searchText";
import {InvoiceDetails} from "../models/invoiceDetails";
import {InvoiceView} from "../models/invoiceView";
import { InvoiceContact } from 'app/models/InvoiceContact';
import { AdminProformaContact } from './adminProformaContact';
@Component({
    selector: 'app-admin-invoice',
    templateUrl: '../pages/adminInvoice.html',
    providers: [Constants, InvoiceService, LookUpTableService]
})

export class AdminInvoice implements OnInit, OnDestroy {
    invoicesType: SelectItem[];
    public invoices: Invoice[];
    public invoicesView: InvoiceView[];
    public proformas: Proforma[];
    public error: String = '';
    public errorClient: String = '';
    public errorReference: String = '';
    public errorSaleCond: String = '';
    public selectedProductCopy: ProductCopy;
    displayDialog: boolean;
    invoice: Invoice = new Invoice();
    invoiceView: InvoiceView = new InvoiceView();
    selectedInvoice: Invoice;
    public newInvoice: boolean = false;
    proforma: Proforma = new Proforma();
    selectedProforma: Proforma;
    newProforma: boolean = false;
    cols: any[];
    company: Company = new Company();
    public selectedCompany: Company;
    public companies: Company[];
    public lookUpTables: LookUpTable[];
    public users: User[];
    user: User = new User();
    public selectedUser: User;
    msgs: Message[] = [];

    public updateInvoice: boolean = false;
	
	  proformaTypes: SelectItem[];
	  proformaType: number = 0;

	  public invoiceContact: InvoiceContact = new InvoiceContact();
      public invoiceContacts: InvoiceContact[];
	  addInvoiceContact: boolean = false;
	  invoiceContactCols: any[];
      public searchTextInvoiceContact = "";
      public searchTextInvoiceContactObject: SearchText = new SearchText();
    public errorInvoiceContact: String = '';


    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;

    public activeTab: number = 0;

    userCols: any[];
    companiesCols: any[];

    currentUser: User = JSON.parse(atob(Cookie.get('user')));
    INVOICE_SEARCH_PARTS: string = Constants.INVOICE_SEARCH_PARTS;
    USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
    searchClient: string = Constants.USER_SEARCH_CLIENT;

    @ViewChild(FileUploader) fileUploader: FileUploader;
    @ViewChild(AdminInvoiceInfoOnly) adminInvoiceInfoOnly: AdminInvoiceInfoOnly;
    @ViewChild(AdminInvoiceInfo) adminInvoiceInfo: AdminInvoiceInfo;
    @ViewChild(AdminInvoiceDetails) adminInvoiceDetails: AdminInvoiceDetails;
    @ViewChild(AdminProformaContact) adminProformaContact: AdminProformaContact;

    public constant: Constants;

    public searchTextObject: SearchText = new SearchText();

    public searchText: string = "";
    public searchTextCompany: string = "";
    public searchTextUser: string = "";

    public invoiceType: number;

    constructor
    (
        private invoiceService: InvoiceService,
        private userService: UserService,
        private lookUpTableService: LookUpTableService,

        private changeDetectorRef: ChangeDetectorRef
    ) {
        /*this.invoiceView = new InvoiceView();
        this.invoiceView.tax = 18;
        this.newInvoice = true;*/
    }

    ngOnDestroy() {
        this.invoices = null;
        this.error = null;
        this.invoice = null;
        this.invoiceView = null;
        this.selectedInvoice = null;
        this.selectedUser = null;
        this.cols = null;
    }

    ngOnInit() {

        this.user = JSON.parse(atob(Cookie.get('user')));

        this.searchTextObject.searchText = "";

        this.cols = [
            { field: 'number', header: Constants.INVOICE_NUMBER, sortable: 'true', filter: 'true' },
            { field: 'description', header: Constants.INVOICE_DESCRIPTION, sortable: 'true', filter: 'true' },
            { field: 'invoiceType', header: Constants.INVOICE_TYPE, sortable: 'true', filter: 'true' },
            { field: 'invoiceDate', header: Constants.INVOICE_DATE, sortable: 'false', filter: 'false' }
        ];

        this.userCols = [
            {field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true'},
            {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
            {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'}
        ];

        this.companiesCols = [
            { field: 'name', header: Constants.NOM_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'phone', header: Constants.PHONE_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'email', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' }
        ];

        this.invoiceContactCols = [
            { field: 'lastName', header:  Constants.NAME, sortable: 'true', filter: 'true' },
            { field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true' },
            { field: 'email', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'phone', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' }
        ];

		this.proformaTypes = [];
		this.proformaTypes.push({label: 'Entreprise', value: '0'});
		this.proformaTypes.push({label: 'Personne', value: '1'}); 

    }

    public getAll(): void {
        this.invoices = [];
        this.invoiceService.getAll()
            //.subscribe((data: Invoice[]) => {
            .subscribe((data: InvoiceView[]) => {
                    //this.invoices = data;
                    this.invoicesView = data;
                },
                error => console.log(error),
                () => console.log('Get all Invoices complete'));
    }

    onRowSelect(evt) {
        //this.newUser = false;
        /*this.user = this.clone(evt.data);
        this.displayDialog = true;
        this.onUserSelected.emit(this.user);*/
        this.invoiceType === 0 ? this.invoice = evt.data : this.invoice = evt.data;
    }

    onInvoiceUpdateSelected() {
        //this.invoiceView = invoiceView;
        //this.invoiceView.invoiceDate = new Date(invoiceView.invoiceDate);
        this.changeDetectorRef.detectChanges();
        this.updateInvoice = true;
        this.activeTab = 1;

        //this.adminInvoiceInfo.invoiceView = this.invoiceView;

        this.changeDetectorRef.detectChanges();
        //console.log(invoiceView);
    }

    onCancelInvoiceUpdateSelected(event) {
        this.activeTab = 0;
        this.updateInvoice = false;
        this.invoiceView = event.data;
        this.changeDetectorRef.detectChanges();
    }

    save() {
        // Si aucun client n'est choisi (entreprise ou client)
        if (!this.invoice.user && !this.invoice.company)
        {
            this.errorReference = "";
            this.errorSaleCond = "";
            this.errorClient = Constants.INVOICE_NO_COMPANY_OR_CLIENT_CHOOSE;
        }
        // Si une entreprise et un  client sont en meme temps choisi
        else if (this.invoice.user && this.invoice.company)
        {
            this.errorReference = "";
            this.errorSaleCond = "";
            this.errorClient = Constants.INVOICE_COMPANY_AND_CLIENT_CHOOSE;
        }
        //Si la référence n'est pas saisie
        else if (!this.invoice.reference)
        {
            this.errorClient = "";
            this.errorSaleCond = "";
            this.errorReference = Constants.INVOICE_NO_REFERENCE;
        }
        //Si les conditions de ventes ne sont pas saisies
        else if (!this.invoice.saleCond)
        {
            this.errorReference = "";
            this.errorClient = "";
            this.errorSaleCond = Constants.INVOICE_NO_SALE_COND;
        }
        else
        {
            this.msgs = [];
            try {
                this.error = '';

                //Si la date de la facture n'est pas choisie, on prend la date du jour
                if (!this.invoice.invoiceDate)
                {
                    this.invoice.invoiceDate = new Date();
                }
                console.log(this.invoice);

                //Mettre le status à nouveau
                this.invoice.status = 0;

                this.invoiceService.save(this.invoice)
                    .subscribe(result => {
                        if (result.invoiceId > 0) {
                            this.initialise();
                            this.invoiceView = result;
                            //this.selectedInvoice = result;
                            this.newInvoice = false;
                            this.activeTab = 0;
                        }
                        else {
                            this.error = Constants.saveFailed;
                            this.displayDialog = true;
                        }
                    })
            }
            catch (e) {
                console.log(e);
            }

        }

    }

    onUserSelected(event) {
        console.log(event.data);
        //this.selectedUser = event.data;
        this.invoice.user = event.data;
    }

    onVendeurSelected(event){
         this.invoice.vendeur = event.data;
    }

    onCompanySelected(event) {
        console.log(event.data);
        //this.selectedCompany = event.data;
        this.invoice.company = event.data;
    }

    public addNewInvoice0()
    {
        this.newInvoice = true;
        this.invoiceType = 0;
        this.invoice.tax = 18;
    }

    public addNewInvoice1()
    {
        this.newInvoice = true;
        this.invoiceType = 1;
        this.invoice.tax = 18;
    }

    public cancelNewInvoice()
    {
        this.initialise();
    }

    public initialise()
    {
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
        /*this.lookUpTables = [];
        this.lookUpTableService.getAll("COMPANY")
            .subscribe((data: LookUpTable[]) => this.lookUpTables = data,
                error => console.log(error),
                () => console.log('Get all Companies complete'));*/
        this.companies = [];
        this.error = null;
        if (this.searchTextObject.searchText != null) {
            this.lookUpTableService.searchCompany(this.searchTextObject).subscribe((data: Company[]) => {
                this.companies = data;
                if (this.companies == null || this.companies.length <= 0) {
                    this.error = 'Pas de compagnies trouvées'
                }
            },
            error => console.log(error),
            () => console.log('Find companies with name like ' + this.searchTextObject.searchText));
        }
    }

    public searchUser() {
        this.error = null;
        if (this.searchTextUser != null) {
            this.userService.search(this.searchTextUser).subscribe((data: User[]) => {
                    this.users = data;
                    if (this.users == null || this.users.length <= 0) {
                        this.error = Constants.NO_USER_FOUND;
                    }
                },
                error => console.log(error),
                () => console.log('Find users with name like ' + this.searchTextUser));
        }
    }

    public search() {
        this.error = null;
        if (this.searchText != null) {

            this.invoices = [];
            this.invoiceService.getAll()
                //.subscribe((data: Invoice[]) => {
                .subscribe((data: InvoiceView[]) => {
                        //this.invoices = data;
                        this.invoicesView = data;
                    },
                    error => console.log(error),
                    () => console.log('Get all Invoices complete'));
        }
    }

    onInvoiceDetailsSaved(invoiceDetails: InvoiceDetails) {
        this.invoice = invoiceDetails.invoice;
        this.adminInvoiceInfo.nInvoice = invoiceDetails.invoice;

        console.log('Invoice details save : adminInvoice');
        this.changeDetectorRef.detectChanges();
        console.log(this.invoice);
    }

    onTabChange(evt) {
        this.activeTab = evt.index;
        console.log(evt.index);
        if (evt.index == 0) {
            this.updateInvoice = false;
            this.adminInvoiceInfoOnly.getInvoiceViewById(this.invoiceView);
        }
        else {
            //Si le tab de modification est actif alors l'index renvoyé est 1, 2 ou 3
            if (this.updateInvoice){
                if (evt.index == 1) {
                    this.adminInvoiceInfo.getInvoiceViewById(this.invoiceView);
                }
                else if (evt.index == 2) {
                    //Appel de la méthode ngOnInit(). Par défaut, ce n'est pas le
                    //this.updateInvoice = false;
                    this.adminInvoiceDetails.ngOnInit();
                    this.adminInvoiceDetails.getInvoiceById(this.invoiceView); //Set invoice BY invoiceView
                    this.adminInvoiceDetails.getRegisteredInvoiceDetails(this.invoiceView);
                    this.adminInvoiceDetails.invoiceDetailsOrFeeColumnUpdateEditableStatus();
                    this.adminInvoiceDetails.getRegisteredInvoiceFees(this.invoiceView);
                }
                else if (evt.index === 3) {
                    //Appel de la méthode ngOnInit(). Par défaut, ce n'est pas le cas
                    //this.updateProforma = false;
                    this.adminProformaContact.ngOnInit();
					this.adminProformaContact.getProformaById(this.invoiceView); //Set proforma BY invoiceView
					/*
                    this.adminProformaContact.getRegisteredProformaDetails(this.invoiceView);
                    this.adminProformaContact.invoiceDetailsOrFeeColumnUpdateEditableStatus();
					this.adminProformaContact.getRegisteredProformaFees(this.invoiceView);
					*/
                }
            }
            //Sinon l'index renvoyé est 1 ou 2 (en ce moment seulement 2 tabs sont actifs : infoOnly et infoDetails
            else {
                if (evt.index == 1) {
                    //Appel de la méthode ngOnInit(). Par défaut, ce n'est pas le
                    this.adminInvoiceDetails.ngOnInit();
                    this.adminInvoiceDetails.getRegisteredInvoiceDetails(this.invoiceView);
                    this.adminInvoiceDetails.invoiceDetailsOrFeeColumnUpdateEditableStatus();
                    this.adminInvoiceDetails.getRegisteredInvoiceFees(this.invoiceView);
                }
                else if (evt.index === 2) {
                    //Appel de la méthode ngOnInit(). Par défaut, ce n'est pas le cas
                    //this.updateProforma = false;
                    this.adminProformaContact.ngOnInit();
					this.adminProformaContact.getProformaById(this.invoiceView); //Set proforma BY invoiceView

                }
            }
        } 
    }

    delete(){

    }
	
	public newInvoiceContact() {
		this.addInvoiceContact = true;
		this.invoiceContact = new InvoiceContact();
	}
	
	public cancelInvoiceContact() {
		this.addInvoiceContact = false;
		this.invoiceContact = new InvoiceContact();
	}

	public saveInvoiceContact() {
		

                this.invoiceService.saveInvoiceContact(this.invoiceContact)
                    .subscribe(result => {
                        if (result.id > 0) {
                            //this.initialise();
							this.invoiceContact = result;
							this.invoice.invoiceContact = this.invoiceContact;
                            console.log(this.invoiceContact);
                            console.log(this.invoice);
                            this.addInvoiceContact = false;
                        }
                        else {
                            this.errorInvoiceContact = Constants.saveFailed;
                        }
                    })
	}

	public proformaTypeChange() {
		console.log("PT : " + this.proformaType);

		if (this.proformaType == 0)
		{
			this.users = null;
			this.invoice.user = null;
			this.searchTextUser = null;
		}
		else 
		{
			this.companies = null;
			this.invoice.company = null;
			this.searchTextObject.searchText = null;
			this.invoiceContacts = null;
			this.searchTextInvoiceContactObject.searchText = null;
		}
	}

    public searchInvoiceContact() {
        this.error = null;
        if (this.searchInvoiceContact != null) {
            this.userService.searchInvoiceContact(this.searchTextInvoiceContactObject).subscribe((data: InvoiceContact[]) => {
                    this.invoiceContacts = data;
                    if (this.invoiceContacts == null || this.invoiceContacts.length <= 0) {
                        this.error = Constants.NO_USER_FOUND;
                    }
                },
                error => console.log(error),
                () => console.log('Find InvoiceContact with name like ' + this.searchTextInvoiceContactObject.searchText));
        }
    }

    onInvoiceContactSelected(event) {
        console.log(event.data);
        //this.in = event.data;
        this.invoice.invoiceContact = event.data;
    }
}
