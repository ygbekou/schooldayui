import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { AdminUserList } from '../adminUserList';
import { ManageTeacher } from '../teacher';
import { Constants } from '../../app.constants';
import { ManageCourse } from '../manageCourse';
import { ManageTimeSheet } from '../manageTimeSheet';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AdminPresence } from '../adminPresence';


@Component({
  selector: 'app-grh-personnel-enseignant',
  templateUrl: '../../pages/grh/grhPersonnelEnseignantMenu.html',
  providers: []
})
export class GrhPersonnelEnseignantMenu implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(ManageTeacher) manageTeacher: ManageTeacher;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  @ViewChild(ManageTimeSheet) manageTimeSheet: ManageTimeSheet;

  @ViewChild(ManageCourse) manageCourse: ManageCourse;

  public user: User;
  public teacher: Teacher;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  CONTACT: string = Constants.CONTACT;

  SEARCH: string = Constants.SEARCH;
  COURSES: string = Constants.COURSES;
  TEACHER_PROFESSIONAL: string = Constants.TEACHER_PROFESSIONAL;

  constructor(private teacherService: TeacherService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.teacher = new Teacher();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminUserList.getAll(2);
    this.adminUserList.PAGE_ROLE = '2';
  }

  onUserSelected(user: User) {
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1;

    console.log(this.user);

    this.manageCourse.getCourseByTeacher(this.user);
  }

  onTabChange(evt) {
      this.activeTab = evt.index;
      console.log("this.activeTab= " + this.activeTab +' -- role ='+this.user.role);

      if (evt.index === 0) {//search
        //load users
        this.adminUserList.getAll(5);
        this.adminUserList.PAGE_ROLE = '5';
      } else if (evt.index === 1) {// Courses
          this.manageCourse.getCourseByTeacher(this.user);
      }

  }
}
