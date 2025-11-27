import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BaseService } from '../services/base.service';
import { SchoolYear } from '../models/schoolYear';
import { StudentCharts } from './studentCharts';
import { Constants } from '../app.constants';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';
import { StudentTuitionView } from 'app/models/studentTuitionView';
import { AdminStudentPaymentGraph } from './adminStudentPaymentGraph';
import { AdminStudentLatePayment } from './adminStudentLatePayment';
import { AdminStudentCorrectPayment } from './adminStudentCorrectPayment';
import {ManageAdminAttendance} from './manageAdminAttendance';
import { AdminAttendance } from './adminAttendance';
@Component({
  selector: 'app-admin-main',
  templateUrl: '../pages/adminMain.html',
  providers: [SchoolYearDropdown]
})
export class AdminMain implements OnInit {
  data: any;
  @ViewChild(StudentCharts) studentCharts: StudentCharts;
  @ViewChild(ManageAdminAttendance) manageAdminAttendance: ManageAdminAttendance;
  @ViewChild(AdminAttendance) adminAttendance : AdminAttendance;
  @ViewChild(AdminStudentPaymentGraph) adminStudentPaymentGraph: AdminStudentPaymentGraph;
  @ViewChild(AdminStudentLatePayment) adminStudentLatePayment: AdminStudentLatePayment;
  @ViewChild(AdminStudentCorrectPayment) adminStudentCorrectPayment: AdminStudentCorrectPayment;
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
  LATE_PAYMENTS: string = Constants.LATE_PAYMENTS;
  PROGRESSION: string = Constants.PROGRESSION;
  SEARCH: string = Constants.SEARCH;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;

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

  onTabChange(evt) {
    console.log(evt);
    if (evt.index === 0) {
      this.getSessionChart();
    } else if (evt.index === 1) {
      this.adminStudentPaymentGraph.getPaymentGraphForCurrentSchoolYear();
      /*
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
      */
    } else if (evt.index === 2) {
      this.adminStudentLatePayment.getLatePaymentForCurrentSchoolYear();
    } else if (evt.index === 3) {
      //load videos 
    }else if(evt.index===4){
      this.adminAttendance. getAllAttendances();
    }
  }


  onSubTabChange(evt) {

    if (evt.index === 0) {

    } else if (evt.index === 1) {

    } else if (evt.index === 2) {

    }else if (evt.index === 3) {

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
    this.stts = null;
    try {
      this.baseService.getLatePayments().subscribe((result: StudentTuitionView[]) => {
        this.stts = result;
        this.button = 1;
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
