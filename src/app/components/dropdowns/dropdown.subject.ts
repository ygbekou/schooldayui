import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { SubjectService } from '../../services/subject.service';
import { Subject } from '../../models/subject';
 
@Injectable()
export class SubjectDropdown {
  
  filteredSubjects : Subject[];
  subjects : Subject[] = []; 
  
  constructor(
    private subjectService: SubjectService) {
    this.getAllSubjects();
  }
  
  filter(event) {
    this.filteredSubjects = DropdownUtil.filter(event, this.subjects);
    console.info("Filtered Subjects: " + this.filteredSubjects)
  }
  
  handleDropdownClick(event) {
    //console.info(this.subjects);
    //this.filteredSubjects = [];
    setTimeout(() => {
      this.filteredSubjects = this.subjects;
    }, 10)
    console.info("Filtered Subjects: " + this.filteredSubjects)
  }
  
  private getAllSubjects(): void {
    console.info(this.subjects);
    this.subjectService.getAll()
      .subscribe((data: Subject[]) => this.subjects = data,
      error => console.log(error),
      () => console.log('Get All Subjects Complete'));
  }
  
}