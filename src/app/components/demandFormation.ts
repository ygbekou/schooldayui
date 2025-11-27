import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { Payment } from '../models/payment';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-demand-formation',
  templateUrl: '../pages/demandFormation.html',
  providers: [CourseService, BaseService]
})
export class DemandFormation implements OnInit, OnDestroy { 
  public courses: CourseView[];
  public selectedCourse: CourseView = new CourseView();
  error: string = '';
  success: string = '';
  cols: any[];
  displayDialog: boolean = false;
  public user: User;
  public role: string;

  APPROVE_LABEL: string = Constants.APPROVE_LABEL;
  REJECT_LABEL: string = Constants.REJECT_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  
  constructor
    (
    private courseService: CourseService,
    private baseService: BaseService
    ) {

  }

  ngOnDestroy() {
    this.courses = null;
  }
  ngOnInit() {



    this.user = JSON.parse(atob(Cookie.get('user')));
    console.log(this.user);
    if(this.user.role==3){//student
          this.cols = [
      { field: 'name', header: Constants.NOM_COURS, sortable: 'true', filter: 'true'  },
      { field: 'beginDate', header: Constants.DEBUT, type: 'Date', sortable: 'true' },
      { field: 'endDate', header: Constants.FIN, type: 'Date', sortable: 'true' }, 
      { field: 'statusDesc', header: Constants.ETAT, sortable: 'true', filter: 'true' },
      { field: 'cost', header: Constants.COST, type: 'money',sortable: 'true', filter: 'false' },
      { field: 'description', header: Constants.COMMENT}
    ];
     this.getRegistrationsByUser();
    }else{
      this.getRegistrations(0);   
          this.cols = [
      { field: 'name', header: Constants.NOM_COURS, sortable: 'true', filter: 'true'  },
      { field: 'beginDate', header: Constants.DEBUT, type: 'Date', sortable: 'true' },
      { field: 'studentName', header: Constants.STUDENT, sortable: 'true', filter: 'true' },
      { field: 'studentPhone', header: Constants.PHONE, sortable: 'true', filter: 'true' },
      { field: 'statusDesc', header: Constants.ETAT, sortable: 'true', filter: 'true' },
      { field: 'description', header: Constants.COMMENT }
    ];  
    }


  }

  approve() {
    try {
      this.error = '';

      this.courseService.approve(this.selectedCourse)
        .subscribe(result => {
          if (result == "Success") { 
            this.displayDialog = false;
            this.courses.splice(this.findSelectedCourseIndex(), 1);
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  reject() {
    try {
      this.error = '';

      this.courseService.reject(this.selectedCourse)
        .subscribe(result => {
          if (result == "Success") { 
            this.displayDialog = false;
            this.courses.splice(this.findSelectedCourseIndex(), 1);
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
        
   deleteRegistration() {
    try {
      this.error = '';

      this.courseService.deleteRegistration(this.selectedCourse)
        .subscribe(result => {
          if (result == "Success") { 
            this.displayDialog = false; 
            this.courses.splice(this.findSelectedCourseIndex(), 1);
          } else {
            this.error = result;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }       
  getRegistrations(status: number) {
    console.log('get registrations for status:' + status);
    this.courseService.getRegistrations(status)
      .subscribe(result => {
        this.courses = result;
        console.log(this.courses);
      });

  }
  
   getRegistrationsByUser() {
    console.log('get pending registrations for user:' + this.user.id); 
    this.courseService.getRegistrationsByUser(0, this.user)
      .subscribe(result => {
        this.courses = result;
        //console.log(this.courses);
      });

  }
  onRowSelect(event) {
    this.selectedCourse = event.data;
    
     if(this.user.role==1||this.user.role==5){
      this.displayDialog = true;
     } 
  }


  showDialog() {
    this.displayDialog = true;
  }
  findSelectedCourseIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

  public setStudent(user : User) {
    this.user = user;
    this.role = "student";
  }
  
}
