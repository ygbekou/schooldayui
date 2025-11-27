import { ManageTeacherBankComponent } from './../components/manage-teacher-bank.component';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../models/User';
import { Teacher } from '../models/teacher';
import { Course } from '../models/course';
import { TeacherService } from '../services/teacher.service';
import { AdminUserList } from './adminUserList';
import { ManageTeacher } from './teacher';
import { Constants } from '../app.constants';
import { ManageCourse } from './manageCourse';
import { ManageTimeSheet } from './manageTimeSheet';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AdminPresence } from './adminPresence';
import { ManageTeacherContract } from './grh/teacherContract';
import { AdminTestimony } from './adminTestimony';
import {AdminKiosk} from './adminKiosk';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: '../pages/adminTeacher.html',
  providers: []
})
export class AdminTeacher implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(ManageTeacher) manageTeacher: ManageTeacher;
  @ViewChild(ManageTeacherBankComponent) manageTeacherBank: ManageTeacherBankComponent;
  @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  @ViewChild(ManageTimeSheet) manageTimeSheet: ManageTimeSheet;
  //@ViewChild(ManageTeacher) manageTeacherContract: ManageTeacherContract;

  @ViewChild(AdminTestimony) adminTestimony: AdminTestimony;
 @ViewChild(AdminKiosk) adminKiosk: AdminKiosk;
  public user: User;
  public teacher: Teacher;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  public course: Course;

  teacherType: string = "";

  SEARCH: string = Constants.SEARCH;
  PROFILE: string = Constants.PROFILE;
  PERSONAL: string = Constants.PERSONAL;
  CONTACT: string = Constants.CONTACT;
  PROFESSIONAL: string = Constants.PROFESSIONAL;
  CONTRACT: string = Constants.CONTRACT;
  COURSES: string = Constants.COURSES;
  FEEDBACKS: string = Constants.FEEDBACKS;
  TIME_TRACKING: string = Constants.TIME_TRACKING;
  PRESENCE: string = Constants.PRESENCE;
  AVANTAGE_VALUE: string = Constants.AVANTAGE_VALUE;
  constructor(private teacherService: TeacherService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.teacher = new Teacher();

    this.course = new Course();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminUserList.getAll(2);
    this.adminUserList.PAGE_ROLE = '2';
  }

  receiveTeacherType($event: string) {  
    this.teacherType = $event;
    //alert($event)  
  } 

  onUserSelected(user: User) {
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1;

    this.manageTeacher.setTeacher(this.user);

  }

  onCourseSelected(course: Course) {
    this.course = course;

    this.changeDetectorRef.detectChanges();
    this.activeTab = 2;

    this.manageTimeSheet.setTeacher(this.user);

  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    console.log("this.activeTab= " + this.activeTab +' -- role ='+this.user.role);
    if (this.user.role === 2) {
      if (evt.index === 0) {
        //load users
        this.adminUserList.getAll(2);
        this.adminUserList.PAGE_ROLE = '2';
      } else if (evt.index === 1) {
        //load all events

      } else if (evt.index === 2) {
        //load courses for teacher
        /* On ne souhaite plus afficher tous les cours automatiquement */
        this.manageCourse.getCourseByTeacher(this.user);
      } else if (evt.index === 3) {
        this.adminTestimony.getTestimonyByTeacher(this.user);
      }
      /* On migre la gestion des heures dans cours */
      /*else if (evt.index === 4) { //suivi de temps
        this.manageTimeSheet.setTeacher(this.user);
      }*/
      else if (evt.index === 4) {
        this.adminPresence.getUserCico(this.user);
      }

    } else {

      if (evt.index === 0) {//search
        //load users
        this.adminUserList.getAll(2);
        this.adminUserList.PAGE_ROLE = '2';
      } else if (evt.index === 1) {//profile
        //load all events

      } else if (evt.index === 2) {//feedback
        this.adminTestimony.getTestimonyByTeacher(this.user);
      } else if (evt.index === 3) {
        this.adminPresence.getUserCico(this.user);
      } else if (evt.index === 4) {

      }
       else if (evt.index === 5) {
        // this.adminKiosk.search();
      }
    }

  }
}
