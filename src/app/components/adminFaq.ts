import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Faqs } from '../models/faqs';
import { FaqService } from '../services/faq.service';
import { Constants } from '../app.constants'; 
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/User';  
@Component({
  selector: 'app-admin-faq',
  templateUrl: '../pages/adminFaq.html',
  providers: [FaqService]
})
export class AdminFaq implements OnInit, OnDestroy {
  selectedFaq: Faqs;
  displayDialog: boolean;
  faq: Faqs = new Faqs();
  newFaq: boolean;
  cols: any[];   
  faqs: Faqs[]= [];
  error: string;
  
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  
  constructor
    (
    private faqService: FaqService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnInit() {
    this.cols = [
      { field: 'title', header: Constants.TITLE, sortable: 'true', filter: 'true' }, 
      { field: 'author', header: Constants.AUTEUR, sortable: 'true', filter: 'true' },
      { field: 'rank', header: Constants.RANK, sortable: 'true', filter: 'true' },
      { field: 'status', header: Constants.ACTIVE, sortable: 'true', filter: 'true' }
    ];
  }

  ngOnDestroy() {
    this.faqs = null;
    this.error = null;
    this.selectedFaq= null;
    this.faq = null;
    //this.cols=null;
  }

  public getAll(): void {
    this.faqs = [];
    this.faqService.getAll()
      .subscribe((data: Faqs[]) => this.faqs = data,
      error => console.log(error),
      () => console.log('Get all Faq complete'));
  }


  showDialogToAdd() {
    this.newFaq = true;
    this.faq = new Faqs();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.faqService.save(this.faq)
        .subscribe(result => {
          if (result.id > 0) {
            this.faq = result;
            this.putInTable();
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

  delete() {
    try {
      this.error = '';
      this.faqService.delete(this.faq)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newFaq)
      this.faqs.push(this.faq);
    else
      this.faqs[this.findSelectedIndex()] = this.faq;

    var onTheFly : Faqs [] = [];
    onTheFly.push(...this.faqs);
    this.faqs = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.faqs.splice(this.findSelectedIndex(), 1);
    var onTheFly : Faqs [] = [];
    onTheFly.push(...this.faqs);
    this.faqs = onTheFly;
    this.resetData();
  }

  resetData() {
    this.faq = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newFaq = false;
    this.faq = this.clone(evt.data); 
    this.displayDialog = true;
  }

  clone(e: Faqs): Faqs {
    let aFaq = new Faqs();
    for (let prop in e) {
      aFaq[prop] = e[prop];
    }
    return aFaq;
  }

  findSelectedIndex(): number {
    return this.faqs.indexOf(this.selectedFaq);
  }


  setCurrentFaq(aFaq) {
    Cookie.set('faqId', aFaq.id);
  }
}
