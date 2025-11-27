import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Parent } from '../models/parent';
import { ParentService } from '../services/parent.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-dcmc-report',
  templateUrl: '../pages/dcmcReport.html'
})
export class DcmcReport implements OnInit {

  public user: User;
  public parent: Parent;
  public activeTab = 0; 
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
 
  REPORT: string = Constants.REPORT; 
  
  constructor(private parentService: ParentService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.parent = new Parent();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    //this.adminUserList.getAll(4);
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) { 
      
    } else if (evt.index == 1) {

    } else if (evt.index == 2) {  
    
    }
  }
 

}
