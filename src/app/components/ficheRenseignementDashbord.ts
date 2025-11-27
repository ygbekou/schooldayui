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
import { UserOnlineRegistrationView } from 'app/models/userOlineRegistrationView';


@Component({
  selector: 'app-fiche-dashbord',
  templateUrl: '../pages/ficheRenseignementDashbord.html',
  providers: [CourseService, SubjectService, TimeSheetService, Constants,UserService,
    ClassDropdown, TermDropdown, TeacherDropdown,
    SubjectDropdown, ExpenseTypeDropdown, SchoolYearDropdown, CourseGroupeCodeDropDown, UserDropdown]
})

export class FicheRenseignementDashbord implements OnInit, OnDestroy {
  sessionTypes: SelectItem[];
  public courses: Course[];
  public error: String = '';
  public selectedCourse: Course;
  displayDialog: boolean;
  course: Course = new Course();
  expenses: Expense[];
  userSubjectViews: UserSubjectView[];
  userSubjectView: UserSubjectView = new UserSubjectView();
  newCourse: boolean;
  cols: any[];
  colso: any[];
  col1: any[];
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
      private uDropdown: UserDropdown,
      private userService: UserService
    ) {

     this.userDropdown = uDropdown;
  }
  ngOnDestroy() {
   
  }
  ngOnInit() {
    //this.manageTimeSheet.setTeacher(this.selectedUserT);

    this.sessionTypes = [];
    this.sessionTypes.push({ label: 'Normale', value: '0' });
    this.sessionTypes.push({ label: 'Rattrapage', value: '1' });

    // this.courses = [];
    // this.user = JSON.parse(atob(Cookie.get('user')));
    // if (this.user == null) {
    //   this.user = new User();
    // }
     this.cols = [
          { field: 'prospectName', header: 'Propect', sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'prospectEmail', header:'Email', sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'prospectPhone', header:'Phone', sortable: 'false', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } },
          { field:'vendeurtName', header: 'Vendeur', sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'statusDescription', header: 'Status', sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } }
        ];

         this.colso = [
            {
                field: 'levelName',
                header: 'Filière/Cours',
                sortable: 'true',
                filter: 'true',
                style: {'width': '60%', 'overflow': 'visible'}
            },
            {
                field: 'status1',
                header:'Attente',
                sortable: 'false',
                filter: 'true',
                style: {'width': '10%'}
            },
            {
                field: 'status2',
                header:'Approuvé',
                sortable: 'false',
                filter: 'true',
                style: {'width': '10%'}
            },
            {
                field: 'status3',
                header:'Rejeté',
                sortable: 'false',
                filter: 'true',
                style: {'width': '10%'}
            },
              {
                field: 'status4',
                header:'Inscrit',
                sortable: 'false',
                filter: 'true',
                style: {'width': '10%'}
            }
        ];
   
    }


  public search() {
    // let id = 0;
    // this.userSubjectView = [];
    // console.log(this.searchTextObject);
    // if(this.user == null){
    //     id = 0;
    // }else{
    //   id = this.user.id;
    // }
    // this.subjectService.searchUserSubject(this.searchTextObject, id)
    //   .subscribe((data: UserSubjectView[]) => {
    //     this.userSubjectView = data
    //   },
    //     error => {
    //       console.log(error);
    //       this.user = new User();
    //       this.searchTextObject = new SearchText();
    //     },
        
    //     () => {
    //       this.user = new User();
    //       this.searchTextObject = new SearchText();
    //       console.log('Get userSubjectView for ' + this.searchText + ' complete');
    //     });

      this.userService.getOlineUserRegistrationVO(this.searchTextObject).subscribe(
            result =>{
                this.userOnlineRegistrationViews = result;
            }
        )

  }

getOlineRegistrationUsers(evt){
  this.searchTextObject.id = evt.data.id;
  this.userService.getOlineRegistrationUsers(this.searchTextObject).subscribe(
    result => {
      this.userSubjectViews = result;

    }
  );
}

  findSelectedTimeSheetEntryIndex(): number {
    return this.timeSheetEntryGroups.indexOf(this.timeSheetEntryGroup);
  }


}
