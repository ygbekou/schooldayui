import { Component, OnInit,LOCALE_ID, OnDestroy,ChangeDetectorRef,ViewChild } from '@angular/core';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../../models/User';
import { CourseService } from '../../services/course.service';
import { BaseService } from '../../services/base.service';
import { StudentService } from '../../services/student.service';
import { AdminSchooling } from '../adminSchooling';
import { Student } from '../../models/student';
import {SuiviInscritParClasse} from '../suiviInscritParClasse';
import { ManageStudentParent } from '../manageStudentParent';

@Component({
  selector: 'app-cpe-dashboard',
  templateUrl: '../../pages/cpe/cpeTeacher.html',
  providers: [CourseService, BaseService]
})
export class CpeTeacher implements OnInit, OnDestroy {
  currentUser: User;
  public user: User;
  public student: Student;
  roles: any[] = [];
  REGISTRATION_REQUEST: string = Constants.REGISTRATION_REQUEST;
  ADD_USER: string = Constants.ADD_USER;
  SUBJECTS_INFORMATION: string = Constants.SUBJECTS_INFORMATION;
  @ViewChild(SuiviInscritParClasse) suiviInscritParClasse: SuiviInscritParClasse;
  @ViewChild(AdminSchooling) adminSchooling: AdminSchooling;
  @ViewChild(ManageStudentParent) manageStudentParent: ManageStudentParent;
  public activeTab = 0;
  SEARCH: string = Constants.SEARCH;
  PARENT: string = Constants.PARENT;
  constructor
    (private studentService: StudentService,private changeDetectorRef: ChangeDetectorRef
    ) {
      this.user = new User();
      this.student = new Student();
  }

  ngOnDestroy() {
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

  }
  onUserSelected(user: User) {
    console.log("user on dashboard")
   
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 2;
    this.studentService.selectedStudentUserId = this.user.id;
    console.log(this.user)
    this.changeDetectorRef.detectChanges();
    this.adminSchooling.getSchoolingByStudent();
  }
  onTabChange(evt) {
    console.log("index :"+evt.index);
    this.activeTab = evt.index;
    if (evt.index === 0) {
    }  else if (evt.index === 1) {
      
    }else if (evt.index === 2) {
     // this.adminSchooling.getSchoolingByStudent();
    }
  }

  onProfileTabChange(evt){
    console.log("sous index :"+evt.index);
   
    if (evt.index === 0) {
      this.adminSchooling.getSchoolingByStudent();
    }  else if (evt.index === 1) {
      this.manageStudentParent.setStudent(this.user);
    }
  }
  
}
