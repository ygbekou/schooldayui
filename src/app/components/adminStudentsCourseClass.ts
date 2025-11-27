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

@Component({
  selector: 'app-admin-students-course-class',
  templateUrl: '../pages/adminStudentsCourseClass.html',
  providers: [SubjectService, CourseService, TimeTableService, BaseService, SchoolYearDropdown,
    TermDropdown, StudentService, CourseGroupeCodeDropDown, ClassDropdown]
})
export class AdminStudentsCourseClass implements OnInit, OnDestroy {
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
  constructor
    (
    private courseService: CourseService,
    private timeTableService: TimeTableService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private syDropdown: SchoolYearDropdown,
    private tmDropdown: TermDropdown,
    private clsDropdown: ClassDropdown,
    private crGroupeCodeDropDown: CourseGroupeCodeDropDown,
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
      this.getCourses(this.user);
    }
    this.cols = [
      {field: 'student.user.lastName', header: 'Nom', sortable: 'true', filter: 'true', style: {'width': '25%', 'overflow': 'visible'}},
      {field: 'student.user.firstName', header: 'Prénoms', sortable: 'false', filter: 'true', style: {'width': '30%', 'overflow': 'visible'}},
      {field: 'numberCoursesAffected', header: 'Nombre de cours affectés', sortable: 'false', filter: 'true', style: {'width': '20%', 'overflow': 'visible'}},
      {field: 'numberCoursesNotAffected', header: 'Nombre de cours non affectés', sortable: 'false', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } }
    ];

    this.colregs = [
      {field: 'code', header: Constants.CODE, sortable: 'false', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: {'width': '30%', 'overflow': 'visible'}},
      {field: 'courseStatus', header: Constants.STATUS, sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'error', header: Constants.STATUS_DESC, sortable: 'true', filter: 'true', style: {'width': '30%', 'overflow': 'visible'}},
    ];
  }

  ngOnDestroy() {
    this.courses = null;
  }

  getCourses(user: User) {
    this.user = user;
    this.courseService.getUserCourses(this.user)
      .subscribe((data: CourseView[]) => {
        this.registeredCourses = data;
      },
      error => console.log(error),
      () => console.log('Get registeredCourses for ' + this.user + ' complete'));
  }

  getCourseViewPreReqs(evt) {
    console.log('getting prerequisits for Subject ID: ' + evt.data.id);
    this.subjectService.getPrerequisits(evt.data.id)
      .subscribe(result => {
        for (let i = 0; i < result.length; i++) {
          if (i > 0) {
            evt.data.prereq += ', ' + result[i].reqSubject.code;
          } else {
            evt.data.prereq = result[i].reqSubject.code;
          }
        }
      }),
      error => console.log(error),
      () => console.log('get prerequisits complete');
  }

  getCoursePreReqs(evt) {
    try{
      console.log('getting prerequisits for subject ID: ' + evt.data.subject.id);
      this.subjectService.getPrerequisits(evt.data.subject.id)
        .subscribe(result => {
          for (let i = 0; i < result.length; i++) {
            if (i > 0) {
              evt.data.prereq += ', ' + result[i].reqSubject.code;
            } else {
              evt.data.prereq = result[i].reqSubject.code;
            }
          }
        }),
        error => console.log(error),
        () => console.log('get prerequisits complete');
    }catch(exc){

    }
    
  }

  public getStudentEnrollmentBySchoolYear() {
    if (this.student != null && this.theSchoolYear != null) {
      this.studentService.getEnrollment(this.student, this.theSchoolYear)
        .subscribe(result => {
          this.enrollment = result;
          console.log(this.enrollment);
        });
    }
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

            this.getStudentEnrollmentBySchoolYear();
          }
        },
        error => console.log(error),
        () => console.log('Get courses for ' + this.searchText + ' complete'));
    }
  }

  signupCourseClassStudent() {
    this.isSignup = false;
    console.log(this.user);
    if(this.theSchoolYear == null || this.theClass == null || this.theTerm == null) 
    {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'année, la classe et le semestre'});
    }
    else {
      const parameters = this.theSchoolYear.id + ',' + this.theClass.id + ',' + this.theTerm.id + ',' + this.theSessionType + ',' + this.loggedInUser.id;
      console.log(parameters);

      this.isDisabledSignupButton = true;

      this.labelSignupButton = 'Affectation en cours...';

      this.courseService.signupCourseClassStudent(parameters)
        .subscribe((data: CourseClassStudentView[]) => {
          if (data.length > 0) {
            this.msgs.push({severity: 'success', summary: 'Success', detail: 'Affectations terminées !'});

            this.courseClassStudentViewList = data;

            this.isDisabledSignupButton = false;

            this.labelSignupButton = 'Affecter les cours aux étudiants';

            this.isSignup = true;

          } else {
            this.isDisabledSignupButton = false;
            this.labelSignupButton = 'Affectation en cours...';
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Aucun cours créé avec ces paramètres !'});
          }

        },
        error => console.log(error),
        () => console.log('register course ' + parameters + ' complete'));
    }
  }

  signup(course: Course) {
    let isOldCourse: boolean = false;

    if (this.theSchoolYear == null || this.theTerm == null) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'annee et le semestre'});
    } else if (this.enrollment.levelClass.level.college.id != course.classe.level.college.id) {
      console.log(this.enrollment.levelClass.level.college.id);
      console.log(course.classe.level.college.id);
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'La filière de l\'étudiant est différente de celle du cours !'});
    } else {
      const reg = course.id + ',' + this.user.id + ',' + this.loggedInUser.id + ',' + this.theSchoolYear.id + ',' + this.theTerm.id;
      //check if the use has already taken the course
      if (this.registeredCourses != null) {
        for (let i = 0; i < this.registeredCourses.length; i++) {
          if (course.subject.id == this.registeredCourses[i].id) {
            console.log('COURSE ID == :' + course.id + ' - ' + this.registeredCourses[i].courseStatus);

            if (course.id !== this.registeredCourses[i].courseId &&
              (this.registeredCourses[i].courseStatus.endsWith("ABANDON")
                || this.registeredCourses[i].courseStatus.endsWith("REUSSIT"))
            ) {
              //do nothing. move forward.
            } else {
              //if current course is rattrapage do nothing
              if(course.sessionType==1 &&  (this.registeredCourses[i].courseStatus.endsWith("ABANDON")
                || this.registeredCourses[i].courseStatus.endsWith("REUSSIT"))
                || this.registeredCourses[i].courseStatus.endsWith("ECHOUE")){
              //do nothing
              }else{
                console.log('FOUND :' + this.registeredCourses[i].courseStatus);
                this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Vous etes deja enregistre a ce cours'});
                return;
              }
            }

            if(this.registeredCourses[i].courseStatus.endsWith("REUSSIT"))
            {
                console.log('FOUND :' + this.registeredCourses[i].courseStatus);
                this.msgs.push({severity: 'danger', summary: 'Echec', detail: 'Vous avez déjà validé ce cours'});
                return;
            }

            /*
              05022020
              Gestion des paiements des matières reprises par les étudiants
             */

             else if(this.registeredCourses[i].sessionTypeDesc.endsWith("Rattrapage")
              && this.registeredCourses[i].courseStatus.endsWith("ECHOUE"))
             {
                isOldCourse = true;
                /*
               //const tuitionView: TuitionView = theData;
               const tuitionViewN: TuitionView = new TuitionView();
               tuitionViewN.modBy = this.loggedInUser.id;
               //tuitionViewN.enrollmentId = this.enrollment.id;
               tuitionViewN.studentId = this.user.id;
               this.studentService.addTuition(tuitionViewN).subscribe((data: TuitionView) => {
                 //this.tuitions[this.tuitions.indexOf(theData)] = data;
                 console.log(data);
               },
                 error => console.log(error),
                 () => console.log('Save Tuition'));
                */
             }

             //On vérifie s'il a réussi au rattrapage

             else if(this.registeredCourses[i].sessionTypeDesc.endsWith("Normale")
              && this.registeredCourses[i].courseStatus.endsWith("ECHOUE"))
             {
                isOldCourse = true;
             }

          }
        }
      }
      this.courseService.signup(reg)
        .subscribe((data: CourseView) => {
          if (data.studentCourseId > 0) {
            this.msgs.push({severity: 'success', summary: 'Success', detail: data.error});
            this.courses.splice(this.courses.indexOf(course), 1);
            if (this.registeredCourses == null) {
              this.registeredCourses = [];
            }

            const onTheFly: CourseView[] = [];
            onTheFly.push(data);
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;

            const onTheFly2: Course[] = [];
            onTheFly2.push(...this.courses);
            this.courses = onTheFly2;


            if(isOldCourse)
            {
                const tuitionViewN: TuitionView = new TuitionView();
                tuitionViewN.studentCourseId = data.studentCourseId;

                this.addStudentTuitionCourse(tuitionViewN);
            }

          } else {
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data.error});
          }

        },
        error => console.log(error),
        () => console.log('register course ' + reg + ' complete'));
    }
  }

  addStudentTuitionCourse(tuitionViewN: TuitionView)
  {
    //const tuitionView: TuitionView = theData;
    //const tuitionViewN: TuitionView = new TuitionView();
    tuitionViewN.modBy = this.loggedInUser.id;
    //tuitionViewN.enrollmentId = this.enrollment.id;
    tuitionViewN.studentId = this.user.id;
    this.studentService.addStudentTuitionCourse(tuitionViewN).subscribe((data: TuitionView) => {
      //this.tuitions[this.tuitions.indexOf(theData)] = data;
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Tuition'));
  }

  remove(cv: CourseView) {
    console.log(cv);
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
    if (cv.status >= 3) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas supprimer un cours dont l\'etat est: ' + cv.courseStatus});
    } else {
      this.courseService.remove(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            this.registeredCourses.splice(this.registeredCourses.indexOf(cv), 1);
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;
            this.msgs.push({severity: 'success', summary: 'Success', detail: data});
          } else {
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data});
          }

        },
        error => console.log(error),
        () => console.log('remove course ' + reg + ' complete'));
    }
  }


  abandon(cv: CourseView) {
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
    if (cv.status >= 2) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas abandonner un cours dont l\'etat est: ' + cv.courseStatus});
    } else {
      this.courseService.abandon(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            cv.courseStatus = "ABANDON";
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;
            this.msgs.push({severity: 'success', summary: 'Success', detail: data});
          } else {
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data});
          }

        },
        error => console.log(error),
        () => console.log('remove course ' + reg + ' complete'));
    }
  }

  approve(cv: CourseView) {
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
    console.log('approve course. current status = ' + cv.status);
    if (cv.status == 1 || cv.status > 2) {
      this.msgs.push({severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas approuver un cours dont l\'etat est: ' + cv.courseStatus});
    } else {
      this.courseService.approveRegistration(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            cv.courseStatus = "INSCRIT";
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;
            this.msgs.push({severity: 'success', summary: 'Success', detail: data});
          } else {
            this.msgs.push({severity: 'danger', summary: 'Echec', detail: data});
          }

        },
        error => console.log(error),
        () => console.log('remove course ' + reg + ' complete'));
    }
  }

  public getCourseView(course: Course): CourseView {
    const cv: CourseView = new CourseView();
    cv.name = course.subject.name;
    cv.year = course.schoolYear == null ? null : course.schoolYear.year;
    cv.termName = course.term == null ? null : course.term.name;
    cv.prereq = course.prereq;
    cv.credit = course.credit;
    cv.code = course.subject.code;
    return cv;
  }
}
