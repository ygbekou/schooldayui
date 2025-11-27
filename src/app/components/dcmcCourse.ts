import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {AdminCollege} from './adminCollege';
import {AdminLevel} from './adminLevel';
import {AdminCycle} from './adminCycle';
import {AdminSubject} from './adminSubject';
import {AdminClass} from './adminClass';
import {ManageCourse} from './manageCourse';
import {AdminLevelSubject} from './adminLevelSubject';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Constants} from '../app.constants';
@Component({
  selector: 'app-dcmc-course',
  templateUrl: '../pages/dcmcCourse.html'
})
export class DcmcCourse implements OnInit {
  /*
  @ViewChild(AdminCycle) adminCycle: AdminCycle;
  @ViewChild(AdminCollege) adminCollege: AdminCollege;
  @ViewChild(AdminLevel) adminLevel: AdminLevel;
  */
  @ViewChild(AdminClass) adminClass: AdminClass;
  @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(AdminSubject) adminSubject: AdminSubject;
  //@ViewChild(AdminLevelSubject) adminLevelSubject: AdminLevelSubject;
  
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  DEPARTMENTS: string = Constants.DEPARTMENTS;
  LEVELS: string = Constants.LEVELS;
  SUBJECTS: string = Constants.SUBJECTS;
  CLASSES: string = Constants.CLASSES;
  COURSES: string = Constants.COURSES;
  LEVEL_SUBJECTS: string = Constants.LEVEL_SUBJECTS;
  constructor() {

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    //this.adminCycle.getAll();
    //this.adminClass.getAll();
    this.adminSubject.getAll();
  }

  onTabChange(evt) {
    /*
    if (evt.index == 0) {
      this.adminCycle.getAll();
    } else if (evt.index == 1) {
      this.adminCollege.getAll();
    } else if (evt.index == 2) {
      this.adminLevel.getAll();
    } else if (evt.index == 3) {
      this.adminSubject.getAll();
    } else if (evt.index == 4) {
      this.adminLevelSubject.getAll();
    }  else */if (evt.index == 0) {
      this.adminSubject.getAll();
    } else if (evt.index == 1) {
      this.adminClass.getAll();
    } else if (evt.index == 2) {
      //this.manageCourse.getAll();
    }
  }
}
