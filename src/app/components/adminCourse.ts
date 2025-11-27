import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {AdminCollege} from './adminCollege';
import {AdminLevel} from './adminLevel';
import {AdminLevelGlobal} from './adminLevelGlobal';
import {AdminCycle} from './adminCycle';
import {AdminSubject} from './adminSubject';
import {AdminClass} from './adminClass';
import {ManageCourse} from './manageCourse';
import {AdminStudentsCourseClass} from './adminStudentsCourseClass';
import {AdminLevelSubject} from './adminLevelSubject';
import {AdminLevelSubjectPro} from './adminLevelSubjectPro';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Constants} from '../app.constants';
import { AdminStudentsCourseClassToStudentsList } from './adminStudentsCourseClassToStudentsList';
@Component({
  selector: 'app-admin-course',
  templateUrl: '../pages/adminCourse.html'
})
export class AdminCourse implements OnInit {
  @ViewChild(AdminCycle) adminCycle: AdminCycle;
  @ViewChild(AdminCollege) adminCollege: AdminCollege;
  @ViewChild(AdminLevel) adminLevel: AdminLevel;
  @ViewChild(AdminLevelGlobal) adminAdminLevelGlobal: AdminLevelGlobal;
  @ViewChild(AdminSubject) adminSubject: AdminSubject;
  @ViewChild(AdminClass) adminClass: AdminClass;
  @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(AdminLevelSubject) adminLevelSubject: AdminLevelSubject;
  @ViewChild(AdminLevelSubjectPro) adminLevelSubjectPro: AdminLevelSubjectPro;
  @ViewChild(AdminStudentsCourseClass) adminStudentsCourseClass: AdminStudentsCourseClass;
  @ViewChild(AdminStudentsCourseClassToStudentsList) adminStudentsCourseClassToStudentsList: AdminStudentsCourseClassToStudentsList;

  lmd  = JSON.parse(Cookie.get('lmd'));
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  DEPARTMENTS: string = Constants.DEPARTMENTS;
  LEVELS: string = Constants.LEVELS;
  SUBJECTS: string = Constants.SUBJECTS;
  CLASSES: string = Constants.CLASSES;
  COURSES: string = Constants.COURSES;
  CLASSE: string = Constants.CLASSE;
  LEVEL_SUBJECTS: string = Constants.LEVEL_SUBJECTS;
  STUDENTS_COURSES_REGISTRATION: string = Constants.STUDENTS_COURSES_REGISTRATION;
  STUDENTS: string = Constants.STUDENTS;
  
  constructor() {

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminCycle.getAll();
  }

  onTabChange(evt) {
    console.log(evt);
    if (evt.index == 0) {
      this.adminCycle.getAll();
    } else if (evt.index == 1) {
      this.adminCollege.getAll();
    } else if (evt.index == 2) {
      this.adminAdminLevelGlobal.getAll();
    }  else if (evt.index == 3) {
      this.adminLevel.getAll();
    } else if (evt.index == 4) {
      this.adminSubject.getAll();
    } else if (evt.index == 5) {
      // this.adminLevelSubject.getAll();
    }  else if (evt.index == 6) {
      this.adminClass.getAll();
    } else if (evt.index == 7) {
      //this.manageCourse.getAll();
    } else if (evt.index == 8) {
      
    }
  }
}
