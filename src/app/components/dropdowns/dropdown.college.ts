import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { CollegeService } from '../../services/college.service';
import { College } from '../../models/college';
 
@Injectable()
export class CollegeDropdown {
  
  filteredColleges : College[];
  colleges : College[] = []; 
  
  constructor(
    private collegeService: CollegeService) {
    this.getAllColleges();
  }
  
  filter(event) {
    this.filteredColleges = DropdownUtil.filter(event, this.colleges);
  }
  
  handleDropdownClick(event) {
    //this.filteredColleges = [];
    setTimeout(() => {
      this.filteredColleges = this.colleges;
    }, 10)
  }
  
  private getAllColleges(): void {
    this.collegeService.getAll()
      .subscribe((data: College[]) => this.colleges = data,
      error => console.log(error),
      () => console.log('Get All Colleges Complete'));
  }
  
}