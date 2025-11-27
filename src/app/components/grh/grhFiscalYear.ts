import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FiscalYear } from '../../models/grh/fiscalYear';
import { User } from '../../models/User';
import {FiscalYearService } from '../../services/grh/fiscalYear.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-fiscal-year',
  templateUrl: '../../pages/grh/grhFiscalYear.html',
  providers: [FiscalYearService, /*LevelDropdown,*/ Constants]
})

export class GrhFiscalYear implements OnInit, OnDestroy {

  public fiscalYear: FiscalYear = new FiscalYear();
  public fiscalYears: FiscalYear[];
  public selectedFiscalYear: FiscalYear;

  public error: String = '';
  displayDialog: boolean;
  newFiscalYear: boolean;
  cols: any[];
  public user: User;
  //public subjectDropdown: SubjectDropdown;

  DETAIL: string = Constants.DETAIL;
  LEVELS:  string = Constants.LEVELS;
  SUBJECT:  string = Constants.SUBJECT;
  NAME:  string = Constants.NAME;
  DESCRIPTION:  string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private fiscalYearService: FiscalYearService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.fiscalYears = null;
    this.error = null;
    this.selectedFiscalYear = null;
    this.fiscalYear = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    //this.selectedSubjectLevel = new SubjectLevelView();
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'startYear', header: 'Date de début', type: 'Date',sortable: 'false', filter: 'true',  style:  {'width':'40%'}  },
        { field: 'endYear', header: 'Date de fin', type: 'Date',sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

 public getFiscalYears(): void {
    this.fiscalYears = [];
    /*
    this.courseTopicService.getSubjectLevels()
      .subscribe((data: SubjectLevelView[]) => {
        this.subjectLevels = data
      },
      error => console.log(error),
      () => console.log('Get all subjectLevels complete'));
      */
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newFiscalYear = true;
      this.fiscalYear = new FiscalYear();
      this.displayDialog = true;
    }
  }

  /*
  public getCourseTopics(evt) {

    this.selectedSubjectLevel = evt.data;

    this.courseTopicService.getCourseTopics(
      this.selectedSubjectLevel.subjectId + '',
      this.selectedSubjectLevel.levelId + '')
            .subscribe((data: CourseTopic[]) => {
                evt.data.courseTopics = data
      },
      error => console.log(error),
      () => console.log('Get course topics complete'));
  }
  */


  public getAll(): void {
    this.fiscalYears = [];
    this.fiscalYearService.getAll()
      .subscribe((data: FiscalYear[]) => {
        this.fiscalYears = data
      },
      error => console.log(error),
      () => console.log('Get all FiscalYears complete'));
  }

  save() {
    try {
      this.error = '';
      this.fiscalYearService.save(this.fiscalYear)
        .subscribe(result => {
          if (result.id > 0) {
            this.fiscalYear = result;
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
      this.fiscalYearService.delete(this.fiscalYear)
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
    /*
    let index = this.findSelectedIndex();
    this.selectedFiscalYear = this.fiscalYears.find(x => x == this.selectedFiscalYear);
    if (this.newFiscalYear)
      this.fiscalYears.push(this.fiscalYear);
    else
      this.fiscalYears[this.findSelectedIndex()] = this.fiscalYear;

    var onTheFly : FiscalYear [] = [];
    onTheFly.push(...this.fiscalYears);
    this.fiscalYears = onTheFly;

    this.resetData();
    */

    if (this.newFiscalYear)
      this.fiscalYears.push(this.fiscalYear);
    else
      this.fiscalYears[this.findSelectedIndex()] = this.fiscalYear;

    var onTheFly: FiscalYear[] = [];
    onTheFly.push(...this.fiscalYears);
    this.fiscalYears = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    let index = this.findSelectedIndex();
    this.selectedFiscalYear = this.fiscalYears.find(x => x == this.selectedFiscalYear);
    this.fiscalYears.splice(this.findSelectedIndex(), 1);

    var onTheFly : FiscalYear [] = [];
    onTheFly.push(...this.fiscalYears);
    this.fiscalYears = onTheFly;

    this.resetData();
  }

  resetData() {
    this.fiscalYear = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && this.user.role == 10) {
      this.newFiscalYear = false;
      this.fiscalYear = this.clone(evt.data);

      if (this.fiscalYear.startYear != null) {
        this.fiscalYear.startYear = new Date(this.fiscalYear.startYear);
      }
      if (this.fiscalYear.endYear != null) {
        this.fiscalYear.endYear = new Date(this.fiscalYear.endYear);
      }

      this.displayDialog = true;
    }
  }


   clone(e: FiscalYear): FiscalYear {
    let aFiscalYear = new FiscalYear();
    for (let prop in e) {
      aFiscalYear[prop] = e[prop];
    }
    return aFiscalYear;
  }


  /*
  cloneSubjectLevel(e: SubjectLevelView): SubjectLevelView {
    let aSubjectLevel = new SubjectLevelView();
    for (let prop in e) {
      aSubjectLevel[prop] = e[prop];
    }
    return aSubjectLevel;
  }
  */

  findSelectedIndex(): number {
    return this.fiscalYears.indexOf(this.selectedFiscalYear);
  }

  /*
   findChildSelectedIndex(): number {
    return this.selectedSubjectLevel.courseTopics.indexOf(this.selectedCourseTopic);
  }
  */

}
