import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild
          , Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/course';
import { User } from '../models/User';
import { Expense } from '../models/expense';
import { CourseService } from '../services/course.service';
import { SubjectService } from '../services/subject.service';
import { Constants } from '../app.constants';
import { SchoolYear } from '../models/schoolYear';
import { Term } from '../models/term';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ClassDropdown } from './dropdowns/dropdown.class';
import { TeacherDropdown } from './dropdowns/dropdown.teacher';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { DataTableModule, DialogModule, SelectItem, Message, ConfirmationService } from 'primeng/primeng';
import { TermDropdown } from './dropdowns/dropdown.term';
import { ExpenseTypeDropdown } from './dropdowns/dropdown.expenseType';
import { CourseGroupeCodeDropDown } from './dropdowns/dropdown.courseGroupeCode';

import { ManageTimeSheet } from './manageTimeSheet';
import { Teacher } from '../models/teacher';
import { TimeSheetStatus } from '../models/timeSheetStatus';
import { TimeSheetService } from '../services/timeSheet.service';
import { TimeSheetEntryGroup } from "../models/timeSheetEntryGroup";

import { GrhHourlyCost } from './grh/grhHourlyCost';
import { AdminCycle } from './adminCycle';
import { TimeSheetEntryDetail } from 'app/models/timeSheetEntryDetail';
import { TimeSheetEntry } from 'app/models/timeSheetEntry';
import { CourseView } from 'app/models/courseView';

class StartAndEndTime{
  public startHours: number = 0;
  public startMinutes: number = 0;
  public endHours: number = 0;
  public endMinutes: number = 0;
}


@Component({
  selector: 'app-manage-course',
  templateUrl: '../pages/manageCourse.html',
  providers: [CourseService, SubjectService, TimeSheetService, Constants,
    ClassDropdown, TermDropdown, TeacherDropdown,ConfirmationService,
    SubjectDropdown, ExpenseTypeDropdown, SchoolYearDropdown, CourseGroupeCodeDropDown]
})

export class ManageCourse implements OnInit, OnDestroy {
  sessionTypes: SelectItem[];
  public courses: Course[];
  public error: String = '';
  public selectedCourse: Course;
  displayDialog: boolean;
  course: Course = new Course();
  expenses: Expense[];
  newCourse: boolean;
  cols: any[];
  colregs: any[];
  colsTimeSheetEntryDetail: any[];
  public user: User;
  public classDropdown: ClassDropdown;
  public teacherDropdown: TeacherDropdown;
  public subjectDropdown: SubjectDropdown;
  public termDropdown: TermDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public expenseTypeDropdown: ExpenseTypeDropdown; 
   public courseGroupeCodeDropDown: CourseGroupeCodeDropDown;
  public searchText: string;
  theTerm: Term;
  theSchoolYear: SchoolYear;
  public msg: string;
  public reportName: string;
  DETAIL: string = Constants.DETAIL;
  CLASS: string = Constants.CLASSE;
  SUBJECT: string = Constants.SUBJECT;
  TEACHER: string = Constants.TEACHER; 
  COURRSE_GROUPE_CODE: string = Constants.COURRSE_GROUPE_CODE;
  PRINT: string = Constants.PRINT;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  EDIT_LABEL: string = Constants.EDIT_LABEL;
  LIBELLE: string = Constants.LIBELLE;
  COURSE_SEARCH_TEXT: string = Constants.COURSE_SEARCH_TEXT;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TERM: string = Constants.TERM;
  closeLabel: string = Constants.CLOSE_COURSE;
  public disabled = false;
  lmd = JSON.parse(Cookie.get('lmd'));

  @ViewChild(ManageTimeSheet) manageTimeSheet: ManageTimeSheet;
  @ViewChild(AdminCycle) adminCycle: AdminCycle;
  public timeSheetEntryGroup: TimeSheetEntryGroup;
  public timeSheetEntryGroups: TimeSheetEntryGroup[] = [];
  @Input() selectedUserT: User;
  msgs: Message[] = [];
  saving = false;
  manageTimeSheetBoolean : boolean = false;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;
  @Output() onCourseSelected = new EventEmitter<Course>();

  displayDialogAddTimeSheetEntryDetail: boolean = false;
  displayDialogListTimeSheetEntryDetail: boolean = false;
  timeSheetEntryDetail: TimeSheetEntryDetail;
  timeSheetEntryDetails: TimeSheetEntryDetail[] = [];
  isNewTimeSheetEntryDetail: boolean = true;


  public registeredStudents: CourseView[];
  public loggedInUser: User;

  constructor
    (
      private courseService: CourseService,
      private subjectService: SubjectService,
      private timeTrackingService: TimeSheetService,
      private clsDropdown: ClassDropdown,
      private tchDropdown: TeacherDropdown,
      private sbjDropdon: SubjectDropdown,
      private tmDropdown: TermDropdown,
      private schYearDropdown: SchoolYearDropdown,
      private expTypeDropdown: ExpenseTypeDropdown,
      private crGroupeCodeDropDown: CourseGroupeCodeDropDown,
      private changeDetectorRef: ChangeDetectorRef,
      private confirmationService: ConfirmationService
    ) {
    this.classDropdown = clsDropdown;
    this.teacherDropdown = tchDropdown;
    this.subjectDropdown = sbjDropdon;
    this.schoolYearDropdown = schYearDropdown;
    this.termDropdown = tmDropdown;
    this.expenseTypeDropdown = expTypeDropdown;
    this.courseGroupeCodeDropDown = crGroupeCodeDropDown;
  }
  ngOnDestroy() {
    this.courses = null;
    this.error = null;
    this.selectedCourse = null;
    this.course = null;
    this.cols = null;
    this.colsTimeSheetEntryDetail = null;
    this.startAndEndTime = null;
    this.isNewTimeSheetEntryDetail = true;
  }
  ngOnInit() {
    //this.manageTimeSheet.setTeacher(this.selectedUserT);

    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
    if (this.loggedInUser != null) {
      this.user = this.loggedInUser;
    }

    this.sessionTypes = [];
    this.sessionTypes.push({ label: 'Normale', value: '0' });
    this.sessionTypes.push({ label: 'Rattrapage', value: '1' });
    this.sessionTypes.push({ label: 'Rattrapage spécial', value: '2' });

    this.courses = [];
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }

    this.colsTimeSheetEntryDetail = [
      { field: 'startTime', header: 'Heures/Minutes Debut ', sortable: 'true', filter: 'true', style: { 'width': '30%' }, 'type' : 'Date'  },
      { field: 'endTime', header: 'Heures/Minutes Fin', sortable: 'false', filter: 'true', style: { 'width': '30%' }, 'type' : 'Date'  },
      { field: 'hours', header: 'Heures', sortable: 'false', filter: 'true', style: { 'width': '40%' }, 'type' : 'Double'  },
    ];

    if (this.lmd === 1) {
      if (this.user != null &&  (this.user.role === 1 || this.user.role === 8 || this.user.role === 9 || this.user.role === 10)) {
        this.cols = [
          { field: 'classe.name', header: Constants.CLASSE, sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field:'courseGroupeCode.name', header: Constants.TYPE_UE, sortable: 'false', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'maxMark', header: Constants.NOTE_SUR, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
          { field: 'credit', header: Constants.CREDIT, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
          { field: 'cost', header: Constants.COST, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
          { field: 'schoolYear.year', header: Constants.SCHOOL_YEAR, sortable: 'false', filter: 'true', style: { 'overflow': 'visible' } },
          { field: 'sessionTypeDesc', header: Constants.SESSION, type: 'string', sortable: 'true', style: { 'width': '10%', 'overflow': 'visible' } }
        ];
      } else {//this is teacher
        this.cols = [
          { field: 'classe.name', header: Constants.CLASSE, sortable: 'true', filter: 'true' },
          { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true' },
          { field: 'maxMark', header: Constants.NOTE_SUR, sortable: 'true', filter: 'true' },
          { field: 'credit', header: Constants.CREDIT, sortable: 'true', filter: 'true' },
          { field: 'cost', header: Constants.COST, sortable: 'true', filter: 'true' },
          { field: 'sessionTypeDesc', header: Constants.SESSION, type: 'string', sortable: 'true', style: { 'width': '10%', 'overflow': 'visible' } }

        ];
      }
    } else {
      if (this.user != null && (this.user.role === 1 || this.user.role === 8 || this.user.role === 9)) {
        this.cols = [
          { field: 'classe.name', header: Constants.CLASSE, sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'maxMark', header: Constants.NOTE_SUR, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
          { field: 'groupCode', header: Constants.GROUP_CODE, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
          { field:'courseGroupeCode.name', header: Constants.TYPE_UE, sortable: 'false', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } }
          ];
      } else {//this is teacher
        this.cols = [
          { field: 'classe.name', header: Constants.CLASSE, sortable: 'true', filter: 'true' },
          { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true' },
          { field: 'maxMark', header: Constants.NOTE_SUR, sortable: 'true', filter: 'true' },
          { field: 'groupCode', header: Constants.GROUP_CODE, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } }
        ];
      }

    }

    this.colregs = [
      { field: 'code', header: "Matricule", sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'studentName', header: "Nom", sortable: 'false', filter: 'true', style: { 'width': '25%', 'overflow': 'visible' } },
      { field: 'classe', header: "Classe", sortable: 'false', filter: 'true', style: { 'width': '12%', 'overflow': 'visible' } },
      { field: 'courseStatus', header: Constants.STATUS, sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'sessionTypeDesc', header: Constants.SESSION, sortable: 'true', filter: 'true', style: { 'width': '12%', 'overflow': 'visible' } }
    ];
  

  }

  minutesToHour(hourParameter){
    //console.log(hourParameter + "heures totales")
    var minutes = hourParameter * 60; //Convert hours to minutes
    var hours = Math.floor(minutes / 60);          
    var min = Math.round(minutes % 60);
    if(hours>0){
      return `${hours}h ${min}min`;
    }
    else{
      return `${min}min`;
    }
  }

  public printCourseFinance() {
    this.courseService.printCourseFinance(this.course).subscribe((data: string) => { this.reportName = data; },
      error => console.log(error),
      () => console.log('Get printCourseFinance'));
  }
  public getAll(): void {
    this.courses = [];
    this.courseService.getAll()
      .subscribe((data: Course[]) => {
        this.courses = data;
      },
        error => console.log(error),
        () => console.log('Get all Courses complete'));
  }

  public getCourseByTeacher(user: User): void {
    this.courses = [];
    this.courseService.getByTeacher(user)
      .subscribe((data: Course[]) => {
        this.courses = data
        //console.info("Courses: " + this.courses);
      },
        error => console.log(error),
        () => console.log('Get all Courses complete'));
  }

  showDialogToAdd() {
    if (this.user != null && (this.user.role === 1 || this.user.role === 8 || this.user.role === 9)) {
      this.newCourse = true;
      this.course = new Course();
      this.displayDialog = true;
    }
  }

  calculatePrice() {
    if (this.course.credit != null
      && this.course.creditUnitPrice != null) {
      this.course.cost = this.course.creditUnitPrice * this.course.credit;
    }
  }

  setCredit() {
    if (this.course.subject != null) {
      this.course.credit = this.course.subject.credit;
    }
  }

  setCreditUnitPrice() {
    if (this.course.classe.level != null) {
      this.course.creditUnitPrice = this.course.classe.level.creditUnitPrice;
    }
  }

  save() {
    try {
      this.error = '';
      if (this.course.teacher == null || this.course.subject == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.courseService.save(this.course)
          .subscribe(result => {
            if (result.id > 0) {
              this.course = result;
              this.putInTable();
            }
            else {
              this.error = Constants.saveFailed;
              this.displayDialog = true;
            }
          })
      }
      console.log(this.course);
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.courseService.delete(this.course)
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

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete();
      },
      reject: () => {
        
      }
    });
  }

  closeCourse() {
    try {
      this.msg = null;
      this.error = null;
      this.disabled = true;
      this.closeLabel = Constants.CLOSURE_IN_PROGRESS;
      this.course.modifiedBy = this.user.id;
      console.log(this.course);
      console.log(this.user);
      this.courseService.closeCourse(this.course)
        .subscribe(result => {
          if (result.startsWith("Echec")) {
            this.error = result;
          } else {
            this.msg = Constants.SUCCESSFUL_CLOSURE;
          }
          this.disabled = false;
          this.closeLabel = Constants.CLOSE_COURSE;
        })
    }
    catch (e) {
      console.log('Calc Month')
      this.disabled = false;
      this.closeLabel = Constants.CLOSE_COURSE;
    }
  }

  putInTable() {
    const onTheFly: Course[] = [];
    if (this.newCourse) {
      onTheFly.push(this.course);
    }
    else {
      this.courses[this.findSelectedIndex()] = this.course;
    }

    onTheFly.push(...this.courses);
    this.courses = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.courses.splice(this.findSelectedIndex(), 1);
    const onTheFly: Course[] = [];
    onTheFly.push(...this.courses);
    this.courses = onTheFly;
    this.resetData();
  }

  resetData() {
    this.course = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && (this.user.role === 1 || this.user.role === 8 || this.user.role === 9)) {
      this.newCourse = false;
      this.course = this.clone(evt.data);
      this.error = ''; this.msg = '';
      if (this.course.beginDate != null) {
        this.course.beginDate = new Date(this.course.beginDate);
      }
      if (this.course.endDate != null) {
        this.course.endDate = new Date(this.course.endDate);
      }
      if (this.course.dueDate != null) {
        this.course.dueDate = new Date(this.course.dueDate);
      }

      this.displayDialog = true;
    }
    console.log(this.course);
  }

  clone(e: Course): Course {
    const aCourse = new Course();
    for (const prop in e) {
      aCourse[prop] = e[prop];
    }
    return aCourse;
  }

  findSelectedIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

  public search() {
    this.courses = [];
    this.courseService.search((this.theSchoolYear == null ? 0 : this.theSchoolYear.id) + '|' + (this.theTerm == null ? 0 : this.theTerm.id) + '|' + this.searchText)
      .subscribe((data: Course[]) => {
        this.courses = data
      },
        error => console.log(error),
        () => console.log('Get courses for ' + this.searchText + ' complete'));
  }

  deleteExpense(expense: Expense) {
    try {
      this.error = '';
      this.msg = '';
      expense.course = this.course;
      this.courseService.deleteExpense(expense)
        .subscribe(result => {
          if (result) {
            this.expenses.splice(this.expenses.indexOf(expense), 1);
            const onTheFly: Expense[] = [];
            onTheFly.push(...this.expenses);
            this.expenses = onTheFly;
            this.msg = Constants.deleteSuccess;
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  saveExpense(expense: Expense) {
    try {
      this.error = '';
      this.msg = '';
      expense.course = this.course;
      if (expense.expenseType == null) {
        this.error = 'Choisissez un libele';
      } else if (expense.amount == null || !(expense.amount > 0)) {
        this.error = 'Entrez un montant valide';
      } else {
        this.courseService.saveExpense(expense).subscribe(result => {
          if (result.id > 0) {
            this.msg = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  addNewExpense() {
    const onTheFly: Expense[] = [];
    const exp = new Expense();
    onTheFly.push(...this.expenses);
    onTheFly.push(exp);
    this.expenses = onTheFly;
    console.log('Expenses:' + this.expenses);
  }

  /* Méthode appelée lorqu'une ligne du cours dans le tableau est déroulée */
  getExpenses(evt) {
    this.error = '';
    this.msg = '';
    this.course = this.clone(evt.data);
    this.course.expenses = [];

    /* Affichage des heures du cours effectuées */
    //this.manageTimeSheet.setTeacher(this.selectedUserT);
    //this.getTeacherTimeSheetEntries(this.course.teacher);

    this.getStudentsByCourse(this.course);

    this.getTeacherTimeSheetEntriesByCourse();

    console.log("Utilisateur connecté : " + this.user);

    this.courseService.getExpenses(this.course)
      .subscribe(result => {
        //this.course.expenses = result;
        this.expenses = result;
      }),
      error => console.log(error),
      () => console.log('get expense complete');



    this.subjectService.getPrerequisits(this.course.subject.id)
      .subscribe(result => {

        for (let i = 0; i < result.length; i++) {

          if (i > 0) {
            this.course.prereq += ", " + result[i].reqSubject.code;
          } else {
            this.course.prereq = result[i].reqSubject.code;
          }
        }

        evt.data.prereq = this.course.prereq;

      }),
      error => console.log(error),
      () => console.log('get prerequisits complete');
  }

  public manageTimeSheetOnCourse (data) {
      //this.manageTimeSheet.setTeacher(this.selectedUserT);

      this.course = data;
      console.log(this.course);

      this.onCourseSelected.emit(this.course);
      //this.manageTimeSheetBoolean = true;
  }

  /* TeacherTimeSheet */

  public getTeacherTimeSheetEntries(teacher: Teacher) {
    console.log(this.course.id);
    this.timeTrackingService.getTeacherTimeSheetEntries(teacher.id)
      .subscribe((data2: TimeSheetEntryGroup[]) => {
        this.timeSheetEntryGroups = data2;
        console.log(this.timeSheetEntryGroups);
      },
        error => console.log(error),
        () => console.log('Get all time sheets complete'));
  }

  public getTeacherTimeSheetEntriesByCourse() {
    this.timeTrackingService.getTeacherTimeSheetEntriesByCourse(this.course.id)
      .subscribe((data2: TimeSheetEntryGroup[]) => {
        this.timeSheetEntryGroups = data2;
        // console.log('timeSheetEntryGroups ',this.timeSheetEntryGroups);
      },
        error => console.log(error),
        () => console.log('Get all time sheets complete'));
  }

  public getTimeSheetEntryDetails(evt) {
    //this.error = '';
    //this.msg = '';
    this.timeSheetEntryGroup = evt.data;

    console.log(this.timeSheetEntryGroup);

    if(this.timeSheetEntryGroup.approver != null && this.timeSheetEntryGroup.approver.id == 0) {
      this.timeSheetEntryGroup.approver = null;
    }
    if(this.timeSheetEntryGroup.approverDCMC != null && this.timeSheetEntryGroup.approverDCMC.id == 0) {
      this.timeSheetEntryGroup.approverDCMC = null;
    }
    if(this.timeSheetEntryGroup.approverSG != null && this.timeSheetEntryGroup.approverSG.id == 0) {
      this.timeSheetEntryGroup.approverSG = null;
    }

    this.timeSheetEntryGroup.timeSheetEntries = [];
    this.timeTrackingService.getTimeSheetEntryDetailsDtoByCourse(this.timeSheetEntryGroup)
      .subscribe(result => {
        this.timeSheetEntryGroup.timeSheetEntries = result;
        console.log(this.timeSheetEntryGroup.timeSheetEntries)

        this.timeSheetEntryGroup.cols = [];
        for (var i = 1; i <= 7; i++) {
          let myDate = this.addDays(new Date(this.timeSheetEntryGroup.timeSheetPeriod.startDate), i - 1);
          this.timeSheetEntryGroup.cols.push({ field: 'detail' + i, header: myDate, style: { 'width': '15%' } });
        }
        this.calculateAllTotalHours();

      }),
      error => console.log(error),
      () => console.log('get expense complete');
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  calculateAllTotalHours() {
    this.timeSheetEntryGroup.hours = 0;
    for (let i in this.timeSheetEntryGroup.timeSheetEntries) {
      this.timeSheetEntryGroup.hours += this.calculateTotalHours(this.timeSheetEntryGroup.timeSheetEntries[i]);
    }
  }

  calculateTotalHours(data) {
   
    data.totalHours = +this.getNumber(data.detail1.hours) + +this.getNumber(data.detail2.hours)
      + +this.getNumber(data.detail3.hours) + +this.getNumber(data.detail4.hours)
      + +this.getNumber(data.detail5.hours) + +this.getNumber(data.detail6.hours)
      + +this.getNumber(data.detail7.hours)

    return data.totalHours;

  }

  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  }

  saveTimeSheetEntryGroup(timeSheetEntryGroup: TimeSheetEntryGroup) {
    this.msgs = [];
    this.saving = true;
    try {

      if(this.timeSheetEntryGroup.approver != null && this.timeSheetEntryGroup.approver.id == 0) {
        this.timeSheetEntryGroup.approver = null;
      }
      if(this.timeSheetEntryGroup.approverDCMC != null && this.timeSheetEntryGroup.approverDCMC.id == 0) {
        this.timeSheetEntryGroup.approverDCMC = null;
      }
      if(this.timeSheetEntryGroup.approverSG != null && this.timeSheetEntryGroup.approverSG.id == 0) {
        this.timeSheetEntryGroup.approverSG = null;
      }


      timeSheetEntryGroup.courseId = this.course.id;
      timeSheetEntryGroup.teacherId = this.course.teacher.id;
      console.log(timeSheetEntryGroup);
      //alert(timeSheetEntryGroup.comments)
      this.timeTrackingService.save(timeSheetEntryGroup)
        .subscribe(result => {
          console.log(result);

            this.timeSheetEntryGroup = result;
            this.putInTimeSheetEntryTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });

          this.saving = false;
        })
    }
    catch (e) {
      console.log(e);
      this.saving = false;
    }
    this.saving = false;
  }

  deleteTimeSheetEntryGroup(timeSheetEntryGroup) {
    try {
      this.msgs = [];
      this.timeTrackingService.deleteTimeSheetEntry(timeSheetEntryGroup.id)
        .subscribe(result => {
          if (result.timeSheetPeriod) {
            this.timeSheetEntryGroup = result;
            this.putInTimeSheetEntryTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.deleteSuccess });
          }
          else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.deleteFailed });
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  approveTimeSheetEntryGroup(timeSheetEntryGroup) {
    try {
      this.msgs = [];

      if(this.timeSheetEntryGroup.approver != null && this.timeSheetEntryGroup.approver.id == 0) {
        this.timeSheetEntryGroup.approver = null;
      }
      if(this.timeSheetEntryGroup.approverDCMC != null && this.timeSheetEntryGroup.approverDCMC.id == 0) {
        this.timeSheetEntryGroup.approverDCMC = null;
      }
      if(this.timeSheetEntryGroup.approverSG != null && this.timeSheetEntryGroup.approverSG.id == 0) {
        this.timeSheetEntryGroup.approverSG = null;
      }

      let timeSheetStatus = new TimeSheetStatus();
      timeSheetStatus.id = 2;

      //timeSheetEntryGroup.approver = this.user;
      if(this.user.role == 8) { //DEP
        timeSheetEntryGroup.approver = this.user;
        timeSheetEntryGroup.timeSheetStatus = timeSheetStatus;
      } else if(this.user.role == 9) { //DCMC
        timeSheetEntryGroup.approverDCMC = this.user;
        timeSheetEntryGroup.timeSheetStatusDCMC = timeSheetStatus;
      } else if(this.user.role == 10) { //SG
        timeSheetEntryGroup.approverSG = this.user;
        timeSheetEntryGroup.timeSheetStatusSG = timeSheetStatus;
      }

      console.log(timeSheetEntryGroup);

      this.timeTrackingService.approve(timeSheetEntryGroup)
        .subscribe(result => {

            this.timeSheetEntryGroup = result;
            this.putInTimeSheetEntryTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });

        })

      /*
      if(this.user.role == 8) { //DEP
        timeSheetEntryGroup.approver = this.user;
        this.timeTrackingService.approve(timeSheetEntryGroup)
          .subscribe(result => {
            if (result.id > 0) {
              this.timeSheetEntryGroup = result;
              this.putInTimeSheetEntryTable();
              this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
            }
            else {
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
            }
          })
      } else if(this.user.role == 9) { //DCMC
        timeSheetEntryGroup.approverDCMC = this.user;
        this.timeTrackingService.approveByDCMC(timeSheetEntryGroup)
          .subscribe(result => {
            if (result.id > 0) {
              this.timeSheetEntryGroup = result;
              this.putInTimeSheetEntryTable();
              this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
            }
            else {
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
            }
          })
      } else if(this.user.role == 10) { //SG
        timeSheetEntryGroup.approverSG = this.user;
        this.timeTrackingService.approveBySG(timeSheetEntryGroup)
          .subscribe(result => {
            if (result.id > 0) {
              this.timeSheetEntryGroup = result;
              this.putInTimeSheetEntryTable();
              this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
            }
            else {
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
            }
          })
      }
      */
    }
    catch (e) {
      console.log(e);
    }
  }

  rejectTimeSheetEntryGroup(timeSheetEntryGroup) {
    try {
      this.msgs = [];

      if(this.timeSheetEntryGroup.approver != null && this.timeSheetEntryGroup.approver.id == 0) {
        this.timeSheetEntryGroup.approver = null;
      }
      if(this.timeSheetEntryGroup.approverDCMC != null && this.timeSheetEntryGroup.approverDCMC.id == 0) {
        this.timeSheetEntryGroup.approverDCMC = null;
      }
      if(this.timeSheetEntryGroup.approverSG != null && this.timeSheetEntryGroup.approverSG.id == 0) {
        this.timeSheetEntryGroup.approverSG = null;
      }

      let timeSheetStatus = new TimeSheetStatus();
      timeSheetStatus.id = 3;

      //timeSheetEntryGroup.approver = this.user;

      if(this.user.role == 8) { //DEP
        timeSheetEntryGroup.approver = this.user;
        timeSheetEntryGroup.timeSheetStatus = timeSheetStatus;
      } else if(this.user.role == 9) { //DCMC
        timeSheetEntryGroup.approverDCMC = this.user;
        timeSheetEntryGroup.timeSheetStatusDCMC = timeSheetStatus;
      } else if(this.user.role == 10) { //SG
        timeSheetEntryGroup.approverSG = this.user;
        timeSheetEntryGroup.timeSheetStatusSG = timeSheetStatus;
      }

      console.log(timeSheetEntryGroup);

      this.timeTrackingService.reject(timeSheetEntryGroup)
        .subscribe(result => {

            this.timeSheetEntryGroup = result;
            this.putInTimeSheetEntryTable();
            this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });

        })

      /*
      if(this.user.role == 8) { //DEP
        timeSheetEntryGroup.approver = this.user;
        this.timeTrackingService.reject(timeSheetEntryGroup)
          .subscribe(result => {
            if (result.id > 0) {
              this.timeSheetEntryGroup = result;
              this.putInTimeSheetEntryTable();
              this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
            }
            else {
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
            }
          })
      } else if(this.user.role == 9) { //DCMC
        timeSheetEntryGroup.approverDCMC = this.user;
        this.timeTrackingService.rejectByDCMC(timeSheetEntryGroup)
          .subscribe(result => {
            if (result.id > 0) {
              this.timeSheetEntryGroup = result;
              this.putInTimeSheetEntryTable();
              this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
            }
            else {
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
            }
          })
      } else if(this.user.role == 10) { //SG
        timeSheetEntryGroup.approverSG = this.user;
        this.timeTrackingService.rejectBySG(timeSheetEntryGroup)
          .subscribe(result => {
            if (result.id > 0) {
              this.timeSheetEntryGroup = result;
              this.putInTimeSheetEntryTable();
              this.msgs.push({ severity: 'success', summary: 'Success', detail: Constants.saveSuccess });
            }
            else {
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: Constants.saveFailed });
            }
          })
      }
      */
    }
    catch (e) {
      console.log(e);
    }
  }

  findSelectedTimeSheetEntryIndex(): number {
    return this.timeSheetEntryGroups.indexOf(this.timeSheetEntryGroup);
  }

  putInTimeSheetEntryTable() {

    for (let i in this.timeSheetEntryGroups) {
      if (this.timeSheetEntryGroups[i].timeSheetPeriod.startDate == this.timeSheetEntryGroup.timeSheetPeriod.startDate
        && this.timeSheetEntryGroups[i].timeSheetPeriod.endDate == this.timeSheetEntryGroup.timeSheetPeriod.endDate) {
        this.timeSheetEntryGroups.pop();
        break;
      }
    }

    this.timeSheetEntryGroups.push(this.timeSheetEntryGroup);

    var onTheFly: TimeSheetEntryGroup[] = [];
    onTheFly.push(...this.timeSheetEntryGroups);
    this.timeSheetEntryGroups = onTheFly;
  }





  /*
  Manage the save of the interventions hours / time sheet entry detail
  */
  startAndEndTime: StartAndEndTime = null;
  public hours: SelectItem[];
  public minutes: SelectItem[];

  hoursMinutesConfiguration(){
    this.hours = [];
    this.minutes = [];
    for(var i=0; i < 24; i++){
      if(i < 10){
        this.hours.push({label: "0"+i, value: i});
      }else{
        this.hours.push({label: i+"", value: i});
      }
    }
    for(var i=0; i < 60; i++){
      if(i < 10){
        this.minutes.push({label: "0"+i, value: i});
      }else{
        this.minutes.push({label: i+"", value: i});
      }
    }
  }
  setTimeSheetDateTodetail(detail: TimeSheetEntryDetail, theDay: Date){
    this.startAndEndTime = new StartAndEndTime();
    this.timeSheetEntryDetail = detail;
    
    if(!this.timeSheetEntryDetail.timeSheetEntry){
      this.timeSheetEntryDetail.timeSheetEntry = new TimeSheetEntry();
    }
    if(this.timeSheetEntryDetail.timeSheetEntry && !this.timeSheetEntryDetail.timeSheetEntry.course){
      this.timeSheetEntryDetail.timeSheetEntry.course = this.course;
    }

    if(!this.timeSheetEntryDetail.timeSheetDate){
      this.timeSheetEntryDetail.timeSheetDate =  new Date(
        String(theDay).split("/")[1] + "/" +
        String(theDay).split("/")[0] +  "/" +
        String(theDay).split("/")[2]
      );
    }
    
  }
  getDateOfTimeSheetEntryDetail(){
    return this.timeSheetEntryDetail ? this.timeSheetEntryDetail.timeSheetDate : new Date();
  }

  //Begin - Add time sheet entry detail
  showDialogAddTimeSheetEntryDetail(detail: TimeSheetEntryDetail, theDay: Date){
    console.log(detail);
    console.log(theDay);
    this.hoursMinutesConfiguration();
    this.displayDialogAddTimeSheetEntryDetail = true;
    this.isNewTimeSheetEntryDetail = true;
    this.setTimeSheetDateTodetail(detail, theDay);
  }
  saveTimeSheetEntryDetail(){
    if(this.startAndEndTime){

      this.timeSheetEntryDetail.startTime = new Date(this.timeSheetEntryDetail.timeSheetDate);
      this.timeSheetEntryDetail.startTime.setHours(this.startAndEndTime.startHours);
      this.timeSheetEntryDetail.startTime.setMinutes(this.startAndEndTime.startMinutes);

      this.timeSheetEntryDetail.endTime = new Date(this.timeSheetEntryDetail.timeSheetDate);
      this.timeSheetEntryDetail.endTime.setHours(this.startAndEndTime.endHours);
      this.timeSheetEntryDetail.endTime.setMinutes(this.startAndEndTime.endMinutes);
      
      this.timeTrackingService.saveTimeSheetEntryDetailsByCourseAndTimeSheetEntryDetail(
        this.timeSheetEntryDetail
      ).subscribe(res =>{
        location.reload();
        console.log(res)
      } );
      }
  }

  editTimeSheetEntryDetail(){
    if(this.startAndEndTime){

      this.timeSheetEntryDetail.startTime = new Date(this.timeSheetEntryDetail.timeSheetDate);
      this.timeSheetEntryDetail.startTime.setHours(this.startAndEndTime.startHours);
      this.timeSheetEntryDetail.startTime.setMinutes(this.startAndEndTime.startMinutes);

      this.timeSheetEntryDetail.endTime = new Date(this.timeSheetEntryDetail.timeSheetDate);
      this.timeSheetEntryDetail.endTime.setHours(this.startAndEndTime.endHours);
      this.timeSheetEntryDetail.endTime.setMinutes(this.startAndEndTime.endMinutes);
      
      this.timeTrackingService.editTimeSheetEntryDetailsByTimeSheetEntryDetail(
        this.timeSheetEntryDetail
      ).subscribe(res =>{
        
        // this.timeSheetEntryDetails = this.timeSheetEntryDetails.filter((item) => item.id !== this.timeSheetEntryDetail.id);
        res.forEach((elt) => {
          if(this.timeSheetEntryDetails.find((item) => item.id === elt.id)){
              this.timeSheetEntryDetail.hours = elt.hours;
              this.putInTableTimeSheetEntryDetail();
          }
        });
        // this.putInTableTimeSheetEntryDetail();
      } );
      }
  }
  //End - Add time sheet entry detail
  

  //Begin - Modify time sheet entry detail
  showDialogListTimeSheetEntryDetail(detail: TimeSheetEntryDetail, theDay: Date){
    this.isNewTimeSheetEntryDetail = false;
    this.setTimeSheetDateTodetail(detail, theDay);
    this.timeTrackingService.getAllTimeSheetEntryDetailsCourseClassOfTeacherByTimeSheetEntryDetail(
      this.timeSheetEntryDetail
    ).subscribe(res =>{
      this.displayDialogListTimeSheetEntryDetail = true;
      this.timeSheetEntryDetails = res;
    } );
  }
  //End - Modify time sheet entry detail

  


  public selectedTimeSheetEntryDetail: TimeSheetEntryDetail;
  deleteTimeSheetEntryDetail() {
    try {
      this.error = '';
      this.timeTrackingService.deleteTimeSheetEntryDetailsByTimeSheetEntryDetail(this.timeSheetEntryDetail)
        .subscribe(result => {
          if (result) {
            this.removeFromTableTimeSheetEntryDetail();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialogListTimeSheetEntryDetail = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTableTimeSheetEntryDetail() {
    this.timeSheetEntryDetails[this.findSelectedIndexTimeSheetEntryDetail()] = this.timeSheetEntryDetail;

    var onTheFly: TimeSheetEntryDetail[] = [];
    onTheFly.push(...this.timeSheetEntryDetails);
    this.timeSheetEntryDetails = onTheFly;

    this.resetDataTimeSheetEntryDetail();
  }

  removeFromTableTimeSheetEntryDetail() {
    this.timeSheetEntryDetails.splice(this.findSelectedIndexTimeSheetEntryDetail(), 1);
    var onTheFly: TimeSheetEntryDetail[] = [];
    onTheFly.push(...this.timeSheetEntryDetails);
    this.timeSheetEntryDetails = onTheFly;
    this.resetDataTimeSheetEntryDetail();
  }

  resetDataTimeSheetEntryDetail() {
    this.timeSheetEntryDetail = null;
    this.displayDialogAddTimeSheetEntryDetail = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelectTimeSheetEntryDetail(evt) {
    this.timeSheetEntryDetail = this.cloneTimeSheetEntryDetail(evt.data);
    this.hoursMinutesConfiguration();
    this.setTimeSheetDateTodetail(this.timeSheetEntryDetail, this.timeSheetEntryDetail.timeSheetDate);
    this.displayDialogAddTimeSheetEntryDetail = true;
    this.startAndEndTime = new StartAndEndTime();
    this.startAndEndTime.startHours = (new Date(this.timeSheetEntryDetail.startTime)).getHours();
    this.startAndEndTime.startMinutes = (new Date(this.timeSheetEntryDetail.startTime)).getMinutes();
    this.startAndEndTime.endHours = (new Date(this.timeSheetEntryDetail.endTime)).getHours();
    this.startAndEndTime.endMinutes = (new Date(this.timeSheetEntryDetail.endTime)).getMinutes();
  }

  cloneTimeSheetEntryDetail(e: TimeSheetEntryDetail): TimeSheetEntryDetail {
    let areception = new TimeSheetEntryDetail();
    for (let prop in e) {
      areception[prop] = e[prop];
    }
    return areception;
  }

  findSelectedIndexTimeSheetEntryDetail(): number {
    return this.timeSheetEntryDetails.indexOf(this.selectedTimeSheetEntryDetail);
  }


    getStudentsByCourse(cours: Course) {
      this.courseService.getStudentsByCourse(cours)
        .subscribe((data: CourseView[]) => {
          this.registeredStudents = data;
          // console.log(this.registeredStudents, "+++++++++++++++");
        },
          error => console.log(error),
          () => console.log('Get registeredStudents for ' + cours.id + ' complete'));
    }

    remove(cv: CourseView) {
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
    // console.log(reg,"-------------");
    if (cv.status >= 3) {
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas supprimer un cours dont l\'etat est: ' + cv.courseStatus });
    } else {
      this.courseService.remove(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            this.registeredStudents.splice(this.registeredStudents.indexOf(cv), 1);
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredStudents);
            this.registeredStudents = onTheFly;
            this.msgs.push({ severity: 'success', summary: 'Success', detail: data });
          } else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data });
          }

        },
          error => console.log(error),
          () => console.log('remove course ' + reg + ' complete'));
    }
  }
  
}
