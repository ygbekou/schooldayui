import { Component, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Course } from '../models/course';
import { User } from '../models/User';
import { ManageCourse } from './manageCourse';
import { AdminTestimony } from './adminTestimony';
import { ChangeMeService } from '../services/ChangeMeService.service';
import { Constants } from '../app.constants';
import { ManageTimeSheet } from "./manageTimeSheet";
import { AdminPresence } from './adminPresence';
import { ManageAttendance } from './manageAttendance';
import { CalculCourseHours } from './calculCourseHours';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: '../pages/teacherMain.html',
  providers: [ChangeMeService, Constants]
})
export class TeacherMain implements OnInit {
  public user: User;
  // @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(AdminTestimony) adminTestimony: AdminTestimony;
  @ViewChild(ManageTimeSheet) manageTimeSheet: ManageTimeSheet;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  @ViewChild(ManageAttendance) manageAttendance: ManageAttendance;
  @ViewChild(CalculCourseHours) calculCourseHours: CalculCourseHours;

  MY_COURSES: string = Constants.COURSES;
  FEEDBACKS: string = Constants.FEEDBACKS;
  SYLLABUS: string = Constants.SYLLABUS;
  TIME_TRACKING: string = Constants.TIME_TRACKING;
  PRESENCE: string = Constants.PRESENCE;
  STUDENT_PRESENCE: string = Constants.STUDENT_PRESENCE;

  constructor() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
  }

  ngOnInit() {
    //this.manageCourse.getCourseByTeacher(this.user);
    this.adminTestimony.getTestimonyByTeacher(this.user);
  }

  onTabChange(evt) {
    console.log(evt.index);
    if (evt.index === 2) {
      this.manageTimeSheet.setTeacher(this.user);
    } else if (evt.index === 3) {
      this.adminPresence.getUserCico(this.user);
    }else if(evt.index===4){
      this.manageAttendance.setTeacher(this.user);
    }else if(evt.index===5){
      this.calculCourseHours.setTeacher(this.user);
    }
  }
}
