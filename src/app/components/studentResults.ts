import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Student } from '../models/student';
import { User } from '../models/User';
import { SchoolYear } from '../models/schoolYear';
import { MarkView } from '../models/markView';
import { StudentService } from '../services/student.service';
import { TermResultView } from '../models/termResultView';
import { ExamService } from '../services/exam.service';
import { Constants } from '../app.constants';
import { ResultSummaryView } from '../models/resultSummaryView';
import { AverageView } from '../models/averageView';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';

@Component({
  selector: 'app-student-results',
  templateUrl: '../pages/studentResults.html',
  providers: [ExamService, StudentService, Constants, SchoolYearDropdown]
})
export class StudentResults implements OnInit, OnDestroy {

  public marks: MarkView[];
  public student: Student;
  public schoolYear: SchoolYear;
  public schoolYearDropdown: SchoolYearDropdown;
  public loggedInUser: User;
  public error: string;
  public averageCols: any[];
  public termResult: TermResultView = new TermResultView();
  public selectedResultSummary: ResultSummaryView = new ResultSummaryView();
  public selectedAverage: AverageView = new AverageView();
  public displayDialog: boolean = false;
  cols: any[];
  
  CLOSE_LABEL:  string = Constants.CLOSE_LABEL;
  SHOW_NOTES:  string = Constants.SHOW_NOTES;
  SHOW_AVERAGES:  string = Constants.SHOW_AVERAGES;
  DETAIL:  string = Constants.DETAIL;
  TEACHER:  string = Constants.TEACHER;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  constructor
    (
    private examService: ExamService,
    private studentService: StudentService,
    private syDropdown: SchoolYearDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.schoolYearDropdown = syDropdown;
  }

  ngOnDestroy() {
    this.cols = null;
  }

  ngOnInit() {

    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
    if (this.loggedInUser.role == 3) {
      this.setStudent(this.loggedInUser);
    }
    this.cols = [
      { field: 'examDate', header: Constants.DATE, type: 'Date', sortable: 'true' },
      { field: 'term', header: Constants.TERM, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'examType', header: Constants.EXAM_TYPE, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'subject', header: Constants.SUBJECT, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'mark', header: Constants.MARK, type: 'string', sortable: 'true' },
      { field: 'maxMark', header: Constants.NOTE_SUR, type: 'string' },
      { field: 'grade', header: Constants.GRADE, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'ratio', header: Constants.COMPTE_POUR }
    ];

    this.averageCols = [
      { field: 'subjectName', header: Constants.SUBJECT, type: 'string', sortable: 'true' },
      { field: 'maxMark', header: Constants.NOTE_SUR, type: 'string', sortable: 'true' },
      { field: 'classMark', header: Constants.MOY_CLASS, type: 'string', sortable: 'true' },
      { field: 'classRatio', header: '%', type: 'string', sortable: 'true' },
      { field: 'examMark', header: Constants.MOY_EXAM, type: 'string', sortable: 'true' },
      { field: 'examRatio', header: '%', type: 'string', sortable: 'true' },
      { field: 'averageMark', header: Constants.MOY, type: 'string', sortable: 'true' }

    ];
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          this.student = result;
        });

    }
  }

  public getStudentMarks() {
    this.termResult = new TermResultView();
    this.marks = null;
    this.error = null;
    if (this.schoolYear != null && this.student != null) {
      this.studentService.getStudentMarks(this.student.id + "," + this.schoolYear.id)
        .subscribe(result => {
          this.marks = result;
          console.log(this.marks,"*************")
        });
    } else {
      this.error = Constants.SELECT_YEAR;
    }
  }

  public getAverages(resultSummary: ResultSummaryView) {
    this.examService.getAverages(resultSummary)
      .subscribe((data: ResultSummaryView) => {
        this.selectedResultSummary = data;
        this.displayDialog = true;
      },
      error => console.log(error),
      () => console.log('Getting Averages'));
  }

  public getStudentTermResults() {
    this.termResult = new TermResultView();
    this.marks = null;
    this.error = null;
    if (this.schoolYear != null && this.student != null) {
      this.examService.getStudentYearResults(this.schoolYear.id + "," + this.student.id)
        .subscribe((data: TermResultView) => {
          this.termResult = data;
        });
    } else {
      this.error = Constants.SELECT_YEAR;
    }
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
}
