import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Student} from '../models/student';
import {StudentService} from '../services/student.service';
import {AdminUserList} from './adminUserList';
import {AdminRegistration} from './adminRegistration';
import {AdminSchooling} from './adminSchooling';
import {StudentResults} from './studentResults';
import {StudentCharts} from './studentCharts';
import {Constants} from '../app.constants';
import { ScheduleEvent } from '../models/scheduleEvent';
import { School } from '../models/school';
import {AdminSyllabus} from './adminSyllabus';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {TimeTableService} from '../services/timeTable.service';
import {BaseService} from '../services/base.service';
import { SearchStudentAttendance } from './searchStudentAttendance';
import { StudentAttendance } from './studentAttendance';
@Component({
  selector: 'app-parent-main',
  templateUrl: '../pages/parentMain.html',
   providers: [TimeTableService]
})
export class ParentMain implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(AdminRegistration) adminRegistration: AdminRegistration;
  @ViewChild(AdminSchooling) adminSchooling: AdminSchooling;
  @ViewChild(StudentResults) studentResults: StudentResults;
  @ViewChild(StudentCharts) studentCharts: StudentCharts;
  @ViewChild(AdminSyllabus) adminSyllabus: AdminSyllabus;
  @ViewChild(StudentAttendance) studentAttendance: StudentAttendance;
  @ViewChild(SearchStudentAttendance) searchStudentAttendance: SearchStudentAttendance;
  public activeTab = 0;
  public user: User;
  public student: Student;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  events: any[] = [];
  headerConfig: any;
  school: School = new School();
  PROGRESSION: string = Constants.PROGRESSION;
  INSCRIPTION_PAYMENT: string = Constants.INSCRIPTION_PAYMENT;
  SCHOOL_RESULTS: string = Constants.SCHOOL_RESULTS;
  ABSENCES: string = Constants.ABSENCES;
  MY_CHILDREN: string = Constants.MY_CHILDREN;
  SYLLABUS: string = Constants.SYLLABUS;
  TIME_TABLE: string = Constants.TIME_TABLE;

  constructor(private studentService: StudentService,
    private timeTableService: TimeTableService,
    private baseService: BaseService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.student = new Student();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminUserList.getStudentUsersByParent(this.currentUser.id);

    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
this.getSchool();
  }

  onUserSelected(user: User) {
    this.user = user;
    this.activeTab = 1;
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.adminUserList.getStudentUsersByParent(this.currentUser.id);
    } else if (evt.index == 1) {
      this.studentCharts.setUser(this.user);
      this.studentCharts.getAvgProgress();
    } else if (evt.index == 2) {
      this.adminRegistration.getEnrollments(this.user);
    } else if (evt.index == 3) {
      this.studentResults.setStudent(this.user);
    } else if (evt.index == 4) {
      this.adminSchooling.getUserSchoolings(this.user);
    } else if (evt.index == 5) {
       this.adminSyllabus.setUser(this.user);
      this.adminSyllabus.getCourseByStudent(this.user);
    } else if (evt.index == 6) {
          this.timeTableService.getFullStudentScheduleEvents(this.user.id + '')
      .subscribe((data: ScheduleEvent[]) => {
       // console.log(data)
        this.events = data
      },
      error => console.log(error),
      () => console.log('Get schedule events complete'));
    }else if(evt.index == 7){
      this.studentAttendance.setStudent(this.user);
      this.searchStudentAttendance.setStudent(this.user);
    }
  }

    public getSchool(): void {
    this.baseService.getSchool()
      .subscribe((data: School) => this.school = data,
      error => console.log(error),
      () => console.log('Get all Schools complete'));
    console.log(this.school);
  }

}
