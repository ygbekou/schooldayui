import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-admin-menu',
  templateUrl: '../../pages/menu/adminMenu.html'
})
export class AdminMenu implements OnInit {

  public adminMain: string;
  public adminCourse: string;
  public adminSchedule: string;
  public adminYearInfo: string;
  public adminDemand: string;
  public adminApproval: string;
  public adminTeacher: string;
  public adminStudent: string;
  public adminParent: string;
  public adminProfile: string;
  public adminReport: string;
  public adminExam: string;
  public information: string;
  public adminLibrary: string;
  public loggedInUser: User;
  public adminFacturation: string;
  public adminStudentProject: string;
  public adminImmobilization: string;
  public adminBourseOnline: string;
  public adminConcours: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.adminMain = params['adminMain'];
        this.adminCourse = params['adminCourse'];
        this.adminSchedule = params['adminSchedule'];
        this.adminDemand = params['adminDemand'];
        this.adminYearInfo = params['adminYearInfo'];
        this.adminApproval = params['adminApproval'];
        this.adminTeacher = params['adminTeacher'];
        this.adminStudent = params['adminStudent'];
        this.adminParent = params['adminParent'];
        this.adminProfile = params['adminProfile'];
        this.information = params['information'];
        this.adminExam = params['adminExam'];
        this.adminReport = params['adminReport'];
        this.adminLibrary = params['adminLibrary'];
        this.adminFacturation = params['adminFacturation'];
        this.adminStudentProject = params['adminStudentProject'];
        this.adminImmobilization = params['adminImmobilization'];
        this.adminBourseOnline = params['adminBourseOnline'];
        this.adminConcours = params['adminConcours'];
      })
  }


}
