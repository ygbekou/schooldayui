import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Constants} from '../app.constants';
import { BaseService } from '../services/base.service';

import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import { AdminAttendance } from './adminAttendance';
import { SearchAdminAttendance } from './searchAdminAttendance';
@Component({
  selector: 'app-dep-main',
  templateUrl: '../pages/depMain.html',
  providers: [SchoolYearDropdown]
})
export class DepMain implements OnInit { 
  data: any;
  currentUser: User = JSON.parse(atob(Cookie.get('user'))); 
  public error: string;
  public activeTab = 0;
  public user: User;

  VISITS: string = Constants.VISITS;
  PAYMENTS: string = Constants.PAYMENTS;
  PROGRESSION: string = Constants.PROGRESSION;
  SEARCH: string = Constants.SEARCH;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  @ViewChild(AdminAttendance) adminAttendance: AdminAttendance;
  @ViewChild(SearchAdminAttendance) searchAdminAttendance: SearchAdminAttendance;
  
  constructor( 
    private changeDetectorRef: ChangeDetectorRef,
    private baseService: BaseService) {
    this.user = new User(); 

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }  
    this.getSessionChart();
  }

  onTabChange(evt) {
    if (evt.index === 0) {
      this.getSessionChart();
    } else if (evt.index === 1) {
      //this.getPaymentGraph();
    } else if (evt.index === 2) {
      this.adminAttendance.getAllAttendances();
    }
  }


  onSubTabChange(evt) {

    if (evt.index === 0) {

    } else if (evt.index === 1) {

    } else if (evt.index === 2) {

    }
  }
 
  onUserSelected(user: User) {
    this.user = user;
    this.activeTab = 1;
    this.changeDetectorRef.detectChanges(); 
  } 

  getSessionChart() {
    this.data = null;
    try {
      this.baseService.getSessionChart().subscribe((result: any) => {
        this.data = result;
      },
        error => console.log(error),
        () => console.log('Get Session Chart Complete'));
    }
    catch (e) {
      console.log(e);
    }
  }

  selectData() {

  }
}
