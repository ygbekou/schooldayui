import { Building } from '../../models/building';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
 
@Injectable()
export class BuildingDropdown {
  
  filteredBuildings : Building[];
  buildings : Building[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllBuildings();
  }
  
  filter(event) {
    this.filteredBuildings = DropdownUtil.filter(event, this.buildings);
  }
  
  handleDropdownClick(event) {
   // this.filteredBuildings = [];
    setTimeout(() => {
      this.filteredBuildings = this.buildings;
    }, 10)
  }
  
  private getAllBuildings(): void {
    this.baseService.getAllBuildings()
      .subscribe((data: Building[]) => this.buildings = data,
      error => console.log(error),
      () => console.log('Get All Buildings Complete'));
  }
  
}