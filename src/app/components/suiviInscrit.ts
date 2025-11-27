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
import {SelectButtonModule} from 'primeng/selectbutton';
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
import { TeacherOnlineRegistration } from 'app/models/teacherOnlineRegisteration';

@Component({
  selector: 'app-suivi-inscrit',
  templateUrl: '../pages/suiviInscrit.html',
  providers: [CycleService, SubjectService, TimeSheetService, Constants,UserService,
    ClassDropdown, TermDropdown, TeacherDropdown,
    SubjectDropdown, ExpenseTypeDropdown, SchoolYearDropdown, CourseGroupeCodeDropDown, UserDropdown]
})

export class SuiviInscrit implements OnInit, OnDestroy {
  sessionTypes: SelectItem[];
  public courses: Course[];
  public error: String = '';
  public selectedCourse: Course;
  displayDialogProspect: boolean;
  displayDialog: boolean;
  course: Course = new Course();
  expenses: Expense[];
  teachers : TeacherOnlineRegistration[];
  userSubjectViews: UserSubjectView[];
  userSubjectView: UserSubjectView = new UserSubjectView();
  newCourse: boolean;
  cols: any[];
  colso: any[];
  colsodia: any[];
  colsTeachers:any[];
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

  anyViews: AnyView[];
  levelsBySchooyear: AnyView[];
  prospects: AnyView[];
  anyView: AnyView = new AnyView();
  options: SelectItem[];
  value1: string = 'tout';
    public onlineRegistration: OnlineRegistration;
  public currentUser: User;
  public selectedSource: string ='';
  constructor
    (
      private cycleService: CycleService,
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
     this.schoolYearDropdown = schYearDropdown;
     this.options = [];
     this.options = [{label: 'Tout', value: 'tout'},{label: 'Scoolday', value: 'sc'}, {label: 'Sur site', value: 'ss'}];
  }
  ngOnDestroy() {
   
  }
  ngOnInit() {
     this.currentUser = JSON.parse(atob(Cookie.get('user')));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

     this.cols = [
          { field: 'string1', header: 'Parcours', sortable: 'true', filter: 'true', style: { 'width': '80%', 'overflow': 'visible' } }
        ];
      this.colso = [
          { field: 'string1', header: 'Parcours', sortable: 'true', filter: 'true', style: { 'width': '30%', 'overflow': 'visible' } },
          { field: 'status1', header: 'Inscrit', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'status2', header: 'Préinscrit', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'status4', header: 'Dem Pré-Insc', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'status5', header: 'Prospect', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'status6', header: 'Rejeté', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'status7', header: 'Total', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } }

        ];

        this.colsodia = [
          { field: 'string1', header: 'Prospect', sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'string2', header: 'Email', sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'string3', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'string4', header: 'Ville', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
          { field: 'string6', header: 'Sexe', sortable: 'true', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
          { field: 'string7', header: 'Vendeur', sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
          { field: 'string8', header: 'Status', sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } }
        ];


        this.colsTeachers = [
          {field: 'lastName', header: 'Nom', sortable: 'true', filter: 'true', style: {'width': '15%'}},
          {field: 'firstName', header: 'Prenom', sortable: 'true', filter: 'true', style: {'width': '15%'}},
          {field: 'email', header: 'Email', sortable: 'true', filter: 'true', style: {'width': '20%'}},
          {field: 'phone', header: 'Contact', sortable: 'true', filter: 'true', style: {'width': '15%'}},
          {field: 'sex', header: 'Sexe', sortable: 'true', filter: 'true', style: {'width': '8%'}},
          {field: 'currentDiploma', header: 'Diplôme', sortable: 'true', filter: 'true', style: {'width': '15%'}},
          {field: 'visiteDate', header: 'Date demande',type: 'Date', sortable: 'true', filter: 'true', style: {'width': '13%'}}
         
        ];
    

   
    }


  public search() {
      this.cycleService.getCyclesBySchoolyear(this.theSchoolYear.id).subscribe(
            result =>{
                this.anyViews = result;            
            }
        )
       
        this.findTeacherOnlineRegistrationBySchoolYear();
  }

getLevelsBySchoolyearAndCycle(evt){
  this.anyView.id2 = evt.data.id1;
   this.anyView.id1 = evt.data.id2;
   this.anyView.flag = '';
   console.log(this.anyView);
  this.cycleService.getLevelsBySchoolyearAndCycle(this.anyView).subscribe(
    result => {
      this.levelsBySchooyear = result;

    }
  );
}

getLevelsBySchoolyearAndCycleFromScoolday(){
  console.log(this.anyView);
  this.anyView.flag = 'SC';
   this.cycleService.getLevelsBySchoolyearAndCycleFromScoolday(this.anyView).subscribe(
    result => {
      this.levelsBySchooyear = result;

    }
  );
}
getLevelsBySchoolyearAndCycleOnSite(){
     console.log(this.anyView);
  this.anyView.flag = 'SITE';
  this.cycleService.getLevelsBySchoolyearAndCycleOnSite(this.anyView).subscribe(
    result => {
      this.levelsBySchooyear = result;

    }
  );

}
getProspectByStatusAndLevel(evt){
  this.displayDialogProspect = true;
  this.prospects = [];
  console.log(evt.data);
  console.log(this.anyView);
  this.anyView.id3 = this.anyView.id1;
  this.anyView.id4 = evt.data.id1;
   this.cycleService.getProspectByStatusAndLevel(this.anyView).subscribe(
    result => {
      this.prospects = result;

    }
  );
}

getLevels(evt ){
 console.log(this.anyView);
 if(evt.value==='sc'){
   this.getLevelsBySchoolyearAndCycleFromScoolday();
 }else if(evt.value==='ss'){
   this.getLevelsBySchoolyearAndCycleOnSite();
 }else{
    this.cycleService.getLevelsBySchoolyearAndCycle(this.anyView).subscribe(
    result => {
      this.levelsBySchooyear = result;

    }
  );
 }
}

public findTeacherOnlineRegistrationBySchoolYear() {
  this.userService.findTeacherOnlineRegistrationBySchoolYear(this.theSchoolYear.id).subscribe(
        result =>{
            this.teachers = result;
        }
    )

}
  findSelectedTimeSheetEntryIndex(): number {
    return this.timeSheetEntryGroups.indexOf(this.timeSheetEntryGroup);
  }

}
