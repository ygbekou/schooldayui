import { Component, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { Constants } from '../app.constants';
import { UserService } from '../services/user.service';

import { AdminTestimony } from './adminTestimony';

@Component({
  selector: 'app-student-profile',
  templateUrl: '../pages/studentFeedback.html'
})
export class StudentFeedback implements OnInit {
  @ViewChild(AdminTestimony) adminTestimony: AdminTestimony;

  public user: User;

  MY_TESTIMONIES:  string = Constants.MY_TESTIMONIES;
  
  constructor() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
  }
  ngOnInit() {

    this.user = JSON.parse(atob(Cookie.get('user')));
    this.adminTestimony.setStudent(this.user);
    this.adminTestimony.getTestimonyByUser(this.user);
  }
}
