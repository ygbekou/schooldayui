import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { StudentProjectService } from '../../services/studentProject.service';
import {StudentProject} from "../../models/studentProject";
 
@Injectable()
export class StudentProjectTopicDropdown {
  
  filteredStudentProjectTopics : StudentProject[];
  studentProjectTopics : StudentProject[] = [];
  
  constructor(
    private studentProjectService: StudentProjectService) {
    this.getAllStudentProjectTopics();
  }
  
  filter(event) {
    this.filteredStudentProjectTopics = DropdownUtil.filter(event, this.studentProjectTopics);
  }
  
  handleDropdownClick(event) {
   // this.filteredLevels = [];
    setTimeout(() => {
      this.filteredStudentProjectTopics = this.studentProjectTopics;
    }, 10)
  }
  
  private getAllStudentProjectTopics(): void {
    this.studentProjectService.getAll()
      .subscribe((data: StudentProject[]) => this.studentProjectTopics = data,
      error => console.log(error),
      () => console.log('Get All StudentProjects Complete'));
  }
  
}