import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AdminCollege } from './adminCollege';
import { AdminLevel } from './adminLevel';
import { AdminSubject } from './adminSubject';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-admin-course',
  templateUrl: '../pages/adminAcademic.html'
})
export class AdminAcademic implements OnInit {

  @ViewChild(AdminCollege) adminCollege: AdminCollege;
  @ViewChild(AdminLevel) adminLevel: AdminLevel;
  @ViewChild(AdminSubject) adminSubject: AdminSubject;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  
  public builder: string = Constants.BUILDER;
  public certification: string = Constants.CERTIFICATION;
  public subjects: string = Constants.SUBJECTS;
  
  public constants : Constants = new Constants();
  
  constructor() {

  }
  
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminCollege.getAll();
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.adminCollege.getAll();
    } else if (evt.index == 1) {
      this.adminLevel.getAll();
    } else if (evt.index == 2) {
      this.adminSubject.getAll();
    }
  }


}
