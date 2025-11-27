import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {SchoolYear} from '../models/schoolYear';
import {StudentCharts} from './studentCharts';
import {Constants} from '../app.constants';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {BaseService} from '../services/base.service';

@Component({
  selector: 'app-dcmc-main',
  templateUrl: '../pages/dcmcMain.html',
  providers: [SchoolYearDropdown]
})
export class DcmcMain implements OnInit { 
  currentUser: User = JSON.parse(atob(Cookie.get('user'))); 
  public error: string;
  public user: User;
  data: any;
  @ViewChild(StudentCharts) studentCharts: StudentCharts;
  
  public schoolYearDropdown: SchoolYearDropdown;
  public schoolYear: SchoolYear;
  public activeTab = 0;

  VISITS: string = Constants.VISITS;
  PAYMENTS: string = Constants.PAYMENTS;
  PROGRESSION: string = Constants.PROGRESSION;
  SEARCH: string = Constants.SEARCH;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;

  constructor(
    private syDropdown: SchoolYearDropdown,
    private baseService: BaseService, 
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User(); 
    this.schoolYearDropdown = syDropdown;
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.getSessionChart();
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.getSessionChart();
    } else if (evt.index == 1) {
      this.getPaymentGraph();
    } else if (evt.index == 2) {
      //load videos 
    }
  }


  onSubTabChange(evt) {

    if (evt.index == 0) {

    } else if (evt.index == 1) {

    } else if (evt.index == 2) {

    }
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

  getPaymentGraph() {
    this.error = "";
    this.data = null;
    try {
      if (this.schoolYear!=null) {
        this.baseService.getPaymentGraph(this.schoolYear.id).subscribe((result: any) => {
          this.data = result;
        },
          error => console.log(error),
          () => console.log('getMarkProgress   Chart Complete'));
      } else {
        this.error = Constants.SELECT_YEAR;
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  onUserSelected(user: User) {
    this.user = user;
    this.activeTab = 1;
    this.changeDetectorRef.detectChanges();
    this.studentCharts.setUser(this.user);
    this.studentCharts.getAvgProgress();

  }

  selectData(event) {

  }
}
