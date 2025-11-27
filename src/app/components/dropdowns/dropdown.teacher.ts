import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher';
 
@Injectable()
export class TeacherDropdown {
  
  filteredTeachers : Teacher[];
  teachers : Teacher[] = []; 
  
  constructor(
    private teacherService: TeacherService) {
    this.getAllTeachers();
  }
  
  filter(event) {
    this.filteredTeachers = DropdownUtil.filterLastFirstName(event, this.teachers);
  }
  
  handleDropdownClick(event) {
    //this.filteredTeachers = [];
    //console.info(this.teachers);
    setTimeout(() => {
      this.filteredTeachers = this.teachers;
    }, 10)
  }
  
  private getAllTeachers(): void {
    this.teacherService.getAllActives()
      .subscribe((data: Teacher[]) => this.teachers = data,
      error => console.log(error),
      () => console.log('Get All Teachers actives Complete'));
  }
  
}