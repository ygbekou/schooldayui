import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ExamConfiguration } from '../models/examConfiguration';
import { Constants } from '../app.constants';
import { ExamConfigService } from 'app/services/ExamConfig.service';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { ExamTypeDropdown } from './dropdowns/dropdown.examType';
@Component({
  selector: 'app-admin-exam-config',
  templateUrl: '../pages/adminExamConfig.html',
  providers: [ExamConfigService,SchoolYearDropdown,ExamTypeDropdown]
})
export class AdminExamConfig implements OnInit {

  public examConfigurations: ExamConfiguration[];
  public error: String = '';
  public selectedExamConfiguration: ExamConfiguration;
  displayDialog: boolean;
  examConfiguration: ExamConfiguration = new ExamConfiguration();
  public schoolYearDropdown: SchoolYearDropdown;
  public examTypeDropdown: ExamTypeDropdown;
  newExamConfiguration: boolean;
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
    private examConfigService: ExamConfigService,
    private changeDetectorRef: ChangeDetectorRef,
    syDropdown: SchoolYearDropdown,
    examTypeDropdown : ExamTypeDropdown
    ) {
        this.schoolYearDropdown = syDropdown;
        this.examTypeDropdown = examTypeDropdown;
  }

  ngOnDestroy() {
    this.examConfigurations = null;
    this.error = null;
    this.selectedExamConfiguration = null;
    // this.examConfiguration = null;
    this.cols = null;
  }
  ngOnInit() {
    this.cols = [
      { field: 'schoolYear.year', header: "Annnée scolaire", sortable: 'true', filter: 'true' },
      { field: 'examType.name', header: "Type d'examen", sortable: 'true', filter: 'true' },
      { field: 'numberOfExams', header: "Nombre Max", sortable: 'true', filter: 'true' }
    ];
  }

  public getAll(): void {
    this.examConfigurations = [];
    this.examConfigService.getAll()
      .subscribe((data: ExamConfiguration[]) => this.examConfigurations = data,
      error => console.log(error),
      () => console.log('Get all ExamConfigurations complete'));
  }


  showDialogToAdd() {
    this.newExamConfiguration = true;
    this.examConfiguration = new ExamConfiguration();
    this.displayDialog = true;
  }

  save() {
    console.log(this.examConfiguration);
    try {
      this.error = '';
      this.examConfigService.save(this.examConfiguration)
        .subscribe(result => {
          if (result.id > 0) {
            this.examConfiguration = result;
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
      this.examConfigService.delete(this.examConfiguration)
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
    if (this.newExamConfiguration)
      this.examConfigurations.push(this.examConfiguration);
    else
      this.examConfigurations[this.findSelectedIndex()] = this.examConfiguration;

    var onTheFly : ExamConfiguration [] = [];
    onTheFly.push(...this.examConfigurations);
    this.examConfigurations = onTheFly;
    
    this.resetData();
  }

  removeFromTable() {
    this.examConfigurations.splice(this.findSelectedIndex(), 1);
     var onTheFly : ExamConfiguration [] = [];
    onTheFly.push(...this.examConfigurations);
    this.examConfigurations = onTheFly;
    this.resetData();
  }

  resetData() {
    // this.examConfiguration = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newExamConfiguration = false;
    this.examConfiguration = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: ExamConfiguration): ExamConfiguration {
    let aExamConfiguration = new ExamConfiguration();
    for (let prop in e) {
      aExamConfiguration[prop] = e[prop];
    }
    return aExamConfiguration;
  }

  findSelectedIndex(): number {
    return this.examConfigurations.indexOf(this.selectedExamConfiguration);
  }


}
