import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SchoolYear } from '../models/schoolYear';
import { SchoolYearService } from '../services/schoolyear.service';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/User';  
@Component({
  selector: 'app-admin-schoolyear',
  templateUrl: '../pages/adminSchoolYear.html',
  providers: [SchoolYearService]
})
export class AdminSchoolYear implements OnInit, OnDestroy {

  public schoolYears: SchoolYear[];
  public error: String = '';
  public selectedSchoolYear: SchoolYear;
  displayDialog: boolean;
  schoolYear: SchoolYear = new SchoolYear();
  newSchoolYear: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  ADD_LABEL: string = Constants.ADD_LABEL; 
  
  constructor
    (
    private schoolYearService: SchoolYearService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnInit() {
    this.cols = [
      { field: 'year', header: Constants.SCHOOLYEAR, sortable: 'true', filter: 'true' },
    { field: 'description', header: Constants.DESCRIPTION, sortable: 'true', filter: 'true' },
      { field: 'code', header: Constants.CODE, sortable: 'true', filter: 'true' },
      { field: 'beginDate', header: Constants.DEBUT, type: 'Date', sortable: 'true' },
      { field: 'endDate', header: Constants.FIN, type: 'Date', sortable: 'true' }
    ];
  }

  ngOnDestroy() {
    this.schoolYears = null;
    this.error = null;
    this.selectedSchoolYear= null;
    this.schoolYear = null;
  }

  public getAll(): void {
    this.schoolYears = [];
    this.schoolYearService.getAll()
      .subscribe((data: SchoolYear[]) => this.schoolYears = data,
      error => console.log(error),
      () => console.log('Get all school years complete'));
  }


  showDialogToAdd() {
    this.newSchoolYear = true;
    this.schoolYear = new SchoolYear();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.schoolYearService.save(this.schoolYear)
        .subscribe(result => {
          if (result.id > 0) {
            this.schoolYear = result;
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
      this.schoolYearService.delete(this.schoolYear)
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
    if (this.newSchoolYear)
      this.schoolYears.push(this.schoolYear);
    else
      this.schoolYears[this.findSelectedIndex()] = this.schoolYear;
    
    var onTheFly : SchoolYear [] = [];
    onTheFly.push(...this.schoolYears);
    this.schoolYears = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.schoolYears.splice(this.findSelectedIndex(), 1);
     var onTheFly : SchoolYear [] = [];
    onTheFly.push(...this.schoolYears);
    this.schoolYears = onTheFly;
    this.resetData();
  }

  resetData() {
    this.schoolYear = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newSchoolYear = false;
    this.schoolYear = this.clone(evt.data);
    this.schoolYear.beginDate = new Date(this.schoolYear.beginDate);
    this.schoolYear.endDate = new Date(this.schoolYear.endDate);
    this.displayDialog = true;
  }

  clone(e: SchoolYear): SchoolYear {
    let aSchoolYear = new SchoolYear();
    for (let prop in e) {
      aSchoolYear[prop] = e[prop];
    }
    return aSchoolYear;
  }

  findSelectedIndex(): number {
    return this.schoolYears.indexOf(this.selectedSchoolYear);
  }

  setCurrentNews(aSchoolYear) {
    Cookie.set('schoolYearId', aSchoolYear.id);
  }
}
