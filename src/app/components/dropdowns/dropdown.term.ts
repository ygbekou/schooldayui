import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Term } from '../../models/term';
 
@Injectable()
export class TermDropdown {
  
  filteredTerms : Term[];
  terms : Term[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllTerms();
  }
  
  filter(event) {
    this.filteredTerms = DropdownUtil.filter(event, this.terms);
    console.info("Filtered Terms: " + this.filteredTerms)
  }
  
  handleDropdownClick(event) {
    //console.info(this.terms);
    //this.filteredTerms = [];
    setTimeout(() => {
      this.filteredTerms = this.terms;
    }, 10)
    console.info("Filtered Terms: " + this.filteredTerms)
  }
  
  private getAllTerms(): void {
    console.info(this.terms);
    this.baseService.getAllTerms()
      .subscribe((data: Term[]) => this.terms = data,
      error => console.log(error),
      () => console.log('Get All Terms Complete'));
  }
  
}