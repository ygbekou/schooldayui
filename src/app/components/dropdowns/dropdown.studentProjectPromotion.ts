import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { CourseGroupeCode } from '../../models/courseGroupeCode';
import { StudentProjectPromotion } from 'app/models/studentProjectPromotion';
 
@Injectable()
export class StudentProjectPromotionDropdown {
  
  filteredstudentProjectPromotions: StudentProjectPromotion[];
  studentProjectPromotions: StudentProjectPromotion[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllStudentProjectPromotion();
  }
  
  filter(event) {
    this.filteredstudentProjectPromotions = DropdownUtil.filter(event, this.studentProjectPromotions);
    console.info("Filtered studentProjectPromotions: " + this.filteredstudentProjectPromotions)
  }
  
  handleDropdownClick(event) {
    //console.info(this.terms);
    //this.filteredTerms = [];
    setTimeout(() => {
      this.filteredstudentProjectPromotions = this.studentProjectPromotions;
    }, 10)
    console.info("Filtered studentProjectPromotions: " + this.filteredstudentProjectPromotions)
  }
  
  private getAllStudentProjectPromotion(): void {
    console.info(this.studentProjectPromotions);
    this.baseService.getAllStudentProjectPromotion()
      .subscribe((data: StudentProjectPromotion[]) => this.studentProjectPromotions = data,
      error => console.log(error),
      () => console.log('Get All studentProjectPromotions Complete'));
  }
  
}