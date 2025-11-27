import { Brand } from '../../models/brand';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
 
@Injectable()
export class BrandDropdown {
  
  filteredBrands : Brand[];
  brands : Brand[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllBrands();
  }
  
  filter(event) {
    this.filteredBrands = DropdownUtil.filter(event, this.brands);
  }
  
  handleDropdownClick(event) {
    //this.filteredBrands = [];
    setTimeout(() => {
      this.filteredBrands = this.brands;
    }, 10)
  }
  
  private getAllBrands(): void {
    this.baseService.getAllBrands()
      .subscribe((data: Brand[]) => this.brands = data,
      error => console.log(error),
      () => console.log('Get All Brands Complete'));
  }
  
}