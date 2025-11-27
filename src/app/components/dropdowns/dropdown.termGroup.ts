import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { TermGroup } from '../../models/termGroup';
 
@Injectable()
export class TermGroupDropdown {
  
  filteredTermGroups : TermGroup[];
  termGroups : TermGroup[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllTermGroups();
  }
  
  filter(event) {
    this.filteredTermGroups = DropdownUtil.filter(event, this.termGroups);
    console.info("Filtered Terms: " + this.filteredTermGroups)
  }
  
  handleDropdownClick(event) {
    //console.info(this.termGroups);
    //this.filteredTermGroups = [];
    setTimeout(() => {
      this.filteredTermGroups = this.termGroups;
    }, 10)
    console.info("Filtered Terms: " + this.filteredTermGroups)
  }
  
  private getAllTermGroups(): void {
    console.info(this.termGroups);
    this.baseService.getAllTermGroups()
      .subscribe((data: TermGroup[]) => this.termGroups = data,
      error => console.log(error),
      () => console.log('Get All Term Groups Complete'));
  }
  
}