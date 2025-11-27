import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { AdminUserList } from './adminUserList';
import { AdminSchooling } from './adminSchooling';
import { CourseResults } from './courseResults';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { StudentCharts } from './studentCharts';
import { StudentResults } from './studentResults';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-teacher-student',
  templateUrl: '../pages/teacherGrade.html'
})
export class TeacherGrade implements OnInit {

  @ViewChild(CourseResults) courseResults: CourseResults;
  @ViewChild(StudentResults) studentResults: StudentResults;
  
  ENTER_NOTES:  string = Constants.ENTER_NOTES;

  public user: User;
  public student: Student;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  constructor(private studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.student = new Student();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
  }


  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {

    } else if (evt.index == 1) {

    }
  }
}
