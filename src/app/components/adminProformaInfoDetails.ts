import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Constants} from '../app.constants';
import {ProductCopy} from '../models/productCopy';
import {Message} from 'primeng/primeng';
import {User} from '../models/User';
import {LookUpTableService} from '../services/lookUpTable.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {FileUploader} from './fileUploader';
import {Invoice} from "../models/invoice";
import {UserService} from '../services';
import {Company} from "../models/company";
import {LookUpTable} from "../models/lookUpTable";
import {Proforma} from "../models/proforma";
import {SearchText} from "../models/searchText";
import {InvoiceDetails} from "../models/invoiceDetails";
import {InvoiceView} from "../models/invoiceView";
import {ProformaService} from "../services/proforma.service";
import {AdminProformaInfoOnly} from "./adminProformaInfoOnly";
import {AdminProformaInfo} from "./adminProformaInfo";
import {AdminProformaDetails} from "./adminProformaDetails";
import {AdminProformaContact} from "./adminProformaContact";
import {SelectItem} from 'primeng/primeng';
import { InvoiceContact } from '../models/InvoiceContact';
@Component({
    selector: 'app-admin-proformainfodetails',
    templateUrl: '../pages/adminProformaInfoDetails.html',
    providers: [Constants, ProformaService, LookUpTableService]
})

// tslint:disable-next-line:component-class-suffix
export class AdminProformaInfoDetails implements OnInit, OnDestroy {
    //invoicesType: SelectItem[];
    //public invoices: Invoice[];
    public invoicesView: InvoiceView[];
    public proformas: Proforma[];
    public error: String = '';
    public errorInvoiceContact: String = '';
    public errorClient: String = '';
    public errorReference: String = '';
    public errorSaleCond: String = '';
    public errorDescription: String = '';
    public selectedProductCopy: ProductCopy;
    //displayDialog: boolean;
    //invoice: Invoice = new Invoice();
    invoiceView: InvoiceView = new InvoiceView();
    //selectedInvoice: Invoice;
    //public newInvoice: boolean = false;
    proforma: Proforma = new Proforma();
    selectedProforma: Proforma;
    newProforma = false;
    cols: any[];
    company: Company = new Company();
    public selectedCompany: Company;
    public companies: Company[];
    public lookUpTables: LookUpTable[];
    public users: User[];
    user: User = new User();
    public selectedUser: User;
	msgs: Message[] = [];	
	
	  proformaTypes: SelectItem[];
	  proformaType: number = 0;

	  public invoiceContact: InvoiceContact = new InvoiceContact();
      public invoiceContacts: InvoiceContact[];
	  addInvoiceContact: boolean = false;
	  invoiceContactCols: any[];
      public searchTextInvoiceContact = "";
      public searchTextInvoiceContactObject: SearchText = new SearchText();

    public updateProforma = false;


    DELETE_LABEL: string = Constants.DELETE_LABEL;
    SAVE_LABEL: string = Constants.SAVE_LABEL;

    public activeTab = 0;

    SEARCH = Constants.SEARCH;
    PROFORMA= Constants.PROFORMA;

    userCols: any[];
    companiesCols: any[];

    currentUser: User = JSON.parse(atob(Cookie.get('user')));
    INVOICE_SEARCH_PARTS: string = Constants.INVOICE_SEARCH_PARTS;
    USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
    searchClient: string = Constants.USER_SEARCH_CLIENT;

    @ViewChild(FileUploader) fileUploader: FileUploader;
    @ViewChild(AdminProformaInfoOnly) adminProformaInfoOnly: AdminProformaInfoOnly;
    @ViewChild(AdminProformaInfo) adminProformaInfo: AdminProformaInfo;
    @ViewChild(AdminProformaDetails) adminProformaDetails: AdminProformaDetails;
    @ViewChild(AdminProformaContact) adminProformaContact: AdminProformaContact;

    public constant: Constants;

    public searchTextObject: SearchText = new SearchText();

    public searchText = "";
    public searchTextCompany = "";
    public searchTextUser = "";

    public invoiceType: number;

    constructor
    (
        private proformaService: ProformaService,
        private userService: UserService,
        private lookUpTableService: LookUpTableService,

        private changeDetectorRef: ChangeDetectorRef
    ) { 
    }

    ngOnDestroy() {
        this.proformas = [];
        this.error = null;
        this.proforma = null;
        this.invoiceView = null;
        //this.selectedInvoice = null;
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
            {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
            {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'},
            {field: 'email', header: Constants.EMAIL, sortable: 'true', filter: 'true'}
        ];

		this.proformaTypes = [];
		this.proformaTypes.push({label: 'Entreprise', value: '0'});
		this.proformaTypes.push({label: 'Personne', value: '1'}); 
		}

    onProformaDetailsSaved(invoiceDetails: InvoiceDetails) {
        this.proforma = invoiceDetails.proforma;
        //this.adminProformaInfoOnly.nInvoice = invoiceDetails.invoice;
        //this.adminProformaInfo.nInvoice = invoiceDetails.invoice;

        console.log('Invoice details save : adminProforma');
        this.changeDetectorRef.detectChanges();
        console.log(this.proforma);
    }

    onProformaUpdateSelected() {
        //this.invoiceView = invoiceView;
        //this.invoiceView.invoiceDate = new Date(invoiceView.invoiceDate);
        this.changeDetectorRef.detectChanges();
        this.activeTab = 1;

        this.updateProforma = true;
        //this.adminInvoiceInfo.invoiceView = this.invoiceView;

        
        //this.adminProformaInfo.getProformaViewById(this.invoiceView);

        this.changeDetectorRef.detectChanges();
        //console.log(invoiceView);
    }

    onCancelProformaUpdateSelected(event) {
        this.activeTab = 0;
        this.updateProforma = false;
        this.invoiceView = event.data;
        this.changeDetectorRef.detectChanges();
    }

    save() {
        // Si aucun client n'est choisi (entreprise ou client)
        if (!this.proforma.user && !this.proforma.company)
        {
            this.errorReference = "";
            this.errorSaleCond = "";
            this.errorDescription = ""
            this.errorClient = Constants.INVOICE_NO_COMPANY_OR_CLIENT_CHOOSE;
        }
		// Si une entreprise et un  client sont en meme temps choisi
		/*
        else if (this.proforma.user && this.proforma.company)
        {
            this.errorReference = "";
            this.errorSaleCond = "";
            this.errorDescription = "";
            this.errorClient = Constants.INVOICE_COMPANY_AND_CLIENT_CHOOSE;
		}
		*/
        else if (this.proforma.company && !this.proforma.invoiceContact)
        {
			
				this.errorReference = "";
				this.errorSaleCond = "";
				this.errorDescription = "";
				this.errorClient = Constants.INVOICE_COMPANY_CHOOSEN_AND_NO_CLIENT_CHOOSEN;
			
        }
        //Si la référence n'est pas saisie
        /*else if (!this.proforma.reference)
        {
            this.errorClient = "";
            this.errorSaleCond = "";
            this.errorDescription = "";
            this.errorReference = Constants.INVOICE_NO_REFERENCE;
        }*/
        //Si la description n'est pas saisie
       else if (!this.proforma.description)
        {
            this.errorReference = "";
            this.errorClient = "";
            this.errorDescription = Constants.INVOICE_NO_DESCRIPTION;
            this.errorSaleCond = "";
        }
        else if (!this.proforma.saleCond)
        {
            this.errorReference = "";
            this.errorClient = "";
            this.errorDescription = "";
            this.errorSaleCond = Constants.INVOICE_NO_SALE_COND;
        }
        else
        {
            this.msgs = [];
            try {
                this.error = '';

                //Si la date de la proforma n'est pas choisie, on prend la date du jour
                if (!this.proforma.invoiceDate)
                {
                    this.proforma.invoiceDate = new Date();
                }
                console.log(this.proforma);

                //Mettre le status à nouveau
                this.proforma.status = 0;

                this.proformaService.save(this.proforma)
                    .subscribe(result => {
                        if (result.proformaId > 0) {
                            this.initialise();
                            this.invoiceView = result;
                            //this.selectedInvoice = result;
                            console.log(result);
                            this.newProforma = false;
                            this.activeTab = 0;
                        }
                        else {
                            this.error = Constants.saveFailed;
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
        this.proforma.user = event.data;
    }

    onCompanySelected(event) {
        console.log(event.data);
        //this.selectedCompany = event.data;
        this.proforma.company = event.data;
    }

    public cancelNewInvoice()
    {
        this.initialise();
    }

    public initialise()
    {
        this.newProforma = false;
        this.proforma = new Invoice();
        this.selectedUser = null;
        this.users = [];
        this.selectedCompany = null;
        this.lookUpTables = [];
        this.companiesCols = null;
        this.userCols = null;

        this.errorSaleCond = null;
        this.errorReference = null;
        this.errorDescription = null;
        this.errorClient = null;
    }

    public searchCompany() {
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
            this.invoicesView = [];
            this.proformaService.getAll()
                .subscribe((data: InvoiceView[]) => {
                        this.invoicesView = data;
                    },
                    error => console.log(error),
                    () => console.log('Get all Proformas complete'));
        }
    }

    onTabChange(evt) {
        this.activeTab = evt.index;
        console.log(evt.index);
        if (evt.index === 0) {
            this.updateProforma = false;
            this.adminProformaInfoOnly.getProformaViewById(this.invoiceView);
        }
        else {
            //Si le tab de modification est actif alors l'index renvoyé est 1, 2 ou 3
            if (this.updateProforma){
                if (evt.index === 1) {
                    this.adminProformaInfo.ngOnInit();
                    this.adminProformaInfo.getProformaViewById(this.invoiceView);
                    console.log("ok update");
                }
                else if (evt.index === 2) {
                    //Appel de la méthode ngOnInit(). Par défaut, ce n'est pas le cas
                    //this.updateProforma = false;
                    this.adminProformaDetails.ngOnInit();
                    this.adminProformaDetails.getProformaById(this.invoiceView); //Set proforma BY invoiceView
                    this.adminProformaDetails.getRegisteredProformaDetails(this.invoiceView);
                    this.adminProformaDetails.invoiceDetailsOrFeeColumnUpdateEditableStatus();
                    this.adminProformaDetails.getRegisteredProformaFees(this.invoiceView);
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
                if (evt.index === 1) {
                    //Appel de la méthode ngOnInit(). Par défaut, ce n'est pas le cas
                    this.adminProformaDetails.ngOnInit();
                    this.adminProformaDetails.getProformaById(this.invoiceView); //Set proforma BY invoiceView
                    this.adminProformaDetails.getRegisteredProformaDetails(this.invoiceView);
                    this.adminProformaDetails.invoiceDetailsOrFeeColumnUpdateEditableStatus();
                    this.adminProformaDetails.getRegisteredProformaFees(this.invoiceView);
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
	
	public newInvoiceContact() {
		this.addInvoiceContact = true;
		this.invoiceContact = new InvoiceContact();
	}
	
	public cancelInvoiceContact() {
		this.addInvoiceContact = false;
		this.invoiceContact = new InvoiceContact();
	}

	public saveInvoiceContact() {
		

                this.proformaService.saveInvoiceContact(this.invoiceContact)
                    .subscribe(result => {
                        if (result.id > 0) {
                            //this.initialise();
							this.invoiceContact = result;
							this.proforma.invoiceContact = this.invoiceContact;
                            console.log(this.invoiceContact);
                            console.log(this.proforma);
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
			this.proforma.user = null;
			this.searchTextUser = null;
		}
		else 
		{
			this.companies = null;
			this.proforma.company = null;
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
        //this.selectedUser = event.data;
        this.proforma.invoiceContact = event.data;
    }

}
