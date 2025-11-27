import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { ExpenseType } from '../../models/expenseType';
 
@Injectable()
export class ExpenseTypeDropdown {
  
  filteredExpenseTypes : ExpenseType[];
  countries : ExpenseType[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllExpenseTypes();
  }
  
  filter(event) {
    this.filteredExpenseTypes = DropdownUtil.filter(event, this.countries);
    console.info("Filtered ExpenseTypes: " + this.filteredExpenseTypes)
  }
  
  handleDropdownClick(event) {
    //console.info(this.countries);
    //this.filteredExpenseTypes = [];
    setTimeout(() => {
      this.filteredExpenseTypes = this.countries;
    }, 10)
    // console.info("Filtered ExpenseTypes: " + this.filteredExpenseTypes)
  }
  
  private getAllExpenseTypes(): void {
    console.info(this.countries);
    this.baseService.getAllExpenseTypes()
      .subscribe((data: ExpenseType[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All ExpenseTypes Complete'));
  }
  
}