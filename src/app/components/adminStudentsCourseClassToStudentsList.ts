import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {CourseView} from '../models/courseView';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule, Message, SelectItem} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {TimeTableView} from '../models/timeTableView';
import {CourseService} from '../services/course.service';
import {TimeTableService} from '../services/timeTable.service';
import {Course} from '../models/course';
import {Term} from '../models/term';
import {SchoolYear} from '../models/schoolYear';
import {Payment} from '../models/payment';
import {BaseService} from '../services/base.service';
import {SubjectService} from '../services/subject.service';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {TermDropdown} from './dropdowns/dropdown.term';
import { CourseGroupeCodeDropDown } from './dropdowns/dropdown.courseGroupeCode';
import { TuitionView } from '../models/tuitionView';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { Enrollment } from '../models/enrollment';
import { ClassDropdown } from './dropdowns/dropdown.class';
import { Class } from 'app/models/class';
import { CourseClassStudentView } from 'app/models/courseClassStudentView';
import { UserService } from 'app/services';

@Component({
  selector: 'app-admin-students-course-class-to-students-list',
  templateUrl: '../pages/adminStudentsCourseClassToStudentsList.html',
  providers: [SubjectService, CourseService, TimeTableService, BaseService, SchoolYearDropdown,
    TermDropdown, StudentService, CourseGroupeCodeDropDown, ClassDropdown, UserService]
})
export class AdminStudentsCourseClassToStudentsList implements OnInit, OnDestroy {
  public courses: Course[];
  public registeredCourses: CourseView[];
  cols: any[];
  colregs: any[];
  public searchText: string;
  displayDialog = false;
  public user: User;
  public student: Student;
  public enrollment: Enrollment;

  courseClassStudentView: CourseClassStudentView;
  courseClassStudentViewList: CourseClassStudentView[] = [];

  error: string;
  public loggedInUser: User;
  DETAIL: string = Constants.DETAIL;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR; Infinity
  TERM: string = Constants.TERM;
  COURSE_SEARCH_TEXT: string = Constants.COURSE_SEARCH_TEXT;
  CLASS: string = Constants.CLASSE;
  public schoolYearDropdown: SchoolYearDropdown;
  public termDropdown: TermDropdown;
  public courseGroupeCodeDropDown: CourseGroupeCodeDropDown;
  public classDropdown: ClassDropdown;
  theTerm: Term;
  theSchoolYear: SchoolYear;
  theClass: Class;
  theSessionType: number = 0;
  sessionTypes: SelectItem[];
  lmd = JSON.parse(Cookie.get('lmd'));
  msgs: Message[] = [];
  isSignup: boolean = false;
  labelSignupButton: string = 'Affecter les cours aux étudiants';
  isDisabledSignupButton: boolean = false;

  public searchTextUser = '';
  public users: User[];
  public usersAdded: User[] = [];
  public usersId: string = '';
  userCols: any[];
  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;

  constructor
    (
    private courseService: CourseService,
    private timeTableService: TimeTableService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private userService: UserService,
    private syDropdown: SchoolYearDropdown,
    private tmDropdown: TermDropdown,
    private clsDropdown: ClassDropdown,
    private crGroupeCodeDropDown: CourseGroupeCodeDropDown
  ) {
    this.schoolYearDropdown = syDropdown;
    this.termDropdown = tmDropdown;
    this.courseGroupeCodeDropDown = crGroupeCodeDropDown;
    this.classDropdown = clsDropdown;
  }
  ngOnInit() {
    this.sessionTypes = [];
    this.sessionTypes.push({ label: 'Normale', value: '0' });
    this.sessionTypes.push({ label: 'Rattrapage', value: '1' });
    this.sessionTypes.push({ label: 'Rattrapage spécial', value: '2' });

    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
    if (this.loggedInUser != null && this.loggedInUser.role == 3) {
      this.user = this.loggedInUser;
    }
    this.cols = [
      {field: 'student.user.lastName', header: 'Nom', sortable: 'true', filter: 'true', style: {'width': '25%', 'overflow': 'visible'}},
      {field: 'student.user.firstName', header: 'Prénoms', sortable: 'false', filter: 'true', style: {'width': '30%', 'overflow': 'visible'}},
      {field: 'numberCoursesAffected', header: 'Nombre de cours affectés', sortable: 'false', filter: 'true', style: {'width': '20%', 'overflow': 'visible'}},
      {field: 'numberCoursesNotAffected', header: 'Nombre de cours non affectés', sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } }
    ];

    this.colregs = [
      {field: 'code', header: Constants.CODE, sortable: 'false', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: {'width': '35%', 'overflow': 'visible'}},
      {field: 'courseStatus', header: Constants.STATUS, sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'error', header: Constants.STATUS_DESC, sortable: 'true', filter: 'true', style: {'width': '35%', 'overflow': 'visible'}},
    ];

    this.userCols = [
      {field: 'lastName', header: Constants.NAME, sortable: 'true', filter: 'true'},
      {field: 'firstName', header: Constants.PRENOM, sortable: 'true', filter: 'true'},
      {field: 'userName', header: Constants.MATRICULE_OR_USER, sortable: 'true', filter: 'true'}
    ];
  }

  ngOnDestroy() {
    this.courses = null;
  }

  public search() {
    this.courses = null;
    this.error = '';
    if (this.theSchoolYear == null || this.theTerm == null) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'annee et le semestre'});
    } else {
      this.courseService.search(this.theSchoolYear.id + '|' + this.theTerm.id + '|' + this.searchText)
        .subscribe((data: Course[]) => {
          if (!data || data.length <= 0) {
            this.error = Constants.NO_COURSE_FOUND;
          } else {
            this.courses = data;
          }
        },
        error => console.log(error),
        () => console.log('Get courses for ' + this.searchText + ' complete'));
    }
  }

  signupCourseClassStudent() {
    this.isSignup = false;
    
    if(this.theSchoolYear == null || this.theClass == null || this.theTerm == null) 
    {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Selectionnez l\'année, la classe et le semestre !'});
    }
    else if(this.usersAdded.length <= 0) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Ajoutez les étudiants !'});
    }
    else {
      const parameters = this.theSchoolYear.id + ',' + this.theClass.id + ',' + this.theTerm.id + ',' + this.theSessionType + ',' + this.loggedInUser.id;
      console.log(parameters);

      this.isDisabledSignupButton = true;

      this.labelSignupButton = 'Affectation en cours...';

      this.courseService.signupCourseClassToStudentList(parameters, this.usersId)
        .subscribe((data: CourseClassStudentView[]) => {
          if (data.length > 0) {
            this.msgs.push({severity: 'success', summary: 'Success', detail: 'Affectations terminées !'});

            this.courseClassStudentViewList = data;

            this.isDisabledSignupButton = false;

            this.labelSignupButton = 'Affecter les cours aux étudiants';

            this.usersId='';
            this.usersAdded = [];

            this.isSignup = true;

          } else {
            this.isDisabledSignupButton = false;
            this.labelSignupButton = 'Affecter les cours aux étudiants';
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Aucun cours créé avec ces paramètres !'});
          }

        },
        error => console.log(error),
        () => console.log('register course ' + parameters + ' complete'));
    }
  }

  public searchUser() {
    this.error = null;
    if (this.searchTextUser != null) {
        this.userService.search(this.searchTextUser).subscribe((data: User[]) => {
                this.users = data;

                //this.constructSurveillancesFromUsers();

                if (this.users == null || this.users.length <= 0) {
                    this.error = Constants.NO_USER_FOUND;
                }
            },
            error => console.log(error),
            () => console.log('Find users with name like ' + this.searchTextUser));
    }
  }

  public addUser(user: User) {
    if(this.usersId == '') {
      this.usersId = user.id + '';
    }
    else {
      this.usersId += ',' + user.id;
    }
    this.putUserInTable(user);
    console.log(user);
    console.log(this.usersId);
  }

  removeUser(user: User) {
    if(this.usersId.includes(',')) {
      console.log(',');
      if(this.usersId.includes(',' + user.id)) {
        console.log('user+,');
        this.usersId = this.usersId.replace(',' + user.id, '');
      }
      else if(this.usersId.includes('' + user.id)) {
        this.usersId = this.usersId.replace(user.id + ',', '');
      }
    }
    else {
      this.usersId = '';
    }
    this.removeUserFromTable(user);
    console.log(user);
    console.log(this.usersId);
  }

  putUserInTable(user: User) {
      this.usersAdded.push(user);
      var onTheFly: User[] = [];
      onTheFly.push(...this.usersAdded);
      this.usersAdded = onTheFly;
  }

  removeUserFromTable(user: User) {
      this.usersAdded.splice(this.findSelectedIndex(user), 1);
      var onTheFly: User[] = [];
      onTheFly.push(...this.usersAdded);
      this.usersAdded = onTheFly;
  }

  findSelectedIndex(user: User): number {
      return this.usersAdded.indexOf(user);
  }

}
