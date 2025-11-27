import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Course} from '../models/course';
import {User} from '../models/User';
import {CourseService} from '../services/course.service';
import {SyllabusService} from '../services/syllabus.service';
import {Constants} from '../app.constants';
import {CourseTopic} from '../models/courseTopic';
import {Syllabus} from '../models/syllabus';
import {Term} from '../models/term';
import { SchoolYear } from '../models/schoolYear'
import {SyllabusView} from '../models/syllabusView';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {TermDropdown} from './dropdowns/dropdown.term';
import {DatePipe} from '@angular/common';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {DataTableModule, Message, DialogModule, InputMaskModule, GrowlModule, ToggleButtonModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-admin-syllabus',
  templateUrl: '../pages/adminSyllabus.html',
  providers: [CourseService, ConfirmationService, SchoolYearDropdown, TermDropdown, Constants]
})

export class AdminSyllabus implements OnInit, OnDestroy {

  public courses: Course[];
  public syllabuses: SyllabusView[];
  public error: String = '';
  public selectedCourse: Course;
  displayDialog: boolean;
  course: Course = new Course();
  newCourse: boolean;
  cols: any[];
  public user: User;
  msgs: Message[] = [];
  public searchText: string;
  COURSE_SEARCH_TEXT: string = Constants.COURSE_SEARCH_TEXT;
  DETAIL: string = Constants.DETAIL;
  CLASS: string = Constants.CLASSE;
  SUBJECT: string = Constants.SUBJECT;
  TEACHER: string = Constants.TEACHER;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  PRINT: string = Constants.PRINT;
  reportName: string;

  /* Update 13112019 */

  theTerm: Term;
  theSchoolYear: SchoolYear;
  public termDropdown: TermDropdown;
  public schoolYearDropdown: SchoolYearDropdown;

  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TERM: string = Constants.TERM;

  /* End Update 13112019 */

  constructor
    (
    private courseService: CourseService,
    private syllabusService: SyllabusService,
    private tmDropdown: TermDropdown,
    private schYearDropdown: SchoolYearDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService
    ) {
    this.schoolYearDropdown = schYearDropdown;
    this.termDropdown = tmDropdown;
  }

  ngOnDestroy() {
    this.courses = null;
    this.error = null;
    this.selectedCourse = null;
    this.course = null;
    this.cols = null;
  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
    if (this.user.role == 1 || this.user.role == 8 || this.user.role ==9 || this.user.role == 11|| this.user.role == 14) { // Admin or DEP or DCMC or Secretaire
      this.cols = [
        {field: 'classe.name', header: Constants.CLASSE, sortable: 'true', filter: 'true'},
        {field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true'},
        {field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true'}
      ];
    } else if (this.user.role == 2) {//teacher
      this.getCourseByTeacher(this.user);
      this.cols = [
        {field: 'classe.level.name', header: Constants.NIVEAU, sortable: 'true', filter: 'true'},
        {field: 'classe.name', header: Constants.CLASSE, sortable: 'true', filter: 'true'},
        {field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true'}
      ];
    } else if (this.user.role == 3 || this.user.role == 4) {//student or parent
      this.cols = [
        {field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true'}
      ];
    }
  }

  public setUser(user: User) {
    this.user = user;
  }
  public getAll(): void {
    this.courses = [];
    this.courseService.getAll()
      .subscribe((data: Course[]) => {
        this.courses = data
        //console.info("Courses: " + this.courses);
      },
      error => console.log(error),
      () => console.log('Get all Courses complete'));
  }

  public getCourseByTeacher(user: User): void {
    this.courses = [];
    this.courseService.getByTeacher(user)
      .subscribe((data: Course[]) => {
        this.courses = data
      },
      error => console.log(error),
      () => console.log('Get all Courses complete'));
  }

  public getCourseByStudent(user: User): void {
    this.courses = [];
    this.courseService.getByStudent(user)
      .subscribe((data: Course[]) => {
        this.courses = data
      },
      error => console.log(error),
      () => console.log('Get all Courses complete'));
  }

  public printSyllabus(): void {
    this.courseService.printSyllabus(this.user)
      .subscribe((data: string) => {
        this.reportName = data
      },
      error => console.log(error),
      () => console.log('Complete printSyllabus'));
  }
  putInTable() {
    if (this.newCourse)
      this.courses.push(this.course);
    else
      this.courses[this.findSelectedIndex()] = this.course;

    var onTheFly: Course[] = [];
    onTheFly.push(...this.courses);
    this.courses = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.courses.splice(this.findSelectedIndex(), 1);
    var onTheFly: Course[] = [];
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
    if (this.user != null && (this.user.role == 1 || this.user.role == 8 || this.user.role == 9 || this.user.role == 11)) {
      this.newCourse = false;
      this.course = this.clone(evt.data);
      if (this.course.beginDate != null) {
        this.course.beginDate = new Date(this.course.beginDate);
      }
      if (this.course.endDate != null) {
        this.course.endDate = new Date(this.course.endDate);
      }
      this.displayDialog = true;
      this.syllabusService.getSyllabuses(this.course.id + '', this.course.classe.level.id + '',
        this.course.subject.id + '')
        .subscribe((data: SyllabusView[]) => {
          this.syllabuses = data
        },
        error => console.log(error),
        () => console.log('Get syllabuses complete'));


    }
  }

  public getSyllabuses(evt) {
    this.course = evt.data;
    this.syllabusService.getSyllabuses(this.course.id + '', this.course.classe.level.id + '',
      this.course.subject.id + '')
      .subscribe((data: SyllabusView[]) => {
        this.syllabuses = data
      },
      error => console.log(error),
      () => console.log('Get syllabuses complete'));
  }



  public saveSyllabusEvent(event) {
    this.msgs = [];
    this.syllabusService.save(event.data).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(event.data)] = data;
      var onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

  public saveSyllabus(syllabusView) {
    this.msgs = [];
    var sy: SyllabusView = syllabusView;
    const dateArray = sy.syllabusDateStr.split('/');
    var fDate= new Date(dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0]+'T00:00:00');
    sy.syllabusDate=fDate;
    this.syllabusService.save(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;
      this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
  }

    handleChange(e) {
      const isChecked = e.checked;
    }
  public saveSyllabusStatus(syllabusView) {
    console.log(syllabusView);
    if(this.user.role===2 && syllabusView.status===true){
      this.confirmationService.confirm({
            message: 'Après validation vous pouvez plus modifer !',
            accept: () => {
               this.msgs = [];
    const sy: SyllabusView = syllabusView;
    const datePipe = new DatePipe('fr-FR');
    sy.syllabusDate = new Date(datePipe.transform(sy.syllabusDate, 'yyyy-MM-dd'));
    this.syllabusService.saveStatus(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;

      this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
            }
        });
    }else if(this.user.role===2 && syllabusView.status===false){
       this.msgs.push({severity: 'Echec', summary: 'Echec', detail: "Vous avez déja validé"});
    }else{
       this.msgs = [];
    const sy: SyllabusView = syllabusView;
    const datePipe = new DatePipe('fr-FR');
    sy.syllabusDate = new Date(datePipe.transform(sy.syllabusDate, 'yyyy-MM-dd'));
    this.syllabusService.saveStatus(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;

      this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
    }
 }

  public saveDelegSyllabusStatus(syllabusView) {
    this.msgs = [];
    const sy: SyllabusView = syllabusView;
    const datePipe = new DatePipe('fr-FR');
    console.log(sy.status);
    if(sy.status===false){
      this.msgs.push({severity: 'echec', summary: 'Echec', detail: "Le prof n'a pas encore valid� le chapitre"});
      this.error="Le prof n'a pas encore valid� le chapitre";
    }else{
      sy.syllabusDate = new Date(datePipe.transform(sy.syllabusDate, 'yyyy-MM-dd'));
    this.syllabusService.saveDelegStatus(sy).subscribe((data: SyllabusView) => {
      this.syllabuses[this.syllabuses.indexOf(syllabusView)] = data;
      const onTheFly: SyllabusView[] = [];
      onTheFly.push(...this.syllabuses);
      this.syllabuses = onTheFly;

      this.msgs.push({severity: 'success', summary: 'Success', detail: Constants.saveSuccess});
      console.log(data);
    },
      error => console.log(error),
      () => console.log('Save Syllabus'));
    }
 }
  clone(e: Course): Course {
    let aCourse = new Course();
    for (let prop in e) {
      aCourse[prop] = e[prop];
    }
    return aCourse;
  }

  findSelectedIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

  public searchOld() {
    this.courses = [];
    this.courseService.search(this.searchText)
      .subscribe((data: Course[]) => {
        this.courses = data
      },
      error => console.log(error),
      () => console.log('Get courses for ' + this.searchText + ' complete'));
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
}
