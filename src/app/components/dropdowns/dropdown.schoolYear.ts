import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { SchoolYear } from '../../models/schoolYear';
 
@Injectable()
export class SchoolYearDropdown {
  
  filteredSchoolYears : SchoolYear[];
  schoolYears : SchoolYear[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllSchoolYears();
  }
  
  filter(event) {
     //console.info("Initial SchoolYears: " + this.schoolYears);
          let query = event.query; 
      this.filteredSchoolYears = [];
      for(let i = 0; i < this.schoolYears.length; i++) {
          let entity = this.schoolYears[i];
          if(entity.year.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              this.filteredSchoolYears.push(entity);
          }
      }
    
    //this.filteredSchoolYears = DropdownUtil.filter(event, this.schoolYears);
    //console.info("Filtered SchoolYears: " + this.filteredSchoolYears);
  }
  
  handleDropdownClick(event) {
    //console.info(this.schoolYears);
    //this.filteredSchoolYears = [];
    setTimeout(() => {
      this.filteredSchoolYears = this.schoolYears;
    }, 10)
    //console.info("Filtered ShoolYears: " + this.filteredSchoolYears)
  }
  
  private getAllSchoolYears(): void {
    console.info(this.schoolYears);
    this.baseService.getAllSchoolYears()
      .subscribe((data: SchoolYear[]) => this.schoolYears = data.reverse(),
      error => console.log(error),
      () => console.log('Get All SchoolYears Complete'));
  }
  
}