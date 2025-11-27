import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BaseService } from '../services/base.service';
import { SchoolYear } from '../models/schoolYear';
import { StudentCharts } from './studentCharts';
import { Constants } from '../app.constants';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { StudentTuitionView } from 'app/models/studentTuitionView';

@Component({
  selector: 'app-admin-student-late-payment',
  templateUrl: '../pages/adminStudentLatePayment.html',
  providers: [SchoolYearDropdown]
})
export class AdminStudentLatePayment implements OnInit {
  data: any;
  @ViewChild(StudentCharts) studentCharts: StudentCharts;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  public schoolYearDropdown: SchoolYearDropdown;
  public schoolYear: SchoolYear;
  public error = '';
  public activeTab = 0;
  public user: User;
  button = 0;
  stts: StudentTuitionView[] = [];
  cols: any[];
  VISITS: string = Constants.VISITS;
  PAYMENTS: string = Constants.PAYMENTS;
  PROGRESSION: string = Constants.PROGRESSION;
  SEARCH: string = Constants.SEARCH;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;

  isLoadingData: boolean = true;

  constructor(syDropdown: SchoolYearDropdown,
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

    this.cols = [
      { field: 'schoolYear', header: Constants.YEAR, sortable: 'true', filter: 'true', style: {'width': '8%', 'overflow': 'visible'}  },
      { field: 'typeName', header: Constants.TUITION_TYPE, sortable: 'true', filter: 'false', style: {'width': '20%', 'overflow': 'visible'} },

      { field: 'studentLastName', header: Constants.NAME, sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}  },
      { field: 'studentFirstName', header: Constants.PRENOM, sortable: 'true', filter: 'true', style: {'width': '15%', 'overflow': 'visible'}  },
      { field: 'dueDate', header: Constants.DUE_DATE, type: 'Date', sortable: 'true' },
      { field: 'amount', header: Constants.AMOUNT, sortable: 'true' },
      { field: 'paid', header: Constants.AMOUNT_PAID, sortable: 'true' },
      { field: 'rebate', header: Constants.REBATE, sortable: 'true' },
      { field: 'balance', header: Constants.REMAINING, sortable: 'true'  },
      { field: 'studentPhone', header: Constants.STUDENT_PHONE } 
    ];
  }

  public getLatePaymentForCurrentSchoolYear() {
    if (this.schoolYear == null) {
      this.baseService.getCurrentSchoolYear().subscribe((result: SchoolYear) => {
        this.schoolYear = result;
        console.log('Fetched current SchoolYear: '+this.schoolYear.year);
        this.getLatePaymentsBySchoolYear();
      },
        error => console.log(error),
        () => console.log('getLatePaymentsBySchoolYear Complete'));
    } else {
      console.log('SchoolYear already there: '+this.schoolYear.year);
      this.getLatePaymentsBySchoolYear();
    }
  }

  onTabChange(evt) {
    if (evt.index === 0) {
      this.getSessionChart();
    } else if (evt.index === 1) {
      if (this.schoolYear == null) {
        this.baseService.getCurrentSchoolYear().subscribe((result: SchoolYear) => {
          this.schoolYear = result;
          console.log('Fetched current SchoolYear: '+this.schoolYear.year);
          this.getPaymentGraph();
        },
          error => console.log(error),
          () => console.log('getPaymentGraph   Chart Complete'));
      } else {
        console.log('SchoolYear already there: '+this.schoolYear.year);
        this.getPaymentGraph();
      }
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
      if (this.schoolYear != null) {
        this.baseService.getPaymentGraph(this.schoolYear.id).subscribe((result: any) => {
          this.data = result;
          this.button = 0;
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

  getLatePayments() {
    this.isLoadingData = true;
    this.stts = null;
    try {
      this.baseService.getLatePayments().subscribe((result: StudentTuitionView[]) => {
        this.stts = result;
        this.button = 1;
        this.isLoadingData = false;
      }, error => console.log(error),
        () => console.log('getLatePayments Complete'));
    } catch (e) {
      console.log(e);
    }
  }

  getLatePaymentsBySchoolYear() {
    this.isLoadingData = true;
    this.stts = null;
    try {
      this.baseService.getLatePaymentsBySchoolYear(this.schoolYear).subscribe((result: StudentTuitionView[]) => {
        this.stts = result;
        this.button = 1;
        this.isLoadingData = false;
      }, error => console.log(error),
        () => console.log('getLatePayments Complete'));
    } catch (e) {
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

  selectData() {

  }
}
