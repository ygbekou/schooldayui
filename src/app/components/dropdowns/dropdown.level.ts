import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { LevelService } from '../../services/level.service';
import { Level } from '../../models/level';
 
@Injectable()
export class LevelDropdown {
  
  filteredLevels : Level[];
  levels : Level[] = []; 

  filtereBoursedLevels : Level[];
  bourseLevels : Level[] = []; 

  filtereBoursedLevels2 : Level[];
  bourseLevels2 : Level[] = []; 
  
  constructor(
    private levelService: LevelService) {
    this.getAllLevels();
    this.getBourseLevels();
    this.getBourseLevels2();
  }
  
  filter(event) {
    this.filteredLevels = DropdownUtil.filter(event, this.levels);
  }

  filterBourse1(event) {
    this.filtereBoursedLevels = DropdownUtil.filter(event, this.bourseLevels);
  }

  filterBourse2(event) {
    this.filtereBoursedLevels2 = DropdownUtil.filter(event, this.bourseLevels2);
  }
  
  handleDropdownClick(event) {
   // this.filteredLevels = [];
    setTimeout(() => {
      this.filteredLevels = this.levels;
    }, 10)
  }

  handleBourseDropdownClick(event) {
    // this.filteredLevels = [];
     setTimeout(() => {
      this.filtereBoursedLevels = this.bourseLevels;
     }, 10)
   }
  
   handleBourseDropdownClick2(event) {
    // this.filteredLevels = [];
     setTimeout(() => {
      this.filtereBoursedLevels2 = this.bourseLevels2;
     }, 10)
   }
  private getAllLevels(): void {
    this.levelService.getAllActiveLevel()
      .subscribe((data: Level[]) => this.levels = data,
      error => console.log(error),
      () => console.log('Get All Levels Complete'));
  }

  private getBourseLevels(): void {
    this.levelService.getAllActiveLevel()
      .subscribe((data: Level[]) => {

        this.bourseLevels = data.filter((level)=>level.id == 212 || level.id == 215 || level.id == 219)
      },
      error => console.log(error),
      () => console.log('Get Bourses Levels Complete'));
  }

  private getBourseLevels2(): void {
    this.levelService.getAllActiveLevel()
      .subscribe((data: Level[]) => {

        this.bourseLevels2 = data.filter((level)=>level.id == 210 || level.id == 217 || level.id == 126)
      },
      error => console.log(error),
      () => console.log('Get Bourses Levels 2 Complete'));
  }
  
}