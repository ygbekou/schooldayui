import { Component,LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { Constants } from '../app.constants';
import { UserService } from '../services/user.service';

import { DemandFormation } from './demandFormation';

@Component({
  selector: 'app-student-demand-formation',
  templateUrl: '../pages/studentDemandFormation.html',
  providers: [{ provide: LOCALE_ID, useValue: Constants.LOCALE}]
})
export class StudentDemandFormation implements OnInit {
  @ViewChild(DemandFormation) demandFormation: DemandFormation;

  public user: User;
  LMD_COURSE: string = Constants.LMD_COURSE;
  REGISTRATION_REQUEST:  string = Constants.REGISTRATION_REQUEST;

  constructor() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user'))); 
  }
}
