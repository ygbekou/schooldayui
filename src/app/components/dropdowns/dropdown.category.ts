import { Category } from '../../models/category';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
 
@Injectable()
export class CategoryDropdown {
  
  filteredCategories : Category[];
  categories : Category[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllCategories();
  }
  
  filter(event) {
    this.filteredCategories = DropdownUtil.filter(event, this.categories);
  }
  
  handleDropdownClick(event) {
    //this.filteredCategories = [];
    setTimeout(() => {
      this.filteredCategories = this.categories;
    }, 10)
  }
  
  private getAllCategories(): void {
    this.baseService.getAllDdCategories()
      .subscribe((data: Category[]) => this.categories = data,
      error => console.log(error),
      () => console.log('Get All Categories Complete'));
  }
  
}