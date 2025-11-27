import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User'; 
import { Cookie } from 'ng2-cookies/ng2-cookies'; 
import { Constants } from '../app.constants';
import { AdminCourseTopic } from './adminCourseTopic';
import { AdminSyllabus } from './adminSyllabus';
import { AdminTimeTable } from './adminTimeTable';
import {AdminStudentProjectTopic} from "./adminStudentProjectTopic";
import {AdminStudentProjectPhase} from "./adminStudentProjectPhase";
import {AdminStudentProjectProject} from "./adminStudentProjectProject";
import {AdminStudentProjectCategory} from "./adminStudentProjectCategory";
 
@Component({
  selector: 'app-dep-student-project',
  templateUrl: '../pages/depStudentProject.html'
})
export class DepStudentProject implements OnInit {

  @ViewChild(AdminStudentProjectTopic) adminStudentProjectTopic: AdminStudentProjectTopic;
  @ViewChild(AdminStudentProjectPhase) adminStudentProjectPhase: AdminStudentProjectPhase;
  @ViewChild(AdminStudentProjectProject) adminStudentsProjectsTeam: AdminStudentProjectProject;
  @ViewChild(AdminStudentProjectCategory) adminStudentProjectCategory: AdminStudentProjectCategory;

  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  STUDENTS_PROJECTS_TOPIC: string = Constants.STUDENTS_PROJECTS_TOPIC;
  STUDENTS_PROJECTS_PHASE: string = Constants.STUDENTS_PROJECTS_PHASE;
  STUDENTS_PROJECTS: string = Constants.STUDENTS_PROJECTS;
  STUDENTS_PROJECTS_CATEGORY:  string = Constants.STUDENTS_PROJECTS_CATEGORY;

  constructor() {

  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    
  }

  onTabChange(evt) {
    if (evt.index == 0) {
      this.adminStudentProjectCategory.getAll();
    } else if (evt.index == 1) {
        this.adminStudentProjectPhase.getAll();
    } else if (evt.index == 2) {
        this.adminStudentProjectTopic.getAll();
    }
    else if (evt.index == 3) {
     this.adminStudentsProjectsTeam.getAll();
    } 
  }


}
