import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { CycleService } from '../../services/cycle.service';
import { Cycle } from '../../models/cycle';
 
@Injectable()
export class CycleDropdown {
  
  filteredCycles : Cycle[];
  cycles : Cycle[] = []; 
  
  constructor(
    private cycleService: CycleService) {
    this.getAllCycles();
  }
  
  filter(event) {
    this.filteredCycles = DropdownUtil.filter(event, this.cycles);
  }
  
  handleDropdownClick(event) {
   // this.filteredCycles = [];
    setTimeout(() => {
      this.filteredCycles = this.cycles;
    }, 10)
  }
  
  private getAllCycles(): void {
    this.cycleService.getAll()
      .subscribe((data: Cycle[]) => this.cycles = data,
      error => console.log(error),
      () => console.log('Get All Cycles Complete'));
  }
  
}