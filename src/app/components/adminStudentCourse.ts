import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { ConfirmationService, DataTableModule, DialogModule, InputTextareaModule, Message } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { TimeTableView } from '../models/timeTableView';
import { CourseService } from '../services/course.service';
import { TimeTableService } from '../services/timeTable.service';
import { Course } from '../models/course';
import { Term } from '../models/term';
import { SchoolYear } from '../models/schoolYear';
import { Payment } from '../models/payment';
import { BaseService } from '../services/base.service';
import { SubjectService } from '../services/subject.service';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { TermDropdown } from './dropdowns/dropdown.term';
import { CourseGroupeCodeDropDown } from './dropdowns/dropdown.courseGroupeCode';
import { TuitionView } from '../models/tuitionView';
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { Enrollment } from '../models/enrollment';

@Component({
  selector: 'app-admin-stcourse',
  templateUrl: '../pages/adminStudentCourse.html',
  providers: [SubjectService, CourseService, TimeTableService, BaseService, SchoolYearDropdown,
    TermDropdown, StudentService, CourseGroupeCodeDropDown]
})
export class AdminStudentCourse implements OnInit, OnDestroy {
  public courses: Course[];
  public registeredCourses: CourseView[];
  cols: any[];
  colregs: any[];
  public searchText: string;
  displayDialog = false;
  public user: User;
  public student: Student;
  public enrollment: Enrollment;

  error: string;
  public loggedInUser: User;
  DETAIL: string = Constants.DETAIL;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR; Infinity
  TERM: string = Constants.TERM;
  COURSE_SEARCH_TEXT: string = Constants.COURSE_SEARCH_TEXT;
  public schoolYearDropdown: SchoolYearDropdown;
  public termDropdown: TermDropdown;
  public courseGroupeCodeDropDown: CourseGroupeCodeDropDown;
  theTerm: Term;
  theSchoolYear: SchoolYear;
  msgs: Message[] = [];
  constructor
    (
      private courseService: CourseService,
      private timeTableService: TimeTableService,
      private baseService: BaseService,
      private subjectService: SubjectService,
      private syDropdown: SchoolYearDropdown,
      private tmDropdown: TermDropdown,
      private studentService: StudentService,
      private crGroupeCodeDropDown: CourseGroupeCodeDropDown,
      private confirmationService: ConfirmationService
    ) {

    this.schoolYearDropdown = syDropdown;
    this.termDropdown = tmDropdown;
    this.courseGroupeCodeDropDown = crGroupeCodeDropDown;
  }
  ngOnInit() {
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
    if (this.loggedInUser != null && this.loggedInUser.role == 3) {
      this.user = this.loggedInUser;
      this.getCourses(this.user);
    }
    this.cols = [
      { field: 'schoolYear.year', header: Constants.YEAR, sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'term.name', header: Constants.TERM, sortable: 'false', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
      { field: 'classe.name', header: Constants.CLASSE, sortable: 'false', filter: 'true', style: { 'width': '12%', 'overflow': 'visible' } },
      { field: 'courseGroupeCode.name', header: Constants.TYPE_UE, sortable: 'false', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'subject.code', header: Constants.CODE, sortable: 'false', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: { 'width': '34%', 'overflow': 'visible' } },
      { field: 'sessionTypeDesc', header: Constants.SESSION, type: 'string', sortable: 'true', style: { 'width': '10%', 'overflow': 'visible' } }
      /*{field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true', style: {'width': '20%', 'overflow': 'visible'}},
      {field: 'credit', header: Constants.CREDIT, sortable: 'true', filter: 'true', style: {'overflow': 'visible'}},
      {field: 'prereq', header: Constants.PREREQ, sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}}*/
    ];

    this.colregs = [
      { field: 'year', header: Constants.YEAR, sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'termName', header: Constants.SEMESTER, sortable: 'false', filter: 'true', style: { 'width': '5%', 'overflow': 'visible' } },
      { field: 'code', header: Constants.CODE, sortable: 'false', filter: 'true', style: { 'width': '7%', 'overflow': 'visible' } },
      { field: 'name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: { 'width': '25%', 'overflow': 'visible' } },
      // { field: 'groupeCode', header: Constants.TYPE_UE, sortable: 'false', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      /*{field: 'prereq', header: Constants.PREREQ, sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},
      {field: 'teacherName', header: Constants.TEACHER, sortable: 'false', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}},
      {field: 'credit', header: Constants.CREDIT, sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},*/
      { field: 'courseStatus', header: Constants.STATUS, sortable: 'true', filter: 'true', style: { 'width': '7%', 'overflow': 'visible' } },
      { field: 'rankAsString', header: "Rang", style: { 'width': '5%', 'overflow': 'visible' } },
      { field: 'sessionTypeDesc', header: Constants.SESSION, sortable: 'true', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } }
    ];
  }

  ngOnDestroy() {
    this.courses = null;
  }

  public setStudent(user: User) {
    this.studentService.getByUser(user)
      .subscribe((data: Student) => {
        this.student = data
        console.log('étudiant');
        console.log(this.student);
      },
        error => console.log(error),
        () => console.log('Get student complete'));

  }

  getCourses(user: User) {
    this.user = user;
    this.courseService.getUserCourses(this.user)
      .subscribe((data: CourseView[]) => {
        this.registeredCourses = data;
        console.log(this.registeredCourses, "+++++++++++++++");
      },
        error => console.log(error),
        () => console.log('Get registeredCourses for ' + this.user + ' complete'));
  }

  public getTimeTables(evt) {
    this.timeTableService.getTimeTables(
      evt.data.id + '')
      .subscribe((data: TimeTableView[]) => {
        evt.data.timeTables = data
      },
        error => console.log(error),
        () => console.log('Get time tables complete'));

  }

  public getViewTimeTables(evt) {
    this.timeTableService.getTimeTables(
      evt.data.courseId + '')
      .subscribe((data: TimeTableView[]) => {
        evt.data.timeTables = data
      },
        error => console.log(error),
        () => console.log('Get time tables complete'));

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
  }

  public getStudentEnrollmentBySchoolYear() {
    console.log(this.student);
    console.log(this.theSchoolYear);
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
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'annee et le semestre' });
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

  signup2() {
    console.log(this.user);
  }

  signup(course: Course) {
    let isOldCourse: boolean = false;
    console.log(this.enrollment);
    if (this.theSchoolYear == null || this.theTerm == null) {
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Selectionner l\'annee et le semestre' });

    } else if (this.enrollment.levelClass.level.college.id != course.classe.level.college.id) {
      console.log(this.enrollment.levelClass.level.college.id);
      console.log(course.classe.level.college.id);
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'La filière de l\'étudiant est différente de celle du cours !' });
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
              if (course.sessionType == 1 && (this.registeredCourses[i].courseStatus.endsWith("ABANDON")
                || this.registeredCourses[i].courseStatus.endsWith("REUSSIT"))
                || this.registeredCourses[i].courseStatus.endsWith("ECHOUE")) {
                //do nothing
              } else {
                console.log('FOUND :' + this.registeredCourses[i].courseStatus);
                this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Vous etes deja enregistre a ce cours' });
                return;
              }
            }

            if (this.registeredCourses[i].courseStatus.endsWith("REUSSIT")) {
              console.log('FOUND :' + this.registeredCourses[i].courseStatus);
              this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Vous avez déjà validé ce cours' });
              return;
            }

            /*
              05022020
              Gestion des paiements des matières reprises par les étudiants
             */

            else if (this.registeredCourses[i].sessionTypeDesc.endsWith("Rattrapage")
              && this.registeredCourses[i].courseStatus.endsWith("ECHOUE")) {
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

            else if (this.registeredCourses[i].sessionTypeDesc.endsWith("Normale")
              && this.registeredCourses[i].courseStatus.endsWith("ECHOUE")) {
              isOldCourse = true;
            }

          }
        }
      }
      this.courseService.signup(reg)
        .subscribe((data: CourseView) => {
          if (data.studentCourseId > 0) {
            this.msgs.push({ severity: 'success', summary: 'Success', detail: data.error });
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


            if (isOldCourse) {
              const tuitionViewN: TuitionView = new TuitionView();
              tuitionViewN.studentCourseId = data.studentCourseId;

              this.addStudentTuitionCourse(tuitionViewN);
            }

          } else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data.error });
          }

        },
          error => console.log(error),
          () => console.log('register course ' + reg + ' complete'));
    }
  }

  addStudentTuitionCourse(tuitionViewN: TuitionView) {
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
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
    // console.log(reg,"-------------");
    if (cv.status >= 3) {
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas supprimer un cours dont l\'etat est: ' + cv.courseStatus });
    } else {
      this.courseService.remove(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            this.registeredCourses.splice(this.registeredCourses.indexOf(cv), 1);
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;
            this.msgs.push({ severity: 'success', summary: 'Success', detail: data });
          } else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data });
          }

        },
          error => console.log(error),
          () => console.log('remove course ' + reg + ' complete'));
    }
  }

  forceRemoval(cv: CourseView) {
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;

    this.courseService.forceRemoval(reg)
      .subscribe((data: string) => {
        if (data.startsWith('Succes')) {
          this.registeredCourses.splice(this.registeredCourses.indexOf(cv), 1);
          const onTheFly: CourseView[] = [];
          onTheFly.push(...this.registeredCourses);
          this.registeredCourses = onTheFly;
          this.msgs.push({ severity: 'success', summary: 'Success', detail: data });
        } else {
          this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data });
        }

      },
        error => console.log(error),
        () => console.log('remove course ' + reg + ' complete'));

  }

  closeStudentCourse(cv: CourseView) {
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;

    this.courseService.closeStudentCourse(reg)
      .subscribe((data: string) => {
        if (data.startsWith('Succes')) {

          this.registeredCourses.splice(this.registeredCourses.indexOf(cv), 1);
          const onTheFly: CourseView[] = [];
          onTheFly.push(...this.registeredCourses);
          this.registeredCourses = onTheFly;

          this.msgs.push({ severity: 'success', summary: 'Success', detail: data });
        } else {
          this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data });
        }

      },
        error => console.log(error),
        () => console.log('close course ' + reg + ' complete'));

  }





  abandon(cv: CourseView) {
    const reg = cv.studentCourseId + ',' + this.loggedInUser.id;
    if (cv.status >= 2) {
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas abandonner un cours dont l\'etat est: ' + cv.courseStatus });
    } else {
      this.courseService.abandon(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            cv.courseStatus = "ABANDON";
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;
            this.msgs.push({ severity: 'success', summary: 'Success', detail: data });
          } else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data });
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
      this.msgs.push({ severity: 'danger', summary: 'Echec', detail: ' Vous ne pouvez pas approuver un cours dont l\'etat est: ' + cv.courseStatus });
    } else {
      this.courseService.approveRegistration(reg)
        .subscribe((data: string) => {
          if (data.startsWith('Succes')) {
            cv.courseStatus = "INSCRIT";
            const onTheFly: CourseView[] = [];
            onTheFly.push(...this.registeredCourses);
            this.registeredCourses = onTheFly;
            this.msgs.push({ severity: 'success', summary: 'Success', detail: data });
          } else {
            this.msgs.push({ severity: 'danger', summary: 'Echec', detail: data });
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

  confirmDelete(cv: CourseView) {
    this.confirmationService.confirm({
      message: `
      <div class="confirmation-message">
        <p><strong>⚠️ ATTENTION : Opération irréversible</strong></p>
        <p>Êtes-vous absolument sûr de vouloir supprimer le cours <strong>"${cv.name || 'ce cours'}"</strong> ?</p>
        
        <div class="deletion-consequences">
          <p><strong>Cette suppression entraînera également la suppression :</strong></p>
          <ul>
            <li>✅ Toutes les notes associées à ce cours</li>
            <li>✅ Toutes les moyennes calculées</li>
            <li>✅ Toutes les tranches de paiement liées</li>
            <li>✅ Tous les historiques de paiements</li>
            <li>✅ Tous les enregistrements d'inscription</li>
          </ul>
        </div>
        
        <p class="warning-text">🚨 Cette action est définitive et ne peut pas être annulée.</p>
        <p>Veuillez confirmer votre décision.</p>
      </div>
    `,
      header: "Confirmation de suppression définitive",
      // icon: "pi pi-exclamation-triangle",
      acceptLabel: "Oui, supprimer définitivement",
      rejectLabel: "Annuler",


      accept: () => {
        this.forceRemoval(cv);
      },
      reject: () => {
        // Optionnel : ajouter un toast de confirmation d'annulation

      },
    });
  }
}
