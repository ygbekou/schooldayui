import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';
 
@Injectable()
export class ClassDropdown {
  
  filteredClasses : Class[];
  classes : Class[] = []; 
  
  constructor(
    private classService: ClassService) {
    this.getAllClasses();
  }
  
  filter(event) {
    this.filteredClasses = DropdownUtil.filter(event, this.classes);
  }
  
  handleDropdownClick(event) {
    // this.filteredClasses = [];
    setTimeout(() => {
      this.filteredClasses = this.classes;
    }, 10)
  }
  
  private getAllClasses(): void {
    this.classService.getAll()
      .subscribe((data: Class[]) => this.classes = data.reverse(),
      error => console.log(error),
      () => console.log('Get All Classes Complete'));
  }
  
}