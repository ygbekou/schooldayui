import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AdminTestimony } from '../adminTestimony';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../../models/User';
import { Constants } from '../../app.constants';

@Component({
  selector: 'app-secretaire-approval',
  templateUrl: '../../pages/secretaire/secretaireApproval.html'
})
export class SecretaireApproval implements OnInit {

  currentUser : User = JSON.parse(atob(Cookie.get('user')));
  public user:User;
  @ViewChild(AdminTestimony) adminTestimony : AdminTestimony;

  testimonies:  string = Constants.TESTIMONIES;

  constructor() {
    this.user = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    this.adminTestimony.setApprovedBy(this.user);
    this.adminTestimony.getAll();
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      //load testimonies
      this.adminTestimony.getAll();
    }
  }


}
