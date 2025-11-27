import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Parent } from '../models/parent';
import { ManageParent } from './manageParent';
import { ParentService } from '../services/parent.service';
import { AdminUserList } from './adminUserList';
import { AdminUserList2 } from './adminUserList2';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';


@Component({
  selector: 'app-admin-parent',
  templateUrl: '../pages/adminParent.html'
})
export class AdminParent implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(AdminUserList2) adminChildList: AdminUserList2;
  @ViewChild(ManageParent) manageParent: ManageParent;

  public user: User;
  public parent: Parent;
  public activeTab = 0; 
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  SEARCH: string = Constants.SEARCH;
  CHILDREN: string = Constants.CHILDREN;
  PERSONAL: string = Constants.PERSONAL;  
  CONTACT: string = Constants.CONTACT;
  OTHERS: string = Constants.OTHERS;  
  
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

  onUserSelected(user: User) {
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1;

    this.manageParent.setParent(this.user);
    this.parentService.selectedParentUserId = this.user.id; 
    this.adminChildList.getStudentUsersByParent(this.parentService.selectedParentUserId);
    
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) { 
      
    } else if (evt.index == 1) {

    } else if (evt.index == 2) {  
    
    }
  }
 

}
