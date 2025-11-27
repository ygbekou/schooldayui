import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Fee } from '../../models/fee';
 
@Injectable()
export class FeeDropdown {
  
  filteredFees: Fee[];
  fees: Fee[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllFees();
  }
  
  filter(event) {
    this.filteredFees = DropdownUtil.filter(event, this.fees);
    console.log("Filtered Fees: " + this.filteredFees)
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredFees = this.fees;
    }, 10)
    console.log("Filtered Fees: " + this.filteredFees)
  }
  
  private getAllFees(): void {
    console.log(this.fees);
    this.baseService.getFees()
      .subscribe((data: Fee[]) => this.fees = data,
      error => console.log(error),
      () => console.log('Get All Fees Complete'));
  }
  
}