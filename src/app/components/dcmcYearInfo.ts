import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AdminSchoolYear } from './adminSchoolYear';
import { AdminTerm } from './adminTerm';
import { AdminTuition } from './adminTuition';
import { AdminSchool } from './adminSchool';
import { AdminAuthor } from './adminAuthor';
import { User } from '../models/User'; 
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies'; 

@Component({
  selector: 'app-dcmc-yearinfo',
  templateUrl: '../pages/dcmcYearInfo.html'
})
export class DcmcYearInfo implements OnInit {

  @ViewChild(AdminSchoolYear) adminSchoolYear : AdminSchoolYear;
  @ViewChild(AdminTerm) adminTerm : AdminTerm;
  @ViewChild(AdminTuition) adminTuition : AdminTuition;
  @ViewChild(AdminSchool) adminSchool : AdminSchool;
  @ViewChild(AdminAuthor) adminAuthor : AdminAuthor;

  currentUser : User = JSON.parse(atob(Cookie.get('user')));
  
  SCHOOL_YEAR: string = Constants.SCHOOL_YEAR;
  PAYMENT_TRANCHES: string = Constants.PAYMENT_TRANCHES;  
  QUATER: string = Constants.QUATER;  
  REFERENCE_TABLES: string = Constants.REFERENCE_TABLES; 
  RELATION_TABLES: string = Constants.RELATION_TABLES; 
  ADDITIONAL_CONFIG: string = Constants.ADDITIONAL_CONFIG;
  AUTHOR: string = Constants.AUTEUR;
  
  constructor() {

  }
  ngOnInit() {
   if(this.currentUser==null){
    this.currentUser= new User();
   }
    //this.adminSchoolYear.getAll();
    this.adminTuition.getAll();
  }

  onTabChange(evt) {
    /*if (evt.index == 0) {
      this.adminSchoolYear.getAll();
    } else */if (evt.index == 0) { 
      this.adminTuition.getAll();
    } /*else if (evt.index == 2) {
      this.adminTerm.getAll();
    }*/ else if (evt.index == 1) {
       
    } /*else if (evt.index == 4) {
      
    } else if (evt.index == 5) {
        this.adminSchool.getAll();      
    } else if (evt.index == 6) {
      this.adminAuthor.getAll();
    } else if (evt.index == 7) {
      
    }*/
  }


}
