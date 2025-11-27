import {
  Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild
  , Input, Output, EventEmitter
} from '@angular/core';
import { Course } from '../../models/course';
import { User } from '../../models/User';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';
import { SubjectService } from '../../services/subject.service';
import { Constants } from '../../app.constants';
import { SchoolYear } from '../../models/schoolYear';
import { Term } from '../../models/term';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { CourseView } from '../../models/courseView';
import { AnyView } from '../../models/anyView';

import { DataTableModule, DialogModule, SelectItem, Message } from 'primeng/primeng';
import { DropdownModule } from 'primeng/dropdown';

import { TimeTable } from '../../models/timeTable';
import { TimePeriod } from '../../models/timePeriod';
import { TimeTableService } from '../../services/timeTable.service';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-cpe-cours-etudiant',
  templateUrl: '../../pages/cpe/cpeCoursEtudiant.html',
  providers: [BaseService, SubjectService, Constants,
    StudentService, TimeTableService]
})

export class CpeCoursEtudiant implements OnInit, OnDestroy {
  sessionTypes: SelectItem[];
  public courses: Course[];
  public courseViews: CourseView[];
  public error: String = '';
  public selectedCourse: Course;
  displayDialogProspect: boolean;
  displayDialog: boolean;
  course: Course = new Course();
  @Input() user: User;
  newCourse: boolean;
  cols: any[];
  parentCols: any[];
  colsodia: any[];
  //public user: User = null;

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

  @Input() selectedUserT: User;
  msgs: Message[] = [];

  saving = false;
  manageTimeSheetBoolean: boolean = false;
  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;
  @Output() onCourseSelected = new EventEmitter<Course>();
  @Output() onUserSelected = new EventEmitter<User>();

  USER_SEARCH_PARTS: string = Constants.USER_SEARCH_PARTS;
  public timePeriods: SelectItem[];
  public selectedItem: SelectItem;
  timeTable: TimeTable;
  timePeriodId: string;

  public currentUser: User;
  public searchInfo: string = '';
  selectedValue: number;
  optionDate: Date = new Date();
  constructor
    (
      private baseService: BaseService,
      private timeTableService: TimeTableService,
      private studentService: StudentService
    ) {

  }
  ngOnDestroy() {

    this.timeTable = null;
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));
    this.timePeriods = this.baseService.getTimePeriodsDropDown();
    if (this.currentUser == null) {
      this.currentUser = new User();
    }


    this.cols = [
      { field: 'subject', header: 'Matière', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } },
      { field: 'beginEndPeriod', header: 'Heure', sortable: 'true', filter: 'true', style: { 'width': '18%', 'overflow': 'visible' } }
      //{ field: 'string3', header: 'Mail', sortable: 'true', filter: 'true', style: { 'width': '19%', 'overflow': 'visible' } },
      //{ field: 'status1', header: 'Présence', sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
    ];


  }

  getStudentADateCourse(any: AnyView) {
    this.studentService.getStudentADateCourse(any).subscribe(data => {
      this.courseViews = data;
    },
      (error) => {
        console.log(error.message)
      });
  }


}
