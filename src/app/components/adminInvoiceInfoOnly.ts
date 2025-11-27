import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {InvoiceService} from '../services/invoice.service';
import {Constants} from '../app.constants';
import {User} from '../models/User';
import {FileUploader} from './fileUploader';
import {InvoiceView} from "../models/invoiceView";
import {Message} from "primeng/primeng";

@Component({
    selector: 'app-admin-invoice-info-only',
    templateUrl: '../pages/adminInvoiceInfoOnly.html',
    providers: [InvoiceService, Constants]
})

export class AdminInvoiceInfoOnly implements OnInit {
    success = '';
    roles: any[] = [];
    public loggedInUser: User;
    @Input('invoiceView') nInvoiceView: InvoiceView;
    @ViewChild(FileUploader) fileUploader: FileUploader;
    msgs: Message[] = [];

    @Output() onInvoiceUpdateSelected = new EventEmitter();

    error: string = '';
    UPDATE_LABEL: string = Constants.UPDATE_LABEL;

    public reportName: string;
    PRINT: string = Constants.PRINT;

    selectedUser: User;

    constructor(private invoiceService: InvoiceService) {

    }

    ngOnInit() {
        this.nInvoiceView.invoiceDate = new Date(this.nInvoiceView.invoiceDate);
         this.nInvoiceView.paymentDate = new Date(this.nInvoiceView.paymentDate);
    }

    public updateInvoice()
    {
        this.onInvoiceUpdateSelected.emit();
    }

    public getInvoiceViewById(invoiceView: InvoiceView) {
        this.error = null;
        this.invoiceService.getInvoiceViewById(invoiceView).subscribe((data: InvoiceView) => {
                this.nInvoiceView = data;
            },
            error => console.log(error),
            () => console.log('Find invoice by id ' + invoiceView.id));
    }

    public printInvoice() {
        this.invoiceService.printInvoice(this.nInvoiceView).subscribe((data: string) => {
                this.reportName = data;
            },
            error => console.log(error),
            () => console.log('Print invoice complete'));
    }

}
