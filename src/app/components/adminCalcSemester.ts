import {Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {User} from '../models/User';
import {SchoolYear} from '../models/schoolYear';
import {TermGroup} from '../models/termGroup';
import {Class} from '../models/class';
import {ExamService} from '../services/exam.service';
import {TermResultView} from '../models/termResultView';
import {ResultSummaryView} from '../models/resultSummaryView';
import {Constants} from '../app.constants';
import {ClassDropdown} from './dropdowns/dropdown.class';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {TermGroupDropdown} from './dropdowns/dropdown.termGroup';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-admin-calc-semester',
  templateUrl: '../pages/adminCalcSemester.html',
  providers: [ExamService, Constants, ClassDropdown, SchoolYearDropdown, TermGroupDropdown]
})
export class AdminCalcSemester implements OnInit, OnDestroy {

  public user: User;
  public classDropdown: ClassDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public termGroupDropdown: TermGroupDropdown;
  public selectedSchoolYear: SchoolYear;
  public selectedTermGroup: TermGroup;
  public selectedClasse: Class;
  public error: string;
  public msg: string;
  public disabled: boolean = false;
  public displayDialog: boolean = false;
  public calc: string;
  public results: string;
  public mailing: string;
  public resultSummary: ResultSummaryView = new ResultSummaryView();

  public termResult: TermResultView = new TermResultView();
  public selectedResultSummary: ResultSummaryView = new ResultSummaryView();

  QUATERLY_RESULTS: string = Constants.QUATERLY_RESULTS;
  CLOSE_LABEL:  string = Constants.CLOSE_LABEL;
  CLASSE: string = Constants.CLASSE;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  SEMESTER: string = Constants.SEMESTER;
  
  
  constructor
    (
    private examService: ExamService,
    private clsDropdown: ClassDropdown,
    private syDropdown: SchoolYearDropdown,
    private tmDropdown: TermGroupDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.classDropdown = clsDropdown;
    this.schoolYearDropdown = syDropdown;
    this.termGroupDropdown = tmDropdown;

  }

  ngOnDestroy() {
    this.user = null;
  }

  public calculate() {
    this.msg = null;
    this.error = null;
    this.disabled = true;
    this.calc = Constants.CALCUL_EN_COURS;
    if (this.selectedClasse != null && this.selectedSchoolYear != null && this.selectedTermGroup != null) {

      this.examService.calculateSemester(this.selectedClasse.id
        + "," + this.selectedSchoolYear.id
        + "," + this.selectedTermGroup.id
        + "," + this.user.id).subscribe((data: string) => {
          if (data == "Success") {
            this.msg = Constants.SUCCESSFUL_CALCULATION;
          } else {
            this.error = data;
          }
          this.disabled = false;
          this.calc = Constants.CALCULER;
        },
        error => console.log(error),
        () => {
          console.log('Calc Semester')
          this.disabled = false;
          this.calc = Constants.CALCULER;
        });
    } else {
      this.error = Constants.REQUIRED_FIELD_MISSING;
      this.disabled = false;
      this.calc = Constants.CALCULER;
    }

  }

  public getResults() {
    this.msg = null;
    this.error = null;
    if (this.selectedClasse != null
      && this.selectedSchoolYear != null
      && this.selectedTermGroup != null) {
      this.examService.getTermGroupResults(this.selectedClasse.id
        + "," + this.selectedSchoolYear.id
        + "," + this.selectedTermGroup.id
        + "," + this.user.id).subscribe((data: TermResultView) => {

          this.termResult = data;
        },
        error => console.log(error),
        () => console.log('Getting Results'));
    } else {
      this.error = Constants.REQUIRED_FIELD_MISSING;
      this.disabled = false;
    }

  }

  public getChildSummaries(resultSummary: ResultSummaryView) {
    this.msg = null;
    this.error = null;
    this.resultSummary = resultSummary;
    this.examService.getTermGroupBulletins(resultSummary)
      .subscribe((data: ResultSummaryView) => {
        this.selectedResultSummary = data;
        console.log(this.selectedResultSummary);
        this.displayDialog = true;
      },
      error => console.log(error),
      () => console.log('Getting Bulletins'));
  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.calc = Constants.CALCULER;
    this.results = Constants.RESULTATS;
    this.mailing = Constants.E_MAIL_RESULTATS;

  }

  close() {
    this.displayDialog = false;
  }

  public emailResults() {
    this.msg = null;
    this.error = null;
    this.disabled = true;
    this.mailing = Constants.E_MAILING_RESULTATS;
    if (this.selectedClasse != null
      && this.selectedSchoolYear != null
      && this.selectedTermGroup != null) {
      this.examService.emailTermGroupResults(this.selectedClasse.id
        + "," + this.selectedSchoolYear.id
        + "," + this.selectedTermGroup.id
        + "," + this.user.id).subscribe((data: string) => {

          this.msg = data;
          this.mailing = Constants.E_MAIL_RESULTATS;
          this.disabled = false;
        },
        error => console.log(error),
        () => {
          console.log('Getting Results');
          this.disabled = false;
          this.mailing = Constants.E_MAIL_RESULTATS;
        });
    } else {
      this.error = Constants.REQUIRED_FIELD_MISSING;
      this.disabled = false;
      this.mailing = Constants.E_MAIL_RESULTATS;
    }
  }
}
