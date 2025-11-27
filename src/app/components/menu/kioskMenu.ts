import { User } from '../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-kiosk-menu',
  templateUrl: '../../pages/menu/kioskMenu.html'
})
export class KioskMenu implements OnInit {

  //public adminMain: string;
  public kioskMain: string;
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
        this.kioskMain = params['kioskMain'];
      })
  }


}