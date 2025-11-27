import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../../app.constants';
import { AdminCourseTopic } from '../adminCourseTopic';
import { AdminSyllabus } from '../adminSyllabus';
import { AdminTimeTable } from '../adminTimeTable';

@Component({
  selector: 'app-secretaire-schedule',
  templateUrl: '../../pages/secretaire/secretaireSchedule.html'
})
export class SecretaireSchedule implements OnInit {

  @ViewChild(AdminCourseTopic) adminCourseTopic: AdminCourseTopic;
  @ViewChild(AdminSyllabus) adminSyllabus: AdminSyllabus;
  @ViewChild(AdminTimeTable) adminTimeTable: AdminTimeTable;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  TOPIC: string = Constants.TOPIC;
  SYLLABUS: string = Constants.SYLLABUS;
  TIME_TABLE: string = Constants.TIME_TABLE;
  SYLLABUS_PROGRESS:  string = Constants.SYLLABUS_PROGRESS;

  constructor() {

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminCourseTopic.getSubjectLevels();
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.adminCourseTopic.getSubjectLevels();
    } else if (evt.index == 1) {
     // this.adminSyllabus.getAll();
    }
    else if (evt.index == 2) {
     // this.adminTimeTable.getAll();
    }
  }


}
