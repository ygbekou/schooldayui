import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { GrhGeneratePay } from './grhGeneratePay';
import {Constants} from '../../app.constants';

@Component({
  selector: 'app-grh-generate-pay-menu',
  templateUrl: '../../pages/grh/grhGeneratePayMenu.html',
  providers: []
})
export class GrhGeneratePayMenu implements OnInit {

    @ViewChild(GrhGeneratePay) grhGeneratePay: GrhGeneratePay;

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    PAY_MANAGEMENT: string = Constants.PAY_MANAGEMENT;

    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      this.grhGeneratePay.getAllOrderByPeriodeStartDateDesc();
    }

    onTabChange(evt) {
      if (evt.index == 0) {
         this.grhGeneratePay.getAllOrderByPeriodeStartDateDesc();
      }
    }

}
