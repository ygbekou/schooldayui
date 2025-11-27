import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {UIChart} from 'primeng/primeng';
import {User} from '../models/User';
import {SchoolYear} from '../models/schoolYear';
import {Constants} from '../app.constants';
import {BaseService} from '../services/base.service';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import {Cookie} from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-student-chart',
  templateUrl: '../pages/studentCharts.html',
  providers: [SchoolYearDropdown]
})
export class StudentCharts implements OnInit {
  data: any;
  public schoolYearDropdown: SchoolYearDropdown;
  public schoolYear: SchoolYear;

  public error: string;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  AVERAGES: string = Constants.AVERAGES;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  SHOW_NOTES: string = Constants.SHOW_NOTES;
  SHOW_AVERAGES: string = Constants.SHOW_AVERAGES;
  constructor(private syDropdown: SchoolYearDropdown, private baseService: BaseService) {

    this.schoolYearDropdown = syDropdown;

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }

    this.getAvgProgress();
  }

  getMarkProgress() {
    this.error = "";
    try {
      if (this.schoolYear && this.currentUser) {
        this.baseService.getMarkProgress(this.schoolYear.id + "," + this.currentUser.id).subscribe((result: any) => {
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

  getAvgProgress() {
    this.error = "";
    try {
      if (this.currentUser) {
        console.log('getAvgProgress for user:' + this.currentUser.firstName + ' ' + this.currentUser.lastName);
        this.baseService.getAvgProgress(this.currentUser.id).subscribe((result: any) => {
          this.data = result;
        },
          error => console.log(error),
          () => console.log('getAvgProgress   Chart Complete'));
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  setUser(user: User) {
    this.error = "";
    this.currentUser = user;

  }

  selectData(event) {

  }
}
