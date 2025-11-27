import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Invoice} from "../models/invoice";
import {InvoiceService} from "../services/invoice.service";
import { AdminSifa } from './adminSifa';
import { AdminSifa1 } from './adminSifa1';
import { AdminSifa2 } from './adminSifa2';

@Component({
    selector: 'app-dep-bourse-online',
    templateUrl: '../pages/depBourseOnline.html',
    providers: [InvoiceService]
})
export class DepBourseOnline implements OnInit {

    @ViewChild(AdminSifa) adminSifa: AdminSifa;
    @ViewChild(AdminSifa1) adminSifa1: AdminSifa1;
    @ViewChild(AdminSifa2) adminSifa2: AdminSifa2;

    public activeTab = 0;
    currentUser: User;
    public invoice: Invoice;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.invoice = new Invoice();
    }
    ngOnInit() {

        this.adminSifa.getAll();
        this.adminSifa1.getAll();
        this.adminSifa2.getAll();

        
        this.currentUser= JSON.parse(atob(Cookie.get('user')));
        if (this.currentUser == null) {
            this.currentUser = new User();
        }
    }

    onTabChange(evt) {
        console.log(evt);
        if (evt.index == 0) {
          this.adminSifa.getAll();
        } else if (evt.index == 1) {
          this.adminSifa1.getAll();
        } else if (evt.index == 2) {
          this.adminSifa2.getAll();
        }  
    }


}
