import {
  Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild
  , Input, Output, EventEmitter
} from '@angular/core';
import { Course } from '../models/course';
import { User } from '../models/User';
import { Expense } from '../models/expense';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { SubjectService } from '../services/subject.service';
import { Constants } from '../app.constants';
import { SchoolYear } from '../models/schoolYear';
import { Term } from '../models/term';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ClassDropdown } from './dropdowns/dropdown.class';
import { Class } from '../models/class';
import { TeacherDropdown } from './dropdowns/dropdown.teacher';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { DataTableModule, DialogModule, SelectItem, Message } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';
import { TermDropdown } from './dropdowns/dropdown.term';
import { ExpenseTypeDropdown } from './dropdowns/dropdown.expenseType';
import { CourseGroupeCodeDropDown } from './dropdowns/dropdown.courseGroupeCode';

import { ManageTimeSheet } from './manageTimeSheet';
import { Teacher } from '../models/teacher';
import { TimeSheetStatus } from '../models/timeSheetStatus';
import { TimeSheetService } from '../services/timeSheet.service';
import { TimeSheetEntryGroup } from "../models/timeSheetEntryGroup";
import { UserDropdown } from './dropdowns/dropdown.user';

import { GrhHourlyCost } from './grh/grhHourlyCost';
import { AdminCycle } from './adminCycle';
import { SearchText } from 'app/models/searchText';
import { UserSubjectView } from 'app/models/userSubjectView';
import { UserService } from "../services";
import { CycleService } from "../services/cycle.service";
import { UserOnlineRegistrationView } from 'app/models/userOlineRegistrationView';
import { AnyView } from 'app/models/anyView';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OnlineRegistration } from '../models/onlineRegistration';
import { Parentview } from '../models/parentview';
import { TimeTable } from '../models/timeTable';
import { TimePeriod } from '../models/timePeriod';
import { TimeTableService } from '../services/timeTable.service';
import { BaseService } from '../services/base.service';
import { StudentAttendanceResponse } from 'app/models/studentAttendanceResponse';

@Component({
  selector: 'app-presence-etudiant',
  templateUrl: '../pages/presenceEtudiant.html',
  providers: [BaseService, CycleService, SubjectService, TimeSheetService, Constants, UserService,
    ClassDropdown, TermDropdown, TeacherDropdown,
    SubjectDropdown, StudentService, SchoolYearDropdown, CourseGroupeCodeDropDown, UserDropdown, TimeTableService]
})

export class PresenceEtudiant implements OnInit, OnDestroy {
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
  parentview: Parentview[] = [];
  saving = false;
  manageTimeSheetBoolean: boolean = false;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;
  @Output() onCourseSelected = new EventEmitter<Course>();
  @Output() onUserSelected = new EventEmitter<User>();
  userOnlineRegistrationViews: UserOnlineRegistrationView[];
  public userDropdown: UserDropdown;
  searchTextObject: SearchText = new SearchText();

  anyViews: AnyView[];
  stAttendancesResponse: StudentAttendanceResponse[];
  levelsBySchooyear: AnyView[];
  prospects: AnyView[];
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  public timePeriods: SelectItem[];
  public selectedItem: SelectItem;
  timeTable: TimeTable;
  timePeriodId: string;
  anyView: AnyView = new AnyView();
  public onlineRegistration: OnlineRegistration;
  public currentUser: User;
  public searchInfo: string = '';
  selectedValue: number;
  optionDate: Date = new Date();
  constructor
    (
      private baseService: BaseService,
      private clsDropdown: ClassDropdown,
      private timeTableService: TimeTableService,
      private schYearDropdown: SchoolYearDropdown,
      private studentService: StudentService
    ) {
    this.schoolYearDropdown = schYearDropdown;
    this.classDropdown = clsDropdown;
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

    if (this.currentUser.role == 14) {
      // this.cols = [
      //   { field: 'string1', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
      //   { field: 'string2', header: 'Prenom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
      //   //{ field: 'string3', header: 'Mail', sortable: 'true', filter: 'true', style: { 'width': '19%', 'overflow': 'visible' } },
      //   { field: 'string4', header: 'Sexe', sortable: 'true', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
      //   { field: 'string5', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
      //   //{ field: 'status1', header: 'Présence', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
      // ];

      this.cols = [
        { field: 'string1', header: 'Matricule', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
        { field: 'string2', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
        //{ field: 'string3', header: 'Mail', sortable: 'true', filter: 'true', style: { 'width': '19%', 'overflow': 'visible' } },
        { field: 'string4', header: 'Sexe', sortable: 'true', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
        { field: 'string6', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
        //{ field: 'status1', header: 'Présence', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
      ];
      this.parentCols = [
        { field: 'lastName', header: Constants.NAME, sortable: 'true' },
        { field: 'firstName', header: Constants.PRENOM, sortable: 'true' },
        { field: 'eMail', header: Constants.EMAIL, sortable: 'false' },
        { field: 'sex', header: Constants.SEX, sortable: 'false' },
        { field: 'phone', header: Constants.PHONE, sortable: 'true' }
      ];
    } else {
      this.cols = [
        { field: 'string1', header: 'Nom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
        { field: 'string2', header: 'Prenom', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
        { field: 'string3', header: 'Mail', sortable: 'true', filter: 'true', style: { 'width': '19%', 'overflow': 'visible' } },
        { field: 'string4', header: 'Sexe', sortable: 'true', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
        { field: 'string5', header: 'Phone', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
      ];
    }

    // this.anyView.id1 = 2;

    this.anyView.status1 = 0;


    //this.anyView.date1 = new Date();
    // this.defaultSearch();
  }


  public search() {
    this.anyViews = [];

    this.msgs = [];
    if (this.anyView.objet1 == null) {
      this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseigner l\'année' });
    } else if (this.anyView.date1 == null) {
      this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseigner la date' });
    }
    else {
      if (this.anyView.objet2 != null) {
        this.anyView.id3 = this.anyView.objet2.id;//id classe
      } else {
        this.anyView.id3 = null;
      }
      this.anyView.id2 = this.anyView.objet1.id;//id année
      this.anyView.date1 = new Date(this.anyView.date1)


      console.log("Après " + this.anyView.date1);

      this.studentService.getAllStudentHaveCourseToday(this.anyView).subscribe(
        result => {
          this.anyViews = result;
          console.log(this.anyViews);
        },
        (err) => {
          console.log(err.message);
        }
      )
    }
  }

  // public search2() {

  //   this.stAttendancesResponse = [];

  //   this.msgs = [];
  //   if (this.anyView.objet1 == null) {
  //     this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseignez l\'année' });
  //   }else if(this.anyView.objet2 == null){
  //      this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseignez la classe' });
  //   }
  //    else if (this.anyView.date1 == null) {
  //     this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseignez la date' });
  //   }
  //   else {

  //     this.anyView.date1 = new Date(this.anyView.date1)

  //     this.anyView.string1 = this.anyView.objet1.year;
  //     this.anyView.string2 = this.anyView.objet2.name;

  //   console.log(this.anyView, "******************");



  //     this.studentService.getStudentAttendanceWithCourses(this.anyView).subscribe(
  //       result => {
  //         this.stAttendancesResponse = result;

  //         console.log(this.stAttendancesResponse,"---------------");
  //       },
  //       (err) => {
  //         console.log(err.message);
  //       }
  //     )
  //   }
  // }


  public search2() {
    this.stAttendancesResponse = [];
    this.msgs = [];

    // Validation des paramètres
    if (!this.anyView.objet1) {
      this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseignez l\'année' });
      return;
    }
    if (!this.anyView.objet2) {
      this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseignez la classe' });
      return;
    }
    if (!this.anyView.date1) {
      this.msgs.push({ severity: 'warn', summary: 'Attention', detail: 'Prière renseignez la date' });
      return;
    }

    this.anyView.date1 = new Date(this.anyView.date1);
    this.anyView.string1 = this.anyView.objet1.year;
    this.anyView.string2 = this.anyView.objet2.name;


    this.studentService.getStudentAttendanceWithCourses(this.anyView).subscribe(
      (result: any) => {
        if (result && result.length > 0) {
          this.stAttendancesResponse = result.map((student: any) => {
            return {
              ...student.student,
              courses: student.courses || [],
              string8: student.student.string8
            };
          });
        } else {
          this.stAttendancesResponse = [];
          this.msgs.push({ severity: 'warn', summary: 'Réponse', detail: 'Aucune donnée' });
          return;
        }
        console.log("Résultat reçu:", this.stAttendancesResponse);
      },
      (err) => {
        console.error("Erreur lors de la récupération:", err);
        this.msgs.push({ severity: 'error', summary: 'Erreur', detail: 'Impossible de récupérer les données' });
      }
    );
  }



  public defaultSearch() {
    this.anyViews = [];

    this.msgs = [];
    //let td = new Date(this.anyView.date1.getFullYear(), this.anyView.date1.getMonth(), this.anyView.date1.getDay(),10,30,15);
    this.anyView.date1 = new Date();
    this.anyView.id1 = 2;
    //this.anyView.date1.setTime(new Date().getTime());
    console.log("default " + this.anyView.date1);

    this.studentService.getAllStudentHaveCourseToday(this.anyView).subscribe(
      result => {
        this.anyViews = result;
        console.log(this.anyViews);
      },
      (err) => {
        console.log(err.message);
      }
    )

  }

  getStudentParent(event) {
    this.studentService.getStudentParent(event.data.id1).subscribe(data => {
      this.parentview = data;
    });
  }

  onRowSelect(evt) {
    //this.newUser = false;
    this.user = this.clone(evt.data);
    this.user.id = evt.data.id1;
    this.user.someDate = evt.data.date1;
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

  get() {

  }
}
