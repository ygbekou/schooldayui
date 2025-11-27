import {Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter} from '@angular/core';
import {User} from '../models/User';
import {SchoolYear} from '../models/schoolYear';
import {Term} from '../models/term';
import {Class} from '../models/class';
import {TermResultView} from '../models/termResultView';
import {ExamService} from '../services/exam.service';
import {Constants} from '../app.constants';
import {ResultSummaryView} from '../models/resultSummaryView';
import {AverageView} from '../models/averageView';
import {ClassDropdown} from './dropdowns/dropdown.class';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {TermDropdown} from './dropdowns/dropdown.term';
import {DataTableModule, DialogModule, InputTextareaModule, DataGridModule, PanelModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-admin-calc-month',
  templateUrl: '../pages/adminCalcMonth.html',
  providers: [ExamService, Constants, ClassDropdown, SchoolYearDropdown, TermDropdown]
})
export class AdminCalcMonth implements OnInit, OnDestroy {

  public user: User;
  public classDropdown: ClassDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public termDropdown: TermDropdown;
  public selectedSchoolYear: SchoolYear;
  public selectedTerm: Term;
  public selectedClasse: Class;
  public error: string;
  public msg: string;
  public disabled: boolean = false;
  public displayDialog: boolean = false;
  public calc: string;
  public results: string;
  public mailing: string;

  public termResult: TermResultView = new TermResultView();
  public selectedResultSummary: ResultSummaryView = new ResultSummaryView();
  public selectedAverage: AverageView = new AverageView();

  DETAIL: string = Constants.DETAIL;
  TEACHER: string = Constants.TEACHER;
  CLOSE_LABEL: string = Constants.CLOSE_LABEL;
  CLASSE: string = Constants.CLASSE;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TERM: string = Constants.TERM;

  public averageCols: any[];

  constructor
    (
    private examService: ExamService,
    private clsDropdown: ClassDropdown,
    private syDropdown: SchoolYearDropdown,
    private tmDropdown: TermDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.classDropdown = clsDropdown;
    this.schoolYearDropdown = syDropdown;
    this.termDropdown = tmDropdown;
  }

  ngOnDestroy() {
    this.user = null;
  }

  public calculate() {
    this.msg = null;
    this.error = null;
    this.disabled = true;
    this.calc = Constants.CALCUL_EN_COURS;
    if (this.selectedClasse != null && this.selectedSchoolYear != null && this.selectedTerm != null) {

      this.examService.calculateMonth(this.selectedClasse.id
        + "," + this.selectedSchoolYear.id
        + "," + this.selectedTerm.id
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
          console.log('Calc Month')
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
    this.disabled = true;
    if (this.selectedClasse != null
      && this.selectedSchoolYear != null
      && this.selectedTerm != null) {
      this.examService.getTermResults(this.selectedClasse.id
        + "," + this.selectedSchoolYear.id
        + "," + this.selectedTerm.id
        + "," + this.user.id).subscribe((data: TermResultView) => {

          this.termResult = data;
          this.disabled = false;
        },
        error => console.log(error),
        () => {
          console.log('Getting Results');
          this.disabled = false;
        });
    } else {
      this.error = Constants.REQUIRED_FIELD_MISSING;
      this.disabled = false;
    }

  }

  public getAverages(resultSummary: ResultSummaryView) {
    this.msg = null;
    this.error = null;

    this.examService.getAverages(resultSummary)
      .subscribe((data: ResultSummaryView) => {
        this.selectedResultSummary = data;
        this.displayDialog = true;
      },
      error => console.log(error),
      () => console.log('Getting Averages'));
  }

  ngOnInit() {

    this.calc = Constants.CALCULER;
    this.results = Constants.RESULTATS;
    this.mailing = Constants.E_MAIL_RESULTATS;
    this.user = JSON.parse(atob(Cookie.get('user')));

    this.averageCols = [
      {field: 'subjectName', header: Constants.SUBJECT, type: 'string', sortable: 'true'},
      {field: 'maxMark', header: Constants.NOTE_SUR, type: 'string', sortable: 'true'},
      {field: 'classMark', header: Constants.MOY_CLASS, type: 'string', sortable: 'true'},
      {field: 'classRatio', header: '%', type: 'string', sortable: 'true'},
      {field: 'examMark', header: Constants.MOY_EXAM, type: 'string', sortable: 'true'},
      {field: 'examRatio', header: '%', type: 'string', sortable: 'true'},
      {field: 'averageMark', header: Constants.MOY, type: 'string', sortable: 'true'}

    ];

  }

  getName(index: number) {
    var average: AverageView = this.selectedResultSummary.averages[index];
    return average.teacherLastName + ' '
      + (average.teacherMiddleName == null ? '' : average.teacherMiddleName) + ' '
      + average.teacherFirstName;
  }

  close() {
    this.displayDialog = false;
  }

  onRowSelect(event) {}

  public emailResults() {
    this.msg = null;
    this.error = null;
    this.disabled = true;
    this.mailing = Constants.E_MAILING_RESULTATS;
    if (this.selectedClasse != null
      && this.selectedSchoolYear != null
      && this.selectedTerm != null) {
      this.examService.emailTermResults(this.selectedClasse.id
        + "," + this.selectedSchoolYear.id
        + "," + this.selectedTerm.id
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
