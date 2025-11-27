import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Exam } from '../models/exam';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { AdminProduct } from './adminProduct';
import {Invoice} from "../models/invoice";
import {AdminUserList} from "./adminUserList";
import {ManageStudent} from "./manageStudent";
import {AdminProforma} from "./adminProforma";
import {AdminFacturation} from "./adminFacturation";
import {InvoiceService} from "../services/invoice.service";

@Component({
    selector: 'app-admin-proforma-facturation',
    templateUrl: '../pages/adminProformaFacturation.html',
    providers: [InvoiceService]
})
export class AdminProformaFacturation implements OnInit {

    @ViewChild(AdminProforma) adminProforma: AdminProforma;
    @ViewChild(AdminFacturation) adminFacturation: AdminFacturation;

    public activeTab = 0;
    currentUser: User;
    public invoice: Invoice;

    SEARCH = Constants.SEARCH;
    INVOICING= Constants.INVOICING;
    PROFORMA= Constants.PROFORMA;

    constructor(private changeDetectorRef: ChangeDetectorRef, private invoiceService: InvoiceService) {
        this.invoice = new Invoice();
    }
    ngOnInit() {
        this.currentUser= JSON.parse(atob(Cookie.get('user')));
        if (this.currentUser == null) {
            this.currentUser = new User();
        }

    }

    onTabChange(evt) {
        this.activeTab = evt.index;
        if (evt.index == 0) {

        } else if (evt.index == 1) {

        }
    }


}
