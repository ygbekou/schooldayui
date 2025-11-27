import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Level } from '../models/level';
import { LevelService } from '../services/level.service';
import { Constants } from '../app.constants';
import { CollegeDropdown } from './dropdowns/dropdown.college';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {InvoicePay} from '../models/invoicePay';
import {BankDropdown} from './dropdowns/dropdown.bank';
import {InvoicePayService} from '../services/invoicePay.service';
import {InvoiceService} from '../services/invoice.service';
import { User } from 'app/models/User';
import { InvoiceView } from 'app/models/invoiceView';
import { Invoice } from 'app/models/invoice';

@Component({
  selector: 'app-admin-invoice-pay',
  templateUrl: '../pages/adminInvoicePay.html',
  providers: [LevelService, CollegeDropdown, BankDropdown,InvoiceService]
})
export class AdminInvoicePay implements OnInit, OnDestroy {

  public levels: Level[];
  public invoicePays: InvoicePay[];
  public error: String = '';
  public selectedLevel: Level;
  public selectedInvoicepAy: InvoicePay;
  displayDialog: boolean;
  //level: Level = new Level();
  invoicePay: InvoicePay = new InvoicePay();
  invoiceView: InvoiceView = new InvoiceView();
  invoice: Invoice = new Invoice();
  newLevel: boolean;
  newInvoicePay: boolean;
  cols: any[];
  colleges = [];
  lmd = JSON.parse(Cookie.get('lmd'));
  currentUser: User;
  @ViewChild(FileUploader) fileUploader: FileUploader;
  collegeDropdown: CollegeDropdown;
  bankDropdown: BankDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  FILIERE: string = Constants.FILIERE;
  constructor
    (
      private levelService: LevelService,
      private invoicePayService: InvoicePayService,
      private invoiceService: InvoiceService,
      private clgDropdown: CollegeDropdown,
      private bDropDown: BankDropdown,
      private changeDetectorRef: ChangeDetectorRef
    ) {
    this.collegeDropdown = clgDropdown;
    this.bankDropdown = bDropDown;
  }

  ngOnDestroy() {
    this.levels = null;
    this.error = null;
    this.selectedLevel = null;
    //this.level = null;
    this.cols = null;
  }
  ngOnInit() {
    this.cols = [
      { field: 'paymentDate', header:"Date Paiement", sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
      { field: 'bankPaymentDate', header: "Date Pment Banq", sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
      { field: 'amount', header:"Montant", sortable: 'true', filter: 'true', style: { 'width': '16%', 'overflow': 'visible' } },
      { field: 'bank.name', header:"Banque", sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
      { field: 'slipNumber', header:"Nu�ro Bord", sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
      { field: 'caissier.name', header:"Caissier", sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
    ];
    this.currentUser= JSON.parse(atob(Cookie.get('user')));
        if (this.currentUser == null) {
            this.currentUser = new User();
        }
  }

  public getAll(): void {
    console.log("user :"+this.currentUser.name);
    this.invoicePays = [];
    this.invoicePayService.getAll(this.invoice.id)
      .subscribe((data: InvoicePay[]) => this.invoicePays = data,
        error => console.log(error),
        () => console.log('Get all invoice pays complete'));
  }

  public getInvoiceById(invoiceV: InvoiceView){
  this.invoiceService.getInvoiceById(invoiceV).subscribe(
    result=>{
      if(result.id>0){
        this.invoice = result;
        this.getAll();
        console.log("facture trouv�");
      }else{
        console.log("facture non trouv�e");
      }
    }
  )
  }


  showDialogToAdd() {
    this.newInvoicePay = true;
    this.invoicePay = new InvoicePay();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      
      this.invoicePay.invoice = this.invoice;
      this.invoicePay.caissier = this.currentUser;
      console.log(this.invoicePay);
      this.invoicePayService.save(this.invoicePay)
        .subscribe(result => {
          if (result.id > 0) {
            this.invoicePay = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
      console.log(this.invoicePay);
    }
    catch (e) {
      console.log(e);
    }


  }

  // delete() {
  //   try {
  //     this.error = '';
  //     this.levelService.delete(this.invoice)
  //       .subscribe(result => {
  //         if (result) {
  //           this.removeFromTable();
  //         }
  //         else {
  //           this.error = Constants.deleteFailed;
  //           this.displayDialog = true;
  //         }
  //       })
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  // }

  putInTable() {
    if (this.newInvoicePay) {
      this.invoicePays.push(this.invoicePay);
    }
    else {
      this.invoicePays[this.findSelectedIndex()] = this.invoicePay;
    }

    var onTheFly: InvoicePay[] = [];
    onTheFly.push(...this.invoicePays);
    this.invoicePays = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.invoicePays.splice(this.findSelectedIndex(), 1);
    var onTheFly: InvoicePay[] = [];
    onTheFly.push(...this.invoicePays);
    this.invoicePays = onTheFly;
    this.resetData();
  }

  resetData() {
    this.invoicePay = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newInvoicePay = false;
    this.invoicePay = this.clone(evt.data);
    console.log(this.invoicePay);
    this.displayDialog = true;
  }

  clone(e: InvoicePay): InvoicePay {
    let aInvoicePay = new InvoicePay();
    for (let prop in e) {
      aInvoicePay[prop] = e[prop];
    }
    return aInvoicePay;
  }

  findSelectedIndex(): number {
    return this.invoicePays.indexOf(this.selectedInvoicepAy);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("InvoicePay", data);
  }

}
