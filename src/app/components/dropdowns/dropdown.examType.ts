import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { ExamType } from '../../models/examType';
 
@Injectable()
export class ExamTypeDropdown {
  
  filteredExamTypes : ExamType[];
  examTypes : ExamType[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllExamTypes();
  }
  
  filter(event) {
    this.filteredExamTypes = DropdownUtil.filter(event, this.examTypes);
    console.info("Filtered ExamTypes: " + this.filteredExamTypes)
  }
  
  handleDropdownClick(event) {
    //console.info(this.examTypes);
    //this.filteredExamTypes = [];
    setTimeout(() => {
      this.filteredExamTypes = this.examTypes;
    }, 10)
    console.info("Filtered examTypes: " + this.filteredExamTypes)
  }
  
  private getAllExamTypes(): void {
    console.info(this.examTypes);
    this.baseService.getAllExamTypes()
      .subscribe((data: ExamType[]) => this.examTypes = data,
      error => console.log(error),
      () => console.log('Get All ExamTypes Complete'));
  }
  
}