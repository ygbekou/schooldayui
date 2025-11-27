import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CourseView } from '../models/courseView';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/User';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { Mark } from '../models/mark';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-course-results',
  templateUrl: '../pages/courseResults.html',
  providers: [CourseService, BaseService]
})
export class CourseResults implements OnInit, OnDestroy {

  public courses: CourseView[];
  public selectedCourse: CourseView = new CourseView();
  error: string = '';
  success: string = '';
  cols: any[];
  displayDialog: boolean = false; 
  user: User;
  loggedInUser:User;
  marks: Mark[];
  
  TYPE_EXAM:  string = Constants.EXAM_TYPE;

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
    this.loggedInUser=JSON.parse(atob(Cookie.get('user')));
    this.cols = [
      { field: 'code', header: Constants.CODE_COURS, sortable: 'true', filter: 'true' },
      { field: 'name', header: Constants.NOM_COURS, sortable: 'true', filter: 'true' },
      { field: 'beginDate', header: Constants.DEBUT, type: 'Date', sortable: 'true' },
      { field: 'endDate', header: Constants.FIN, type: 'Date', sortable: 'true' }
    ];
  }

  save() {
    try {
      this.error = '';
      this.courseService.saveMark(this.selectedCourse)
        .subscribe(result => {
          if (result == "Success") {
            this.getUserCourses(this.user);
            this.displayDialog = false;
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


  getUserCourses(user: User) {
    if (user != null && user.id > 0) {
      this.user = user;
      this.courseService.getUserCourses(user)
        .subscribe(result => {
          this.courses = result;
        });
    }
  }
  onRowSelect(event) {
    this.selectedCourse = event.data;
     if(this.loggedInUser.role<=2||this.loggedInUser.role==5){
      this.displayDialog = true;
     }  
  }

  getMarks(event) {
    
    this.courseService.getMarks(event.data)
      .subscribe(result => {
        this.marks = result;
        console.log(this.marks);
      });
  }

  showDialog() {
    this.displayDialog = true;
  }
  findSelectedCourseIndex(): number {
    return this.courses.indexOf(this.selectedCourse);
  }

}
