import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { GrhSurveillantPayManagement } from './grhSurveillantPayManagement';
import {Constants} from '../../app.constants';

@Component({
  selector: 'app-grh-surveillant-management-menu',
  templateUrl: '../../pages/grh/grhSurveillantManagementMenu.html',
  providers: []
})
export class GrhSurveillantManagementMenu implements OnInit {

    @ViewChild(GrhSurveillantPayManagement) grhSurveillantPayManagement: GrhSurveillantPayManagement;

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    PAY_MANAGEMENT: string = Constants.PAY_MANAGEMENT;

    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      this.grhSurveillantPayManagement.getAll();
    }

    onTabChange(evt) {
      if (evt.index == 0) {
         this.grhSurveillantPayManagement.getAll();
      }
    }

}
