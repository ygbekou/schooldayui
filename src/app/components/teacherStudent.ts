import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../models/User';
import {Student} from '../models/student';
import {StudentService} from '../services/student.service';
import {AdminUserList} from './adminUserList';
import {AdminSchooling} from './adminSchooling';
import {CourseResults} from './courseResults';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {StudentCharts} from './studentCharts';
import {StudentResults} from './studentResults';
import {Constants} from '../app.constants';
import {AdminStudentCourse} from './adminStudentCourse';

@Component({
  selector: 'app-teacher-student',
  templateUrl: '../pages/teacherStudent.html'
})
export class TeacherStudent implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(AdminSchooling) adminSchooling: AdminSchooling;
  @ViewChild(CourseResults) courseResults: CourseResults;
  @ViewChild(StudentCharts) studentCharts: StudentCharts;
  @ViewChild(StudentResults) studentResults: StudentResults;
  @ViewChild(AdminStudentCourse) adminStudentCourse: AdminStudentCourse;
  public user: User;
  public student: Student;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  SEARCH: string = Constants.SEARCH;
  PROGRESSION: string = Constants.PROGRESSION;
  SCHOOL_RESULTS: string = Constants.SCHOOL_RESULTS;
  ABSENCES: string = Constants.ABSENCES;
  LMD_COURSE: string = Constants.LMD_COURSE;

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

  onUserSelected(user: User) {
    this.user = user;
    this.activeTab = 1;
    this.changeDetectorRef.detectChanges();
    this.studentCharts.setUser(this.user);
    this.studentCharts.getAvgProgress();;
    this.studentService.selectedStudentUserId = this.user.id;
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {
    } else if (evt.index == 1) {
      this.adminStudentCourse.getCourses(this.user);
    } else if (evt.index == 2) {
    } else if (evt.index == 3) {
      this.studentResults.setStudent(this.user);
    } else if (evt.index == 4) {
      //  this.adminSchooling.getUserSchoolings(this.user);  
      this.adminSchooling.getSchoolingByStudent();
    }
  }



}
