import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Tuition} from '../models/tuition';
import {User} from '../models/User';
import {TuitionService} from '../services/tuition.service';
import {Constants} from '../app.constants';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {TuitionTypeDropdown} from './dropdowns/dropdown.tuitionType';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {DataTableModule, DialogModule} from 'primeng/primeng';

@Component({
  selector: 'app-admin-tuition',
  templateUrl: '../pages/adminTuition.html',
  providers: [TuitionService, Constants, TuitionTypeDropdown, SchoolYearDropdown]
})

export class AdminTuition implements OnInit, OnDestroy {

  public tuitions: Tuition[];
  public error: String = '';
  public selectedTuition: Tuition;
  displayDialog: boolean;
  tuition: Tuition = new Tuition();
  newTuition: boolean;
  cols: any[];
  public user: User;
  public tuitionTypeDropdown: TuitionTypeDropdown;
  public schoolYearDropdown: SchoolYearDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TUITION_TYPE: string = Constants.TUITION_TYPE;
  constructor
    (
    private tuitionService: TuitionService,
    private tuitionTpeDropdown: TuitionTypeDropdown,
    private schoolYrDropdown: SchoolYearDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.tuitionTypeDropdown = tuitionTpeDropdown;
    this.schoolYearDropdown = schoolYrDropdown;
  }

  ngOnDestroy() {
    this.tuitions = null;
    this.error = null;
    this.selectedTuition = null;
    this.tuition = null;
    this.cols = null;
  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      {field: 'tuitionType.name', header: Constants.TRANCHE, filter: 'true'},
      {field: 'amount', header: Constants.AMOUNT, type: 'money', sortable: 'true'},
      {field: 'schoolYear.year', header: Constants.SCHOOLYEAR, sortable: 'true', filter: 'true'},
      {field: 'dueDate', header: Constants.DATE_ECHEANCE, sortable: 'true', type: 'Date'},
      {field: 'remindDate', header: Constants.DATE_RAPPEL, type: 'Date', sortable: 'true'}
    ];
  }

  public getAll(): void {
    this.tuitions = [];
    this.tuitionService.getAll()
      .subscribe((data: Tuition[]) => {
        this.tuitions = data
      },
      error => console.log(error),
      () => console.log('Get all Tuitions complete'));
  }

  showDialogToAdd() {
    if (this.user != null && (this.user.role == 1||this.user.role == 5)) {
      this.newTuition = true;
      this.tuition = new Tuition();
      this.displayDialog = true;
    }
  }

  save() {
    try {
      this.error = '';
      this.tuitionService.save(this.tuition)
        .subscribe(result => {
          if (result.id > 0) {
            this.tuition = result;
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
      this.tuitionService.delete(this.tuition)
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
    if (this.newTuition)
      this.tuitions.push(this.tuition);
    else
      this.tuitions[this.findSelectedIndex()] = this.tuition;

    var onTheFly: Tuition[] = [];
    onTheFly.push(...this.tuitions);
    this.tuitions = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.tuitions.splice(this.findSelectedIndex(), 1);
    var onTheFly: Tuition[] = [];
    onTheFly.push(...this.tuitions);
    this.tuitions = onTheFly;
    this.resetData();
  }

  resetData() {
    this.tuition = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && (this.user.role == 1||this.user.role == 5)) {
      this.newTuition = false;
      this.tuition = this.clone(evt.data);
      this.tuition.dueDate = new Date(this.tuition.dueDate);
      if (this.tuition.remindDate != null) {
        this.tuition.remindDate = new Date(this.tuition.remindDate);
      }
      this.displayDialog = true;
    }
  }

  clone(e: Tuition): Tuition {
    let aTuition = new Tuition();
    for (let prop in e) {
      aTuition[prop] = e[prop];
    }
    return aTuition;
  }

  findSelectedIndex(): number {
    return this.tuitions.indexOf(this.selectedTuition);
  }

}
