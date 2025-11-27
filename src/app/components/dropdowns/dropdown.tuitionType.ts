import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { TuitionType } from '../../models/tuitionType';
 
@Injectable()
export class TuitionTypeDropdown {
  
  filteredTuitionTypes : TuitionType[];
  tuitionTypes : TuitionType[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllTuitionTypes();
  }
  
  filter(event) {
    this.filteredTuitionTypes = DropdownUtil.filter(event, this.tuitionTypes);
  }
  
  handleDropdownClick(event) {
    //this.filteredTuitionTypes = [];
    setTimeout(() => {
      this.filteredTuitionTypes = this.tuitionTypes;
    }, 10)
  }
  
  private getAllTuitionTypes(): void {
    this.baseService.getAllTuitionTypes()
      .subscribe((data: TuitionType[]) => this.tuitionTypes = data,
      error => console.log(error),
      () => console.log('Get All TuitionTypes Complete'));
  }
  
}