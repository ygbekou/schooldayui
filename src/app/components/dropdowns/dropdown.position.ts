import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position';
 
@Injectable()
export class PositionDropdown {
  
  filteredPositions : Position[];
  positions : Position[] = []; 
  
  constructor(
    private positionService: PositionService) {
    this.getAllPositions();
  }
  
  filter(event) {
    this.filteredPositions = DropdownUtil.filter(event, this.positions);
  }
  
  handleDropdownClick(event) {
   // this.filteredPositions = [];
    setTimeout(() => {
      this.filteredPositions = this.positions;
    }, 10)
  }
  
  private getAllPositions(): void {
    this.positionService.getAll()
      .subscribe((data: Position[]) => this.positions = data,
      error => console.log(error),
      () => console.log('Get All Positions Complete'));
  }
  
}