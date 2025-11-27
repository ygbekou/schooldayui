
import { Language } from '../../models/language';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
 
@Injectable()
export class LanguageDropdown {
  
  filteredLanguages : Language[];
  languages : Language[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllLanguages();
  }
  
  filter(event) {
    this.filteredLanguages = DropdownUtil.filter(event, this.languages);
  }
  
  handleDropdownClick(event) {
   // this.filteredLanguages = [];
    setTimeout(() => {
      this.filteredLanguages = this.languages;
    }, 10)
  }
  
  private getAllLanguages(): void {
    this.baseService.getAllLanguages()
      .subscribe((data: Language[]) => this.languages = data,
      error => console.log(error),
      () => console.log('Get All Languages Complete'));
  }
  
}