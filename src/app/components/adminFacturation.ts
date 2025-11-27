import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Exam } from '../models/exam';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { AdminProduct } from './adminProduct';
import {Invoice} from "../models/invoice";
import {AdminUserList} from "./adminUserList";
import {ManageStudent} from "./manageStudent";
import {AdminInvoiceSearch} from "./adminInvoiceSearch";
import {AdminInvoice} from "./adminInvoice";
import {AdminInvoiceDetails} from "./adminInvoiceDetails";
import {InvoiceService} from "../services/invoice.service";
import {LookUpTable} from "../models/lookUpTable";
import {InvoiceView} from "../models/invoiceView";
import {AdminInvoicePay} from "./adminInvoicePay";

@Component({
    selector: 'app-admin-Facturation',
    templateUrl: '../pages/adminFacturation.html',
    providers: [InvoiceService]
})
export class AdminFacturation implements OnInit {

    @ViewChild(AdminInvoiceSearch) adminInvoiceSearch: AdminInvoiceSearch;
    @ViewChild(AdminInvoice) adminInvoice: AdminInvoice;
    @ViewChild(AdminInvoiceDetails) adminInvoiceDetails: AdminInvoiceDetails;
    @ViewChild(AdminInvoicePay) adminInvoicePay: AdminInvoicePay;

    public activeTab = 0;
    public newInvoice: boolean = false;
    currentUser: User;
    public invoice: Invoice;
    public invoiceView: InvoiceView;

    SEARCH = Constants.SEARCH;
    INVOICING= Constants.INVOICING;

    constructor(private changeDetectorRef: ChangeDetectorRef, private invoiceService: InvoiceService) {
        this.invoiceView = new InvoiceView();
    }
    ngOnInit() {
        this.currentUser= JSON.parse(atob(Cookie.get('user')));
        if (this.currentUser == null) {
            this.currentUser = new User();
        }
    }

    onInvoiceSelected(invoiceView: InvoiceView) {
        this.newInvoice = true;

        this.invoiceView = invoiceView;
        this.invoiceView.invoiceDate = new Date(invoiceView.invoiceDate);
        this.changeDetectorRef.detectChanges();
        this.activeTab = 1;

        //this.adminInvoice.activeTab = 0;
        this.adminInvoice.activeTab = 0;
        this.adminInvoice.newInvoice = false;
        this.adminInvoice.invoiceView = this.invoiceView;

        this.adminInvoice.updateInvoice = false;

        this.changeDetectorRef.detectChanges();
        console.log(invoiceView);
    }

    onNewInvoiceSelected() {
        this.activeTab = 1;
        this.newInvoice = true;
        this.adminInvoice.newInvoice = true;

        this.generateNewInvoiceNumber();
        this.adminInvoice.invoice = new Invoice();
        this.adminInvoice.invoiceView = new InvoiceView();
        this.adminInvoice.invoice.tax = 18;
        this.changeDetectorRef.detectChanges();
        console.log(this.adminInvoice.invoiceView);
    }

    public generateNewInvoiceNumber() {
        //this.lookUpTables = [];
        this.invoiceService.getInvoiceNumber()
            .subscribe((data: string) => this.adminInvoice.invoice.number = data,
                error => console.log(error),
                () => console.log('Get invoice number complete'));
    }


    onTabChange(evt) {
        this.activeTab = evt.index;
        if (evt.index == 0) {

        } else if (evt.index == 1) {

        } else if (evt.index == 2) {
            this.adminInvoicePay.getInvoiceById(this.invoiceView);
        }
    }


}
