import {Component, OnInit,ViewChild} from '@angular/core';

import { User } from 'app/models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ConcoursData } from './concoursData';
import { RegistrationRequestData } from './registrationRequestData';

@Component({
  selector: 'app-admin-concours',
  templateUrl: '../pages/adminConcours.html',
  providers: []
})
export class AdminConcours implements OnInit {

 currentUser: User = JSON.parse(atob(Cookie.get('user')));
 @ViewChild(ConcoursData) concoursData : ConcoursData;
 @ViewChild(RegistrationRequestData) registrationRequestData : RegistrationRequestData;


   constructor() {
    
   }
 
   ngOnInit() {
 
     this.concoursData.getAll();
     
  
  if (this.currentUser == null) {
     this.currentUser = new User();
   }
   }
 
 
   onTabChange(evt) {
    //  console.log(evt);
     if (evt.index == 0) {
       this.concoursData.getAll();
     } 
     else if (evt.index == 1) {
      this.registrationRequestData.getAll();
      
     } else if (evt.index == 2) {
      
     }  
 
  
   }  
 

}
