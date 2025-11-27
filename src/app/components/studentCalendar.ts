import {Constants} from '../app.constants';
import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {User} from '../models/User';
import {ScheduleEvent} from '../models/scheduleEvent';
import {StudentService} from '../services/student.service';
import {Student} from '../models/student';
import {TimeTableService} from '../services/timeTable.service';
import {School} from '../models/school';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'app-student-calendar',
  templateUrl: '../pages/studentCalendar.html',
  providers: [Constants, TimeTableService]
})

export class StudentCalendar implements OnInit {

  TIME_TABLE: string = Constants.TIME_TABLE;
  public user: User;
  public student: Student = new Student();
  events: any[] = [];
  headerConfig: any;
  school: School = new School();
  CALENDAR_LOCALE: string = Constants.CALENDAR_LOCALE;

  constructor(private studentService: StudentService,
    private baseService: BaseService,
    private timeTableService: TimeTableService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    } else {
      this.setStudent(this.user);
    }
  }

  public setStudent(aUser: User) {
    if (aUser != null && aUser.id > 0) {
      this.studentService.getByUser(aUser)
        .subscribe(result => {
          if (result) {
            this.student = result;
          }
        });

    }
  }


  ngOnInit() {

    // setting the header configuration
    this.getSchool();
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.timeTableService.getFullStudentScheduleEvents(this.user.id + '')
      .subscribe((data: ScheduleEvent[]) => {
       // console.log(data)
        this.events = data
      },
      error => console.log(error),
      () => console.log('Get schedule events complete'));
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.timeTableService.getFullStudentScheduleEvents(this.user.id + '')
        .subscribe((data: ScheduleEvent[]) => {
          this.events = data
        },
        error => console.log(error),
        () => console.log('Get schedule events complete'));
    }

  }
  public getSchool(): void {
    this.baseService.getSchool()
      .subscribe((data: School) => this.school = data,
      error => console.log(error),
      () => console.log('Get all Schools complete'));
    console.log(this.school);
  }
  selectData(event) {

  }

}
