import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { CourseService } from '../services/course.service';
import { BaseService } from '../services/base.service';


@Component({
  selector: 'app-dep-demand',
  templateUrl: '../pages/depDemand.html',
  providers: [CourseService, BaseService]
})
export class DepDemand implements OnInit, OnDestroy {
  currentUser: User;
  roles: any[] = [];
  REGISTRATION_REQUEST: string = Constants.REGISTRATION_REQUEST;
  ADD_USER: string = Constants.ADD_USER;
  SUBJECTS_INFORMATION: string = Constants.SUBJECTS_INFORMATION;

  constructor
    (
    ) {
  }

  ngOnDestroy() {
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

  }


}
