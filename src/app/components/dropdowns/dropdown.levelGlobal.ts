import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { LevelService } from '../../services/level.service';
import { BaseService } from '../../services/base.service';
import { Level } from '../../models/level';
import { LevelGlobal } from '../../models/levelGlobal';
 
@Injectable()
export class LevelGlobalDropdown {
  
  filteredLevels : Level[];
  filteredLevelGlobals : LevelGlobal[];
  levels : Level[] = []; 
  levelGlobals: LevelGlobal[] = [];
  
  constructor(
    private levelService: LevelService,
    private baseService: BaseService) {
    this.getAllLevels();
  }
  
  filter(event) {
    this.filteredLevelGlobals = DropdownUtil.filter(event, this.levelGlobals);
  }
  
  handleDropdownClick(event) {
   // this.filteredLevels = [];
    setTimeout(() => {
      this.filteredLevelGlobals = this.levelGlobals;
    }, 10)
  }
  
  private getAllLevels(): void {
    this.baseService.getAllLevelGlobal()
      .subscribe((data: LevelGlobal[]) => this.levelGlobals = data,
      error => console.log(error),
      () => console.log('Get All Levels Complete'));
  }
  
}