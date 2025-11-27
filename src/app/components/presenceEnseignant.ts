import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild
  , Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/course';
import { User } from '../models/User';
import { Expense } from '../models/expense';
import { CourseService } from '../services/course.service';
import {StudentService} from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import { Constants } from '../app.constants';
import { SchoolYear } from '../models/schoolYear';
import { Term } from '../models/term';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ClassDropdown } from './dropdowns/dropdown.class';
import {Class} from '../models/class';
import { TeacherDropdown } from './dropdowns/dropdown.teacher';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { DataTableModule, DialogModule, SelectItem, Message } from 'primeng/primeng';
import {DropdownModule} from 'primeng/dropdown';
import { TermDropdown } from './dropdowns/dropdown.term';
import { ExpenseTypeDropdown } from './dropdowns/dropdown.expenseType';
import { CourseGroupeCodeDropDown } from './dropdowns/dropdown.courseGroupeCode';

import { ManageTimeSheet } from './manageTimeSheet';
import { Teacher } from '../models/teacher';
import { TimeSheetStatus } from '../models/timeSheetStatus';
import { TimeSheetService } from '../services/timeSheet.service';
import { TimeSheetEntryGroup } from "../models/timeSheetEntryGroup";
import {UserDropdown} from './dropdowns/dropdown.user';

import { GrhHourlyCost } from './grh/grhHourlyCost';
import { AdminCycle } from './adminCycle';
import { SearchText } from 'app/models/searchText';
import { UserSubjectView } from 'app/models/userSubjectView';
import {UserService} from "../services";
import {CycleService} from "../services/cycle.service";
import { UserOnlineRegistrationView } from 'app/models/userOlineRegistrationView';
import {AnyView} from 'app/models/anyView';
import {RadioButtonModule} from 'primeng/radiobutton';
import {OnlineRegistration} from '../models/onlineRegistration';
import {Parentview} from '../models/parentview';
import {TimeTable} from '../models/timeTable';
import {TimePeriod} from '../models/timePeriod';
import {TimeTableService} from '../services/timeTable.service';
import {BaseService} from '../services/base.service';
import {TeacherService} from '../services/teacher.service';

@Component({
selector: 'app-presence-enseignant',
templateUrl: '../pages/presenceEnseignant.html',
providers: [BaseService, CycleService, SubjectService, TimeSheetService, Constants,UserService,
ClassDropdown, TermDropdown, TeacherDropdown,TeacherService,
SubjectDropdown, StudentService, SchoolYearDropdown, CourseGroupeCodeDropDown, UserDropdown, TimeTableService]
})

export class PresenceEnseignant implements OnInit, OnDestroy {
sessionTypes: SelectItem[];
public courses: Course[];
public error: String = '';
public selectedCourse: Course;
displayDialogProspect: boolean;
displayDialog: boolean;
course: Course = new Course();
expenses: Expense[];
userSubjectViews: UserSubjectView[];
userSubjectView: UserSubjectView = new UserSubjectView();
newCourse: boolean;
cols: any[];
parentCols: any[];
colsodia: any[];
public user: User = null;
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
theClass: Class;
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
parentview: Parentview[]=[];
saving = false;
manageTimeSheetBoolean : boolean = false;
APPROVE_LABEL: string = Constants.APPROVE_LABEL;
REJECT_LABEL: string = Constants.REJECT_LABEL;
@Output() onCourseSelected = new EventEmitter<Course>();
@Output() onUserSelected = new EventEmitter<User>();
userOnlineRegistrationViews: UserOnlineRegistrationView[];
public userDropdown: UserDropdown;
searchTextObject: SearchText = new SearchText();

anyViews: AnyView[];
levelsBySchooyear: AnyView[];
prospects: AnyView[];
USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
public timePeriods: SelectItem[];
public selectedItem: SelectItem;
timeTable: TimeTable;
timePeriodId : string;
anyView: AnyView = new AnyView();
public onlineRegistration: OnlineRegistration;
public currentUser: User;
public searchInfo: string ='';
selectedValue: number;
optionDate: Date = new Date();
constructor
(
  private baseService: BaseService,
  private teacherService: TeacherService
) {

}
ngOnDestroy() {
 
  this.timeTable = null;
}
ngOnInit() {
  this.timeTable = new TimeTable();
  this.timeTable.timePeriod = new TimePeriod();
this.currentUser = JSON.parse(atob(Cookie.get('user')));
this.timePeriods = this.baseService.getTimePeriodsDropDown();
if (this.currentUser == null) {
this.currentUser = new User();
}

if(this.currentUser.role==14){
this.cols = [
  { field: 'string1', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
  { field: 'string2', header: 'Prenom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
  //{ field: 'string3', header: 'Mail', sortable: 'true', filter: 'true', style: { 'width': '19%', 'overflow': 'visible' } },
  { field: 'string4', header: 'Sexe', sortable: 'true', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
  { field: 'string5', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
  //{ field: 'status1', header: 'Présence', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
];
this.parentCols = [
  {field: 'lastName', header: Constants.NAME, sortable: 'true'},
  {field: 'firstName', header: Constants.PRENOM, sortable: 'true'},
  {field: 'eMail', header: Constants.EMAIL, sortable: 'false'},
  {field: 'sex', header: Constants.SEX, sortable: 'false'},
  {field: 'phone', header: Constants.PHONE, sortable: 'true'}
];
}else{
this.cols = [
  { field: 'string1', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
  { field: 'string2', header: 'Prenom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
  { field: 'string3', header: 'Mail', sortable: 'true', filter: 'true', style: { 'width': '19%', 'overflow': 'visible' } },
  { field: 'string4', header: 'Sexe', sortable: 'true', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
  { field: 'string5', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
];
}

this.anyView.id1 = 2;
this.anyView.date1 = new Date();
this.search();

}


public search() {
  this.anyViews = [];
  this.msgs = [];
  this.searchInfo = '';

  this.anyView.date1 = new Date(this.anyView.date1);
  
  console.log(this.anyView);
 

this.teacherService.getAllTeacherHaveCourseToday(this.anyView).subscribe(
  result =>{
      this.anyViews = result;
      console.log(this.anyViews);
  },
  (err)=>{
    console.log(err.message);
  }
)

}



onRowSelect(evt) {
  //this.newUser = false;
  this.user = this.clone(evt.data);
  this.user.id = evt.data.id1;
 this.displayDialog = true;
  this.onUserSelected.emit(this.user);
  console.log("user Selected");
  console.log(this.user);
}
clone(e: User): User {
  let aUser = new User();
  for (let prop in e) {
    aUser[prop] = e[prop];
  }
  return aUser;
}
}
