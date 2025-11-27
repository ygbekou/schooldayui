import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Course} from '../models/course';
import {User} from '../models/User';
import {CourseService} from '../services/course.service';
import {TimeTableService} from '../services/timeTable.service';
import {BaseService} from '../services/base.service';
import {Constants} from '../app.constants';
import {SchoolYear} from '../models/schoolYear';
import {Term} from '../models/term';
import {TimeTable} from '../models/timeTable';
import {TimeTableView} from '../models/timeTableView';
import {ScheduleEvent} from '../models/scheduleEvent';
import {School} from '../models/school';
import {TimePeriod} from '../models/timePeriod';
import {Weekday} from '../models/weekday';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {TermDropdown} from './dropdowns/dropdown.term';
import {BuildingDropdown} from './dropdowns/dropdown.building';
import {RoomDropdown} from './dropdowns/dropdown.room';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/primeng';
import {DataTableModule, DialogModule, SelectItem, SpinnerModule, ScheduleModule, CalendarModule} from 'primeng/primeng';

@Component({
  selector: 'app-admin-time-table',
  templateUrl: '../pages/adminTimeTable.html',
  providers: [BaseService, CourseService, TimeTableService, Constants, TermDropdown, SchoolYearDropdown, BuildingDropdown, RoomDropdown]
})

export class AdminTimeTable implements OnInit, OnDestroy {
  school: School = new School();
  public courses: Course[];
  public timeTables: TimeTableView[];
  public error: String = '';
  public msg: String = "";
  public term: Term;
  public selectedCourse: Course;
  public selectedTimeTable: TimeTableView;
  displayDialog: boolean;
  displayTimeTableDialog: boolean;
  displayTimeTableDialogClass: boolean
  timeTable: TimeTable;
  newTimeTable: boolean;
  cols: any[];
  public weekDays: SelectItem[];
  public timePeriods: SelectItem[];
  public user: User;
  public schoolYearDropdown: SchoolYearDropdown;
  public termDropdown: TermDropdown;
  public buildingDropdown: BuildingDropdown;
  public roomDropdown: RoomDropdown;
  public status=false;

  DETAIL: string = Constants.DETAIL;
  LEVELS: string = Constants.LEVELS;
  SUBJECT: string = Constants.SUBJECT;
  NAME: string = Constants.NAME;
  DESCRIPTION: string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  CLOSE_LABEL: string = Constants.CLOSE_LABEL;
  COURSE_VIEW_LABEL: string = Constants.COURSE_VIEW_LABEL;
  CLASS_VIEW_LABEL: string = Constants.CLASS_VIEW_LABEL;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TERM: string = Constants.TERM;
  isCourse: boolean = false;
  events: any[] = [];
  headerConfig: any;
  options: any;
  public searchText: string;
  COURSE_SEARCH_TEXT: string = Constants.COURSE_SEARCH_TEXT;

  /* Update 11022020 */

  theTerm: Term;
  theSchoolYear: SchoolYear;
  theSchoolYearTimeTable: SchoolYear;
  msgs: Message[] = [];

  /* End Update 11022020 */

  constructor
    (
    private baseService: BaseService,
    private courseService: CourseService,
    private timeTableService: TimeTableService,
    private syDropdown: SchoolYearDropdown,
    private tmDropdown: TermDropdown,
    private bldDropdown: BuildingDropdown,
    private rmDropdown: RoomDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.schoolYearDropdown = syDropdown;
    this.termDropdown = tmDropdown;
    this.buildingDropdown = bldDropdown;
    this.roomDropdown = rmDropdown;
  }

  ngOnDestroy() {
    this.timeTables = null;
    this.error = null;
    this.selectedTimeTable = null;
    this.timeTable = null;
    this.cols = null;
  }

  ngOnInit() {
    this.getSchool();
    this.headerConfig = {
      left: '',
      center: 'title',
      right: 'agendaWeek'
    };

    this.options = {
      firstDay: '1'
    };

    this.user = JSON.parse(atob(Cookie.get('user')));
    this.selectedCourse = new Course();
    if (this.user == null) {
      this.user = new User();
    }

    this.weekDays = this.baseService.getWeekDaysDropDown();

    this.timePeriods = this.baseService.getTimePeriodsDropDown();

    this.cols = [
      {field: 'classe.name', header: Constants.CLASSE, type: 'Classe', sortable: 'true', filter: 'true'},
      {field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true'},
      {field: 'teacher.name', header: Constants.PROF, sortable: 'false', filter: 'true'},
    ];

  }

  public getSchool(): void {
    this.baseService.getSchool()
      .subscribe((data: School) => {
        this.school = data;
        console.log(data);
        console.log(this.school.beginTime + "/" + this.school.endTime);
      },
      error => console.log(error),
      () => console.log('Get all Schools complete'));
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

  public getTimeTables(evt) {

    this.selectedCourse = evt.data;

    this.timeTableService.getTimeTables(
      this.selectedCourse.id + '')
      .subscribe((data: TimeTableView[]) => {
        evt.data.timeTables = data
      },
      error => console.log(error),
      () => console.log('Get time tables complete'));

  }

  showDialogToAdd() {
    if (this.user != null && (this.user.role == 1||this.user.role == 5||this.user.role == 8||this.user.role == 11||this.user.role == 14)) {
      this.newTimeTable = true;
      this.timeTable = new TimeTable();
      this.timeTable.course = new Course();
      this.timeTable.weekday = new Weekday();
      this.timeTable.timePeriod = new TimePeriod();
      this.displayDialog = true;
    }
  }

  getTimeTable() {

    if (this.isCourse) {
      //Pour afficher l'emploi du temps d'un cours, il faut choisir le semestre
      if(this.theSchoolYearTimeTable == null || this.term == null)
      {
        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Choisissez le semestre !' });
      }
      else {
      this.timeTableService.getScheduleEvents(
        this.selectedCourse.id, this.term.id)
        .subscribe((data: ScheduleEvent[]) => {
          this.events = data
        },
        error => console.log(error),
        () => console.log('Get schedule events complete'));
      }
    } else {
      //Pour afficher l'emploi du temps d'une classe, il faut choisir l'année et le semestre
      if(this.theSchoolYearTimeTable == null || this.term == null)
      {
        this.msgs.push({ severity: 'danger', summary: 'Echec', detail: 'Choisissez l\'année et le semestre !' });
      }
      else {
        this.timeTableService.getClassScheduleEventsTimeTable(this.selectedCourse.classe.id, this.theSchoolYearTimeTable.id, this.term.id)
          .subscribe((data: ScheduleEvent[]) => {
            this.events = data;
          },
          error => console.log(error),
          () => console.log('Get schedule events complete'));
      }
    }
  }

  showDialogToViewTimeTable() {
    if (this.user != null && (this.user.role == 1||this.user.role == 5||this.user.role == 8||this.user.role == 11)) {
      this.isCourse = true;
      this.events = [];
      this.term = null;
      this.displayTimeTableDialog = true;
      this.displayTimeTableDialogClass = false;
    }
  }

  showDialogToViewClassTimeTable(classId: number) {
    if (this.user != null && this.user.role == 1||this.user.role == 8||this.user.role == 11) {
      this.isCourse = false;
      this.events = [];
      this.term = null;
      this.displayTimeTableDialog = true;
      this.displayTimeTableDialogClass = true;
    }
  }

  save() {
    console.log(this.timeTable.timePeriod.id);
    try {
      this.error = '';
      this.msg = "";
      this.timeTable.course.id = this.selectedCourse.id;

      if(this.timeTable.catch_up == false){
        this.timeTable.dateCatchUpCourse = null;
      }
      if(this.timeTable.catch_up == true && this.timeTable.dateCatchUpCourse == null){
        this.error = Constants.saveFailed
      }else{

        this.timeTableService.save(this.timeTable)
        .subscribe(result => {
          if (result.id > 0) {
            this.putInTable();
            this.msg = Constants.saveSuccess
            this.timeTable = new TimeTable();
            this.timeTable.weekday = new Weekday();
            this.timeTable.timePeriod = new TimePeriod();
          }
          else {
            this.error = Constants.saveFailed
          }
        })

      }
    }
    catch (e) {
      console.log(e);
    }
  }


  delete() {
    try {
      this.error = '';
      this.msg = "";
      this.timeTableService.delete(this.timeTable)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
            this.msg = Constants.deleteSuccess;
            this.timeTable = new TimeTable();
            this.timeTable.weekday = new Weekday();
            this.timeTable.timePeriod = new TimePeriod();
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  close() {
    this.displayDialog = false;
  }
  putInTable() {
    let index = this.findSelectedIndex();
    if (this.newTimeTable)
      this.selectedCourse.timeTables.push(this.cloneReverse(this.timeTable));
    else {
      this.selectedCourse.timeTables[this.findChildSelectedIndex()] = this.cloneReverse(this.timeTable);
    }

    var onTheFly: TimeTableView[] = [];
    onTheFly.push(...this.selectedCourse.timeTables);
    this.selectedCourse.timeTables = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    let index = this.findSelectedIndex();
    this.selectedCourse = this.courses.find(x => x == this.selectedCourse);
    this.selectedCourse.timeTables.splice(this.findChildSelectedIndex(), 1);
    var onTheFly: TimeTableView[] = [];
    onTheFly.push(...this.selectedCourse.timeTables);
    this.selectedCourse.timeTables = onTheFly;
    this.resetData();
  }

  resetData() {
    //this.timeTable = null;
    //this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.msg=null;
    if (this.user != null && (this.user.role == 1||this.user.role == 5||this.user.role == 8||this.user.role == 11)) {
      this.newTimeTable = false;
      this.timeTable = this.clone(evt.data);
      if(this.timeTable.dateCatchUpCourse)
        this.timeTable.dateCatchUpCourse = new Date(this.timeTable.dateCatchUpCourse)
      if(this.timeTable.dateCatchUpCourse)
        // this.timeTable.isActive=true;
        this.timeTable.catch_up=true;
      this.displayDialog = true;
    }
  }

  cloneReverse(e: TimeTable): TimeTableView {
    let aTimeTableView = new TimeTableView();
    for (let prop in e) {
      aTimeTableView[prop] = e[prop];
    }
    aTimeTableView.termId = e.term.id;
    aTimeTableView.termName = e.term.name;

    aTimeTableView.weekdayId = e.weekday.id;
    aTimeTableView.weekdayName = this.baseService.DAYS_MAP[e.weekday.id];
    aTimeTableView.timePeriodDescription = this.baseService.TIME_PERIOD_MAP[e.timePeriod.id];

    return aTimeTableView;
  }

  clone(e: TimeTableView): TimeTable {
    let aTimeTable = new TimeTable();
    for (let prop in e) {
      aTimeTable[prop] = e[prop];
    }

    aTimeTable.course = new Course();
    aTimeTable.course.id = e.courseId;

    aTimeTable.term = new Term();
    aTimeTable.term.id = e.termId;
    aTimeTable.term.name = e.termName;

    aTimeTable.weekday = new Weekday();
    aTimeTable.weekday.id = e.weekdayId;
    aTimeTable.weekday.name = e.weekdayName;

    aTimeTable.timePeriod = new TimePeriod();
    aTimeTable.timePeriod.id = e.timePeriodId;

    return aTimeTable;
  }


  cloneCourse(e: Course): Course {
    let aCourse = new Course();
    for (let prop in e) {
      aCourse[prop] = e[prop];
    }
    return aCourse;
  }

  findSelectedIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

  findChildSelectedIndex(): number {
    return this.selectedCourse.timeTables.indexOf(this.selectedTimeTable);
  }

  public search() {
    this.courses = [];
    /*
    this.courseService.search(this.searchText)
      .subscribe((data: Course[]) => {
        this.courses = data
      },
      error => console.log(error),
      () => console.log('Get courses for ' + this.searchText + ' complete'));
      */

      this.courseService.search((this.theSchoolYear == null ? 0 : this.theSchoolYear.id) + '|' + (this.theTerm == null ? 0 : this.theTerm.id) + '|' + this.searchText)
        .subscribe((data: Course[]) => {
          this.courses = data
        },
        error => console.log(error),
        () => console.log('Get courses for ' + this.searchText + ' complete'));
  }

  public clearSelectedRoom() {
    this.timeTable.room = null;
  }
}
