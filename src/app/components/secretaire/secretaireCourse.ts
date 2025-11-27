import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {AdminCollege} from '../adminCollege';
import {AdminLevel} from '../adminLevel';
import {AdminCycle} from '../adminCycle';
import {AdminSubject} from '../adminSubject';
import {AdminLevelSubject} from '../adminLevelSubject';
import {User} from '../../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Constants} from '../../app.constants';
import { AdminLevelSubjectPro } from '../adminLevelSubjectPro';
@Component({
  selector: 'app-secretaire-course',
  templateUrl: '../../pages/secretaire/secretaireCourse.html'
})
export class SecretaireCourse implements OnInit {
  @ViewChild(AdminCycle) adminCycle: AdminCycle;
  @ViewChild(AdminCollege) adminCollege: AdminCollege;
  @ViewChild(AdminLevel) adminLevel: AdminLevel;
  @ViewChild(AdminSubject) adminSubject: AdminSubject;
  @ViewChild(AdminLevelSubject) adminLevelSubject: AdminLevelSubject;
  @ViewChild(AdminLevelSubjectPro) adminLevelSubjectPro: AdminLevelSubjectPro;

  lmd  = JSON.parse(Cookie.get('lmd'));
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
    this.adminCycle.getAll();
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.adminCycle.getAll();
    } else if (evt.index == 1) {
      this.adminCollege.getAll();
    } else if (evt.index == 2) {
      this.adminLevel.getAll();
    } else if (evt.index == 3) {
      this.adminSubject.getAll();
    } else if (evt.index == 4) {
      //this.adminLevelSubject.getAll();
    }
  }
}
