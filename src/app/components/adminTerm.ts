import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Term } from '../models/term';
import { User } from '../models/User';
import { TermService } from '../services/term.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TermGroupDropdown } from './dropdowns/dropdown.termGroup';
import { SemestreGroupDropdown } from './dropdowns/dropdown.semestreGroup';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-admin-term',
  templateUrl: '../pages/adminTerm.html',
  providers: [TermService, Constants, TermGroupDropdown, SemestreGroupDropdown]
})

export class AdminTerm implements OnInit, OnDestroy {

  public terms: Term[];
  public error: String = '';
  public selectedTerm: Term;
  displayDialog: boolean;
  term: Term = new Term();
  newTerm: boolean;
  cols: any[];
  public user: User;
  public termGroupDropdown: TermGroupDropdown;
  public semestreGroupDropdown: SemestreGroupDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  SEMESTER:string=Constants.SEMESTER;
  SEMESTRE_GROUP:string=Constants.SEMESTRE_GROUP;
  constructor
    (
    private termService: TermService,
    private termGrpDropdown: TermGroupDropdown,
    private semestreGrpDropdown: SemestreGroupDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.termGroupDropdown = termGrpDropdown;
    this.semestreGroupDropdown = semestreGrpDropdown;
  }
  ngOnDestroy() {
    this.terms = null;
    this.error = null;
    this.selectedTerm = null;
    this.term = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
        { field: 'description', header: Constants.DESCRIPTION, sortable: 'true', filter: 'true' },
        { field: 'code', header: Constants.CODE, sortable: 'true', filter: 'true' },
        { field: 'showFinalRank', header: Constants.DERNIER_TRIM, sortable: 'false', filter: 'false' },
        { field: 'termGroup.name', header: Constants.GROUP, sortable: 'false', filter: 'true' },
        { field: 'semestreGroup.name', header: Constants.SEMESTRE_GROUP, sortable: 'false', filter: 'true' }
      ];
   }

  public getAll(): void {
    this.terms = [];
    this.termService.getAll()
      .subscribe((data: Term[]) => {
        this.terms = data
      },
      error => console.log(error),
      () => console.log('Get all Terms complete'));
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 1) {
      this.newTerm = true;
      this.term = new Term();
      this.displayDialog = true;
    }
  }

  save() {
    try {
      this.error = '';
      this.termService.save(this.term)
        .subscribe(result => {
          if (result.id > 0) {
            this.term = result;
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
      this.termService.delete(this.term)
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
    if (this.newTerm)
      this.terms.push(this.term);
    else
      this.terms[this.findSelectedIndex()] = this.term;

    var onTheFly : Term [] = [];
    onTheFly.push(...this.terms);
    this.terms = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.terms.splice(this.findSelectedIndex(), 1);
     var onTheFly : Term [] = [];
    onTheFly.push(...this.terms);
    this.terms = onTheFly;
    this.resetData();
  }

  resetData() {
    this.term = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && this.user.role == 1) {
      this.newTerm = false;
      this.term = this.clone(evt.data);
      this.displayDialog = true;
    }
  }

  clone(e: Term): Term {
    let aTerm = new Term();
    for (let prop in e) {
      aTerm[prop] = e[prop];
    }
    return aTerm;
  }

  findSelectedIndex(): number {
    return this.terms.indexOf(this.selectedTerm);
  }

}
