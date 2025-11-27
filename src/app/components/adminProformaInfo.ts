import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { LookUpTableService } from '../services/lookUpTable.service';
import { Constants } from '../app.constants';
import { User } from '../models/User';
import { FileUploader } from './fileUploader';
import { Message } from 'primeng/primeng';
import { Invoice } from "../models/invoice";
import { InvoiceView } from "../models/invoiceView";
import { Company } from "../models/company";
import { LookUpTable } from "../models/lookUpTable";
import { SearchText } from "../models/searchText";
import { ProformaService } from "../services/proforma.service";

@Component({
    selector: 'app-admin-proforma-info',
    templateUrl: '../pages/adminProformaInfo.html',
    providers: [UserService, Constants]
})

// tslint:disable-next-line:component-class-suffix
export class AdminProformaInfo implements OnInit {
    success = '';
    roles: any[] = [];
    public loggedInUser: User;
    // tslint:disable-next-line:no-input-rename
    @Input('invoice') nInvoice: Invoice;
    // tslint:disable-next-line:no-input-rename
    @Input('invoiceView') nInvoiceView: InvoiceView;
    @ViewChild(FileUploader) fileUploader: FileUploader;

    @Output() onCancelProformaUpdateSelected = new EventEmitter<InvoiceView>();

    CHANGE_PROFIL_IMAGE: string = Constants.CHANGE_PROFIL_IMAGE;
    MALE: string = Constants.MALE;
    FEMALE: string = Constants.FEMALE;
    SAVE_LABEL: string = Constants.SAVE_LABEL;

    //public invoice: Invoice = new Invoice();
    selectedUser: User;
    selectedCompany: Company;
    public companies: Company[];
    public lookUpTables: LookUpTable[];
    public users: User[];

    userCols: any[];
    companiesCols: any[];

    public searchTextObject: SearchText = new SearchText();

    public searchTextUser = '';
    public searchTextCompany = '';

    INVOICE_SEARCH_PARTS: string = Constants.INVOICE_SEARCH_PARTS;
    USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;

    msgs: Message[] = [];
    public error: String = '';
    public errorClient: String = '';
    public errorReference: String = '';
    public errorSaleCond: String = '';
    public errorDescription = "";
    public successSave: String = '';

    constructor(
        private userService: UserService,
        private lookUpTableService: LookUpTableService,
        private proformaService: ProformaService) {


    }

    ngOnInit() {
        //this.aUser = new User();
        this.nInvoiceView.invoiceDate = new Date(this.nInvoiceView.invoiceDate);

        this.searchTextObject.searchText = "";

        this.userCols = [
            { field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true' },
            { field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true' },
            { field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true' }
        ];

        this.companiesCols = [
            { field: 'name', header: Constants.NOM_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'phone', header: Constants.PHONE_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'email', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' }
        ];
    }

    public cancelUpdateProforma() {
        this.onCancelProformaUpdateSelected.emit(this.nInvoiceView);
    }

    onUserSelected(event) {
        this.selectedUser = event.data;
        this.nInvoice.user = event.data;
    }

    onCompanySelected(event) {
        this.selectedCompany = event.data;
        this.nInvoice.company = event.data;
    }


    public update() {
        // Si aucun client n'est choisi (entreprise ou client)
        if (!this.nInvoiceView.userId && !this.nInvoiceView.companyId) {
            this.errorReference = "";
            this.errorSaleCond = "";
            this.errorDescription = "";
            this.errorClient = Constants.INVOICE_NO_COMPANY_OR_CLIENT_CHOOSE;
        }
        // Si une entreprise et un  client sont en meme temps choisi
        else if (this.nInvoiceView.userId && this.nInvoiceView.companyId) {
            this.errorReference = "";
            this.errorSaleCond = "";
            this.errorDescription = "";
            this.errorClient = Constants.INVOICE_COMPANY_AND_CLIENT_CHOOSE;
        }
        //Si la référence n'est pas saisie
        /*else if (!this.nInvoiceView.reference) {
            this.errorClient = "";
            this.errorSaleCond = "";
            this.errorDescription = "";
            this.errorReference = Constants.INVOICE_NO_REFERENCE;
        }*/
        //Si la description n'est pas saisie
       else if (!this.nInvoiceView.description)
        {
            this.errorReference = "";
            this.errorClient = "";
            this.errorDescription = Constants.INVOICE_NO_DESCRIPTION;
            this.errorSaleCond = "";
        }
        //Si les conditions de ventes ne sont pas saisies
        else if (!this.nInvoiceView.saleCond) {
            this.errorReference = "";
            this.errorClient = "";
            this.errorDescription = "";
            this.errorSaleCond = Constants.INVOICE_NO_SALE_COND;
        }
        else {
            this.msgs = [];
            try {
                this.error = '';
                this.successSave = '';

                console.log(this.nInvoiceView)
                this.proformaService.update(this.nInvoiceView)
                    .subscribe(result => {
                        if (result.proformaId > 0) {
                            //this.initialise();
                            this.nInvoiceView = result;
                            console.log(this.nInvoiceView);
                            this.successSave = Constants.saveSuccess;
                            //this.selectedInvoice = result;
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

    showDialogToUploadImage(data) {
        this.fileUploader.showDialogToUploadImage("user", data);
    }

    public searchCompany() {
        if (this.searchTextObject.searchText != null) {
            this.companies = [];
            this.error = null;
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

    public getProformaViewById(invoiceView: InvoiceView) {
        this.error = null;
        this.proformaService.getProformaViewById(invoiceView).subscribe((data: InvoiceView) => {
            this.nInvoiceView = data;
        },
            error => console.log(error),
            () => console.log('Find proforma by id ' + invoiceView.id));
    }

    public sendToClient() {
        this.error = null;
        this.proformaService.sendToClient(this.nInvoiceView).subscribe((data: InvoiceView) => {
            this.nInvoiceView = data;

            this.msgs.push({ severity: 'success', summary: 'Succès', detail: 'Etat changé en envoyé au client  !'});
        },
            error => console.log(error),
            () => console.log('Sent proforma id = ' + this.nInvoiceView.proformaId + ' complete'));
    }

    public clientAprove() {
        this.error = null;
        this.proformaService.clientApproveProformaByView(this.nInvoiceView).subscribe((data: InvoiceView) => {
            this.nInvoiceView = data;
            console.log(data);

            this.msgs.push({ severity: 'success', summary: 'Succès', detail: 'Etat changé en approuvé par le client  !'});
        },
            error => console.log(error),
            () => console.log('Approve proforma id = ' + this.nInvoiceView.proformaId + ' complete'));
    }

    public clientReject() {
        this.error = null;
        this.proformaService.clientReject(this.nInvoiceView).subscribe((data: InvoiceView) => {
            this.nInvoiceView = data;

            this.msgs.push({ severity: 'success', summary: 'Succès', detail: 'Etat changé en rejecté par le client  !'});
        },
            error => console.log(error),
            () => console.log('Reject proforma id = ' + this.nInvoiceView.proformaId + ' complete'));
    }
}
