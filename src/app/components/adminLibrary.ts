import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Exam } from '../models/exam';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { AdminProduct } from './adminProduct';

@Component({
  selector: 'app-admin-library',
  templateUrl: '../pages/adminLibrary.html',
  providers: []
})
export class AdminLibrary implements OnInit { 

  public activeTab = 0;
  
  @ViewChild(AdminProduct) adminProduct: AdminProduct;
  currentUser: User;
  
  PRODUCT:  string = Constants.PRODUCT;
  RENTALS: string = Constants.RENTALS;
  
  constructor(private changeDetectorRef: ChangeDetectorRef) { 
  }
  ngOnInit() {
    this.currentUser= JSON.parse(atob(Cookie.get('user')));
    if (this.currentUser == null) {
      this.currentUser = new User();
    } 
    
    //this.adminProduct.getAll();
  }


  onTabChange(evt) {
    this.activeTab = evt.index; 
    if (evt.index == 0) { 
      
    } else if (evt.index == 1) { 

    } else if (evt.index == 2) { 
    
    }
  }


}
