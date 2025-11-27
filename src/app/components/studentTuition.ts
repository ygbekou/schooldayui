import { Component, OnInit,ViewChild } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Course } from '../models/course';
import { User } from '../models/User';
import { ChangeMeService } from '../services/ChangeMeService.service';
import { Constants } from '../app.constants';
import { CoursePayment } from './coursePayment';

@Component({
  selector: 'app-admin-student',
  templateUrl: '../pages/studentTuition.html',
  providers: [ChangeMeService, Constants]
})

export class StudentTuition implements OnInit {
@ViewChild(CoursePayment) coursePayment: CoursePayment;
  public user: User;

  TRAINING_AND_PAYMENTS:  string = Constants.TRAINING_AND_PAYMENTS;
  
  constructor() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
  }
  
  ngOnInit() {
    this.coursePayment.getUserCourses(this.user);  
  }
}