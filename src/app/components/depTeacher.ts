import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../services/teacher.service';
import { AdminUserList } from './adminUserList';
import { ManageTeacher } from './teacher';
import { Constants } from '../app.constants';
import { ManageCourse } from './manageCourse';
import { ManageTimeSheet } from './manageTimeSheet';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AdminPresence } from './adminPresence';
import { AdminTestimony } from './adminTestimony';

@Component({
  selector: 'app-dep-teacher',
  templateUrl: '../pages/depTeacher.html',
  providers: []
})
export class DepTeacher implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(ManageTeacher) manageTeacher: ManageTeacher;
  @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  @ViewChild(ManageTimeSheet) manageTimeSheet: ManageTimeSheet;

  @ViewChild(AdminTestimony) adminTestimony: AdminTestimony;

  public user: User;
  public teacher: Teacher;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  SEARCH: string = Constants.SEARCH;
  PROFILE: string = Constants.PROFILE;
  PERSONAL: string = Constants.PERSONAL;
  CONTACT: string = Constants.CONTACT;
  PROFESSIONAL: string = Constants.PROFESSIONAL;
  COURSES: string = Constants.COURSES;
  FEEDBACKS: string = Constants.FEEDBACKS;
  TIME_TRACKING: string = Constants.TIME_TRACKING;
  PRESENCE: string = Constants.PRESENCE;
  constructor(private teacherService: TeacherService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.teacher = new Teacher();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminUserList.getAll(2);
    this.adminUserList.PAGE_ROLE = '2';
  }

  onUserSelected(user: User) {
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1;

    this.manageTeacher.setTeacher(this.user);

  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    console.log("this.activeTab= " + this.activeTab +' -- role ='+this.user.role);
    if (this.user.role === 2 || this.user.role === 8) {
      if (evt.index === 0) {
        //load users
        this.adminUserList.getAll(2);
        this.adminUserList.PAGE_ROLE = '2';
      } else if (evt.index === 1) {
        //load all events

      } else if (evt.index === 2) {
        //load courses for teacher 
        this.manageCourse.getCourseByTeacher(this.user);
      } else if (evt.index === 3) {
        this.adminTestimony.getTestimonyByTeacher(this.user);
      } else if (evt.index === 4) { //suivi de temps  
        this.manageTimeSheet.setTeacher(this.user);
      } else if (evt.index === 5) {
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
    }

  }
}
