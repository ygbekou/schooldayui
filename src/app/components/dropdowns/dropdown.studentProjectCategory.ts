import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { StudentProjectService } from '../../services/studentProject.service';
import {StudentProjectCategory} from "../../models/studentProjectCategory";
 
@Injectable()
export class StudentProjectCategoryDropdown {
  
  filteredStudentProjectCategories: StudentProjectCategory[];
    studentProjectCategories: StudentProjectCategory[] = [];
  
  constructor(
    private studentProjectService: StudentProjectService) {
    this.getAllStudentProjectCategories();
  }
  
  filter(event) {
    this.filteredStudentProjectCategories = DropdownUtil.filter(event, this.studentProjectCategories);
  }
  
  handleDropdownClick(event) {
   // this.filteredLevels = [];
    setTimeout(() => {
      this.filteredStudentProjectCategories = this.studentProjectCategories;
    }, 10)
  }
  
  public getAllStudentProjectCategories(): void {
    this.studentProjectService.getAllCategory()
      .subscribe((data: StudentProjectCategory[]) => this.studentProjectCategories = data,
      error => console.log(error),
      () => console.log('Get All StudentProjectCategories Complete'));
  }
  
}