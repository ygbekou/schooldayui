import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-cpe-menu',
  templateUrl: '../../pages/menu/cpeMenu.html'
})
export class CpeMenu implements OnInit {

  public cpeDashboard: string;
  public cpeProfile : string;
  public cpeTeacher: string;
  public cpeAdminSchedule: string;

  public loggedInUser: User;

  constructor(
    private route: ActivatedRoute
  ) {
    //this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.cpeDashboard = params['cpeDashboard'];
        this.cpeProfile  = params['cpeProfile'];
        this.cpeTeacher = params['cpeTeacher'];
        this.cpeAdminSchedule = params['cpeAdminSchedule'];
      })
  }

}
