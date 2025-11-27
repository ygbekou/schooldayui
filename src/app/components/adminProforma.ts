import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User'; 
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import {InvoiceView} from "../models/invoiceView";
import {AdminProformaSearch} from "./adminProformaSearch";
import {AdminProformaInfoDetails} from "./adminProformaInfoDetails";
import {Proforma} from "../models/proforma";
import {ProformaService} from "../services/proforma.service";

@Component({
    selector: 'app-admin-proforma',
    templateUrl: '../pages/adminProforma.html',
    providers: [Constants, ProformaService]
})
// tslint:disable-next-line:component-class-suffix
export class AdminProforma implements OnInit {

    @ViewChild(AdminProformaSearch) adminProformaSearch: AdminProformaSearch;
    @ViewChild(AdminProformaInfoDetails) adminProformaInfoDetails: AdminProformaInfoDetails;
    //@ViewChild(AdminInvoiceDetails) adminInvoiceDetails: AdminInvoiceDetails;

    public activeTab = 0;
    public newProforma = false;
    currentUser: User;
    public proforma: Proforma;
    public invoiceView: InvoiceView;

    SEARCH = Constants.SEARCH;
    PROFORMA= Constants.PROFORMA;

    constructor(private changeDetectorRef: ChangeDetectorRef, private proformaService: ProformaService) {
        this.invoiceView = new InvoiceView();
    }
    ngOnInit() {
        this.currentUser= JSON.parse(atob(Cookie.get('user')));
        if (this.currentUser == null) {
            this.currentUser = new User();
        }
    }

    onProformaSelected(invoiceView: InvoiceView) {
        this.newProforma = true;

        this.invoiceView = invoiceView;
        this.invoiceView.invoiceDate = new Date(invoiceView.invoiceDate);
        this.changeDetectorRef.detectChanges();
        this.activeTab = 1;

        //this.adminInvoice.activeTab = 0;
        this.adminProformaInfoDetails.activeTab = 0;
        this.adminProformaInfoDetails.newProforma = false;
        this.adminProformaInfoDetails.invoiceView = this.invoiceView;
        this.adminProformaInfoDetails.adminProformaDetails.subjectsInvoiceView=null;
        this.adminProformaInfoDetails.adminProformaDetails.searchText=null;

        this.adminProformaInfoDetails.updateProforma = false;

        this.changeDetectorRef.detectChanges();
        console.log(invoiceView);
    }

    onNewProformaSelected() {
        this.activeTab = 1;
        this.newProforma = true;
        this.adminProformaInfoDetails.newProforma = true;

        this.generateNewProformaNumber();
        this.adminProformaInfoDetails.proforma = new Proforma();
        this.adminProformaInfoDetails.invoiceView = new InvoiceView();
        this.adminProformaInfoDetails.proforma.tax = 18;
        this.changeDetectorRef.detectChanges();
        console.log(this.adminProformaInfoDetails.invoiceView);
    }

    public generateNewProformaNumber() {
        //this.lookUpTables = [];
        this.proformaService.getProformaNumber()
            .subscribe((data: string) => this.adminProformaInfoDetails.proforma.number = data,
                error => console.log(error),
                () => console.log('Get Proforma number complete'));
    }


    onTabChange(evt) {
        this.activeTab = evt.index;
        if (evt.index === 0) {

        } else if (evt.index === 1) {

        }
    }


}
