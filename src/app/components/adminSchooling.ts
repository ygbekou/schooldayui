import {Component, Input, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Schooling} from '../models/schooling';
import {SchoolingView} from '../models/schoolingView';
import {User} from '../models/User';
import {Teacher} from '../models/teacher';
import {Student} from '../models/student';
import {EventType} from '../models/eventType';
import {SchoolingService} from '../services/schooling.service';
import {BaseService} from '../services/base.service';
import {StudentService} from '../services/student.service';
import {TeacherDropdown} from './dropdowns/dropdown.teacher';
import {EventTypeDropdown} from './dropdowns/dropdown.eventType';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {Constants} from '../app.constants';
import { TimePeriod } from '../models/timePeriod';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, DialogModule, InputTextareaModule, SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-admin-schooling',
  templateUrl: '../pages/adminSchooling.html',
  providers: [TeacherDropdown, EventTypeDropdown, SchoolYearDropdown]
})
export class AdminSchooling implements OnInit {

  public schoolings: SchoolingView[] = [];
  public error: String = '';
  public selectedSchooling: SchoolingView = new SchoolingView();
  displayDialog: boolean;
  schooling: Schooling = new Schooling();
  newSchooling: boolean;
  public timePeriods: SelectItem[];
  cols: any[];
  private user: User;
  private student: Student;
  public teacherDropdown: TeacherDropdown;
  public eventTypeDropdown: EventTypeDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  VIOLATION: string = Constants.VIOLATION;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  SEND_EMAIL: string = Constants.SEND_EMAIL;
  SEND_SMS: string = Constants.SEND_SMS;
  private role: string;
  @Input('user') aUser: User;

  constructor
    (
    private schoolingService: SchoolingService,
    private studentService: StudentService,
    private baseService: BaseService,
    private tchDropdown: TeacherDropdown,
    private evtTypeDropdown: EventTypeDropdown,
    private schYearDropdown: SchoolYearDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.teacherDropdown = tchDropdown;
    this.eventTypeDropdown = evtTypeDropdown;
    this.schoolYearDropdown = schYearDropdown;
  }

  ngOnInit() {
    
    if (this.schooling.eventType == null) {
      //this.schooling.eventType = new EventType();
      this.schooling.student = new Student();
      this.schooling.timePeriod= new TimePeriod();
      this.schooling.student.user = new User();
      this.schooling.student.user.id = this.studentService.selectedStudentUserId;
      this.schooling.teacher = new Teacher();
    }

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

    if (this.currentUser.role == 3) {
      this.getUserSchoolings(this.currentUser);
      this.cols = [
        {field: 'eventDate', header: Constants.DATE, type: 'Date', sortable: 'true'},
        {field: 'eventType', header: Constants.VIOLATION, sortable: 'true'},
        {field: 'description', header: Constants.COMMENT, sortable: 'false', filter: 'true'},
        {field: 'year', header: Constants.SCHOOLYEAR, sortable: 'false', filter: 'true'}
      ];
    } else {
      this.cols = [
        {field: 'eventDate', header: Constants.DATE, type: 'Date', sortable: 'true'},
        {field: 'eventType', header: Constants.VIOLATION, sortable: 'true'},
        {field: 'userName', header: Constants.STUDENT, sortable: 'false', filter: 'true'},
        {field: 'description', header: Constants.COMMENT, sortable: 'false', filter: 'true'},
        {field: 'year', header: Constants.SCHOOLYEAR, sortable: 'false', filter: 'true'}
      ];
    }
    this.timePeriods = this.baseService.getTimePeriodsDropDown();
  }

  getAll(){
  }
  public getUserSchoolings(user: User) {
    this.schoolings = [];
    this.schoolingService.getByStudent(user.id)
      .subscribe((data: SchoolingView[]) => {
        this.schoolings = data
        console.info("Schoolings: " + this.schoolings);
      },
      error => console.log(error),
      () => console.log('Get all Schoolings complete'));
  }

  public setStudent(user: User) {
    this.user = user;
    this.role = "student";
  }

  public getSchoolingByStudent(): void {
    this.schoolings = [];
    console.log("student id"+this.studentService.selectedStudentUserId);
    this.schoolingService.getByStudent(this.studentService.selectedStudentUserId)
      .subscribe((data: SchoolingView[]) => {
        this.schoolings = data
        console.info("Schoolings: " + this.schoolings);
      },
      error => console.log(error),
      () => console.log('Get all Schoolings complete'));
  }

  public getSchoolingByStudentcpe(user:User): void {
    this.schoolings = [];
    console.log("student id"+this.studentService.selectedStudentUserId);
    this.schoolingService.getByStudent(user.id)
      .subscribe((data: SchoolingView[]) => {
        this.schoolings = data
        console.info("Schoolings: " + this.schoolings);
      },
      error => console.log(error),
      () => console.log('Get all Schoolings complete'));
  }

  showDialogToAdd() {

    if (this.currentUser.role <= 2||this.currentUser.role == 5||this.currentUser.role == 14) {
      this.newSchooling = true;
      this.schooling = new Schooling();
      //this.schooling.eventType = new EventType();
      this.schooling.student = new Student();
      this.schooling.teacher = new Teacher();
      this.schooling.timePeriod = new TimePeriod();
      this.schooling.student.user = new User();
      this.schooling.student.user.id = this.studentService.selectedStudentUserId;
      this.displayDialog = true;
    }
  }

  save() {
    try {
      this.error = '';
      if (this.role == 'student') {
        this.schooling.eventDate = new Date();
      }
      this.schooling.modifiedBy=this.currentUser.id;
      this.schoolingService.save(this.schooling)
        .subscribe(result => {
          if (result.id > 0) {
            this.schooling = result;
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
      this.schoolingService.delete(this.schooling)
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
    if (this.newSchooling)
      this.schoolings.push(this.transform());
    else
      this.schoolings[this.findSelectedIndex()] = this.transform();

    var onTheFly: SchoolingView[] = [];
    onTheFly.push(...this.schoolings);
    this.schoolings = onTheFly;

    this.resetData();
  }

  transform(): SchoolingView {
    let schoolingView = new SchoolingView();
    schoolingView.id = this.schooling.id;
    schoolingView.userName = this.schooling.student.user.lastName + ' ' + this.schooling.student.user.firstName;
    schoolingView.description = this.schooling.description;
    schoolingView.eventDate = this.schooling.eventDate;
    schoolingView.eventType = this.schooling.eventType.name;
    if (this.schooling.term != null)
      schoolingView.term = this.schooling.term.name;

    if (this.schooling.schoolYear != null)
      schoolingView.year = this.schooling.schoolYear.year;

    return schoolingView;
  }

  removeFromTable() {
    this.schoolings.splice(this.findSelectedIndex(), 1);
    var onTheFly: SchoolingView[] = [];
    onTheFly.push(...this.schoolings);
    this.schoolings = onTheFly;
    this.resetData();
  }

  resetData() {
    this.schooling = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newSchooling = false;
    this.schooling = this.clone(evt.data);
    this.schoolingService.getById(this.schooling.id)
      .subscribe((data: Schooling) => {

        this.schooling = data
        if (this.schooling && this.schooling !== undefined && this.schooling.eventDate !== null) {
          this.schooling.eventDate = new Date(this.schooling.eventDate);
        }
      },
      error => console.log(error),
      () => console.log('Get schooling complete'));
    if (this.currentUser.role == 1||this.currentUser.role == 5) {
      this.displayDialog = true;
    }
  }

  clone(e: Schooling): Schooling {
    let aSchooling = new Schooling();
    for (let prop in e) {
      aSchooling[prop] = e[prop];
    }
    return aSchooling;
  }

  findSelectedIndex(): number {
    return this.schoolings.indexOf(this.selectedSchooling);
  }
}
