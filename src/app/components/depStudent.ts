import { Component,LOCALE_ID,OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { AdminUserList } from './adminUserList';
import { ManageStudent } from './manageStudent';
import { ManageCourse } from './manageCourse';
import { CoursePayment } from './coursePayment';
import { AdminRegistration } from './adminRegistration';
import { AdminSchooling } from './adminSchooling';
import { AdminStudentCourse } from './adminStudentCourse';
import { AdminPrerequisitWaiver } from './adminPrerequisitWaiver';
import { StudentResults } from './studentResults';
import { StudentDocs } from './studentDocs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';
import { AdminPresence } from './adminPresence';

@Component({
  selector: 'app-dep-student',
  templateUrl: '../pages/depStudent.html',
  providers: [{ provide: LOCALE_ID, useValue: Constants.LOCALE} ]
})
export class DepStudent implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(ManageStudent) manageStudent: ManageStudent;
  @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(CoursePayment) coursePayment: CoursePayment;
  @ViewChild(AdminRegistration) adminRegistration: AdminRegistration;
  @ViewChild(AdminSchooling) adminSchooling: AdminSchooling;
  @ViewChild(StudentResults) studentResults: StudentResults;
  @ViewChild(StudentDocs) studentDocs: StudentDocs;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  @ViewChild(AdminPrerequisitWaiver) adminPrerequisitWaiver: AdminPrerequisitWaiver;
  @ViewChild(AdminStudentCourse) adminStudentCourse: AdminStudentCourse;
  public user: User;
  public student: Student;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));
  lmd = JSON.parse(Cookie.get('lmd'));
  SEARCH: string = Constants.SEARCH;
  PROFILE: string = Constants.PROFILE;
  PERSONAL: string = Constants.PERSONAL;
  CONTACT: string = Constants.CONTACT;
  SCHOOLING: string = Constants.SCHOOLING;
  INSCRIPTION_PAYMENT: string = Constants.INSCRIPTION_PAYMENT;
  SCHOOL_RESULTS: string = Constants.SCHOOL_RESULTS;
  ABSENCES: string = Constants.ABSENCES;
  COURSES: string = Constants.COURSES;
  LMD_COURSE: string = Constants.LMD_COURSE;
  PRESENCES: string = Constants.PRESENCE;
  constructor(private studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.student = new Student();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminUserList.getAll(3);
    this.adminUserList.PAGE_ROLE = '3';
  }

  onUserSelected(user: User) {
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1; 
    this.manageStudent.setStudent(this.user); 
    this.studentDocs.setStudent(this.user);
    this.adminPrerequisitWaiver.setStudent(this.user);
    this.studentService.selectedStudentUserId = this.user.id;
    this.changeDetectorRef.detectChanges();
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index === 0) {
    } else if (evt.index === 1) {
    } else if (evt.index === 2) {
      this.adminRegistration.getEnrollments(this.user);
    }else if (evt.index === 3) {
      this.adminStudentCourse.getCourses(this.user);
      this.adminStudentCourse.setStudent(this.user);
    } else if (evt.index === 4) {
      this.studentResults.setStudent(this.user);
    } else if (evt.index === 5) {
      this.adminSchooling.getSchoolingByStudent();
    }else if (evt.index === 6) {
      this.studentDocs.getDocuments(null);
    } else if (evt.index === 7) {
      this.adminPrerequisitWaiver.getWaiverByStudent();
    } else if (evt.index === 8) {
      this.adminPresence.getUserCico(this.user);
    }
  }


}
