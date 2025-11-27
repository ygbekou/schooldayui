import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { CourseGroupeCode } from '../../models/courseGroupeCode';
 
@Injectable()
export class CourseGroupeCodeDropDown {
  
  filteredcourseGroupeCodes: CourseGroupeCode[];
  courseGroupeCodes: CourseGroupeCode[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllCourseGroupeCode();
  }
  
  filter(event) {
    this.filteredcourseGroupeCodes = DropdownUtil.filter(event, this.courseGroupeCodes);
    console.info("Filtered courseGroupeCodes: " + this.filteredcourseGroupeCodes)
  }
  
  handleDropdownClick(event) {
    //console.info(this.terms);
    //this.filteredTerms = [];
    setTimeout(() => {
      this.filteredcourseGroupeCodes = this.courseGroupeCodes;
    }, 10)
    console.info("Filtered courseGroupeCodes: " + this.filteredcourseGroupeCodes)
  }
  
  private getAllCourseGroupeCode(): void {
    console.info(this.courseGroupeCodes);
    this.baseService.getAllCourseGroupeCode()
      .subscribe((data: CourseGroupeCode[]) => this.courseGroupeCodes = data,
      error => console.log(error),
      () => console.log('Get All Terms Complete'));
  }
  
}