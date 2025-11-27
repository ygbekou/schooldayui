import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {Constants} from '../app.constants';
import {User} from '../models/User';
import {FileUploader} from './fileUploader';
import {InvoiceView} from "../models/invoiceView";
import {ProformaService} from "../services/proforma.service";
import {Message} from "primeng/primeng";

@Component({
    selector: 'app-admin-proforma-info-only',
    templateUrl: '../pages/adminProformaInfoOnly.html',
    providers: [ProformaService, Constants]
})

// tslint:disable-next-line:component-class-suffix
export class AdminProformaInfoOnly implements OnInit {
    success = '';
    roles: any[] = [];
    public loggedInUser: User;
    // tslint:disable-next-line:no-input-rename
    @Input('invoiceView') nInvoiceView: InvoiceView;
    @ViewChild(FileUploader) fileUploader: FileUploader;

    @Output() onProformaUpdateSelected = new EventEmitter();

    error = '';
    UPDATE_LABEL: string = Constants.UPDATE_LABEL;

    public reportName: string;
    PRINT: string = Constants.PRINT;
    msgs: Message[] = [];

    selectedUser: User;

    constructor(private proformaService: ProformaService) {

    }

    ngOnInit() {
       if(this.nInvoiceView){
            this.nInvoiceView.invoiceDate = new Date(this.nInvoiceView.invoiceDate);
       }
    }

    public updateProforma()
    {
        this.onProformaUpdateSelected.emit();
    }

    public getProformaViewById(invoiceView: InvoiceView) {
        this.error = null;
        this.proformaService.getProformaViewById(invoiceView).subscribe((data: InvoiceView) => {
                this.nInvoiceView = data;
                console.log(data);
            },
            error => console.log(error),
            () => console.log('Find proforma by id ' + invoiceView.proformaId));
    }

    public printProforma() {
        this.proformaService.printProforma(this.nInvoiceView).subscribe((data: string) => {
                this.reportName = data;
            },
            error => console.log(error),
            () => console.log('Print proforma complete'));
    }

}
