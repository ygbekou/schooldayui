import {Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies';
import { AdminSifa } from './adminSifa';
import { AdminSifa1 } from './adminSifa1';
import { AdminSifa2 } from './adminSifa2';


@Component({
  selector: 'app-adminBourseOnline',
  templateUrl: '../pages/adminBourseOnline.html',
  providers: []
})

export class AdminBourseOnline implements OnInit {

currentUser: User = JSON.parse(atob(Cookie.get('user')));
@ViewChild(AdminSifa) adminSifa : AdminSifa;
@ViewChild(AdminSifa1) adminSifa1 : AdminSifa1;
@ViewChild(AdminSifa2) adminSifa2 : AdminSifa2;


  

  constructor() {
   
  }

  ngOnInit() {

    this.adminSifa.getAll();
    this.adminSifa1.getAll();
    this.adminSifa2.getAll();
 
 if (this.currentUser == null) {
    this.currentUser = new User();
  }
  }


  onTabChange(evt) {
    console.log(evt);
    if (evt.index == 0) {
      this.adminSifa.getAll();
    } else if (evt.index == 1) {
      this.adminSifa1.getAll();
    } else if (evt.index == 2) {
      this.adminSifa2.getAll();
    }  

 
  }  



 

}
