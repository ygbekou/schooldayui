import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-dep-menu',
  templateUrl: '../../pages/menu/depMenu.html'
})
export class DepMenu implements OnInit {

  //public adminMain: string;
  public depMain: string;
  public depDemand: string;
  public depCourse: string;
  public depSchedule: string;
  public depExam: string;

  public depStudentProject : string;
  public depTeacher : string;
  public depStudent : string;
  public depParent : string;
  public depProfile : string;
  public depReport : string;
  public depYearInfo : string;
  public depBourseOnline : string;
  public depRegistration : string;
  public loggedInUser: User;

  constructor(
    private route: ActivatedRoute
  ) {
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.depMain = params['depMain'];
        this.depDemand = params['depDemand'];
        this.depCourse = params['depCourse'];
        this.depStudentProject  = params['depStudentProject'];
        this.depTeacher  = params['depTeacher'];
        this.depStudent  = params['depStudent'];
        this.depParent  = params['depParent'];
        this.depProfile  = params['depProfile'];
        this.depReport  = params['depReport'];
        this.depYearInfo  = params['depYearInfo'];
        this.depSchedule = params['depSchedule'];
        this.depExam = params['depExam'];
        this.depBourseOnline = params['depBourseOnline'];
        this.depRegistration = params['depRegistration'];
      })
  }


}