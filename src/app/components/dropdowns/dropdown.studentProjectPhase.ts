import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { StudentProjectService } from '../../services/studentProject.service';
import {StudentProjectPhase} from "../../models/studentProjectPhase";
 
@Injectable()
export class StudentProjectPhaseDropdown {
  
  filteredStudentProjectPhases : StudentProjectPhase[];
    studentProjectPhases : StudentProjectPhase[] = [];
  
  constructor(
    private studentProjectService: StudentProjectService) {
    this.getAllStudentProjectPhases();
  }
  
  filter(event) {
    this.filteredStudentProjectPhases = DropdownUtil.filter(event, this.studentProjectPhases);
  }
  
  handleDropdownClick(event) {
   // this.filteredLevels = [];
    setTimeout(() => {
      this.filteredStudentProjectPhases = this.studentProjectPhases;
    }, 10)
  }
  
  private getAllStudentProjectPhases(): void {
    this.studentProjectService.getAllPhase()
      .subscribe((data: StudentProjectPhase[]) => this.studentProjectPhases = data,
      error => console.log(error),
      () => console.log('Get All StudentProjectPhases Complete'));
  }
  
}