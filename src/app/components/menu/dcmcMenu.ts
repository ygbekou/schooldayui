import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-dcmc-menu',
  templateUrl: '../../pages/menu/dcmcMenu.html'
})
export class DcmcMenu implements OnInit {
  public dcmcMain: string;
  public dcmcDemand: string;
  public dcmcProformaFacturation: string;
  public dcmcCourse: string;
  public dcmcStudent: string;
  public dcmcProfile: string;
  public dcmcReport: string;
  public dcmcYearInfo: string;
  public dcmcBourseOnline : string;
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
        this.dcmcMain = params['dcmcMain'];
        this.dcmcDemand = params['dcmcDemand'];
        this.dcmcProformaFacturation = params['dcmcProformaFacturation'];
        this.dcmcCourse = params['dcmcCourse'];
        this.dcmcStudent = params['dcmcStudent'];
        this.dcmcProfile = params['dcmcProfile'];
        this.dcmcReport = params['dcmcReport'];
        this.dcmcYearInfo = params['dcmcYearInfo'];
        this.dcmcBourseOnline = params['dcmcBourseOnline'];
      })
  }


}