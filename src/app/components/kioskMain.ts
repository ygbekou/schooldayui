import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Constants} from '../app.constants';

import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
@Component({
  selector: 'app-kiosk-main',
  templateUrl: '../pages/kioskMain.html',
  providers: [SchoolYearDropdown]
})
export class KioskMain implements OnInit { 
  currentUser: User = JSON.parse(atob(Cookie.get('user'))); 
  public error: string;
  public activeTab = 0;
  public user: User;

  VISITS: string = Constants.VISITS;
  PAYMENTS: string = Constants.PAYMENTS;
  PROGRESSION: string = Constants.PROGRESSION;
  SEARCH: string = Constants.SEARCH;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;

  constructor( 
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User(); 

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }  
  }

  onTabChange(evt) {
    if (evt.index === 0) {
      //this.getSessionChart();
    } else if (evt.index === 1) {
      //this.getPaymentGraph();
    } else if (evt.index === 2) {
      //load videos 
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
}
