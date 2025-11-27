import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild
          , Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../models/course';
import { User } from '../models/User';
import { Expense } from '../models/expense';
import { CourseService } from '../services/course.service';
import {StudentService} from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import {CicoService} from '../services/cico.service';
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

@Component({
  selector: 'app-admin-kiosk',
  templateUrl: '../pages/adminKiosk.html',
  providers: [CycleService, SubjectService, TimeSheetService, Constants,UserService,
    ClassDropdown, TermDropdown, TeacherDropdown,
    SubjectDropdown, StudentService, SchoolYearDropdown, CourseGroupeCodeDropDown, UserDropdown, CicoService]
})

export class AdminKiosk implements OnInit, OnDestroy {
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
  colso: any[];
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
  saving = false;
  manageTimeSheetBoolean : boolean = false;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;
  @Output() onCourseSelected = new EventEmitter<Course>();

 userOnlineRegistrationViews: UserOnlineRegistrationView[];
   public userDropdown: UserDropdown;
   searchTextObject: SearchText = new SearchText();

  anyViews: AnyView[];
  levelsBySchooyear: AnyView[];
  prospects: AnyView[];
  anyView: AnyView = new AnyView();
    public onlineRegistration: OnlineRegistration;
  public currentUser: User;
  public selectedSource: string ='';
  constructor
    (
      private clsDropdown: ClassDropdown,
      private schYearDropdown: SchoolYearDropdown,
      private studentService: StudentService,
      private cicoService: CicoService
    ) {
     this.schoolYearDropdown = schYearDropdown;
     this.classDropdown = clsDropdown;
  }
  ngOnDestroy() {
   
  }
  ngOnInit() {
     this.currentUser = JSON.parse(atob(Cookie.get('user')));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }


        this.cols = [
          { field: 'string1', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field: 'string2', header: 'Prenom', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field: 'string3', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field: 'date1', header: 'Arrivee', sortable: 'true',type: 'Date', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field: 'date2', header: 'Depart', sortable: 'true',type: 'Date', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
        ];

   
    }


  public search() {
     
      this.cicoService.adminKiosk().subscribe(
            result =>{
                this.anyViews = result;
            }
        )
  }

// getLevelsBySchoolyearAndCycle(evt){
//   this.anyView.id2 = evt.data.id1;
//    this.anyView.id1 = evt.data.id2;
//    this.anyView.flag = '';
//    console.log(this.anyView);
//   this.cycleService.getLevelsBySchoolyearAndCycle(this.anyView).subscribe(
//     result => {
//       this.levelsBySchooyear = result;

//     }
//   );
// }

// getLevelsBySchoolyearAndCycleFromScoolday(){
//   console.log(this.anyView);
//   this.anyView.flag = 'SC';
//    this.cycleService.getLevelsBySchoolyearAndCycleFromScoolday(this.anyView).subscribe(
//     result => {
//       this.levelsBySchooyear = result;

//     }
//   );
// }
// getLevelsBySchoolyearAndCycleOnSite(){
//      console.log(this.anyView);
//   this.anyView.flag = 'SITE';
//   this.cycleService.getLevelsBySchoolyearAndCycleOnSite(this.anyView).subscribe(
//     result => {
//       this.levelsBySchooyear = result;

//     }
//   );

// }
// getProspectByStatusAndLevel(evt){
//   this.displayDialogProspect = true;
//   this.prospects = [];
//   console.log(evt.data);
//   console.log(this.anyView);
//   this.anyView.id3 = this.anyView.id1;
//   this.anyView.id4 = evt.data.id1;
//    this.cycleService.getProspectByStatusAndLevel(this.anyView).subscribe(
//     result => {
//       this.prospects = result;

//     }
//   );
// }

//   findSelectedTimeSheetEntryIndex(): number {
//     return this.timeSheetEntryGroups.indexOf(this.timeSheetEntryGroup);
//   }



}
