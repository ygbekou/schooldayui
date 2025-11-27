import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { SemestreGroupService } from '../../services/semestreGroup.service';
import { SemestreGroup } from '../../models/semestreGroup';

@Injectable()
export class SemestreGroupDropdown {

  filteredSemestreGroups : SemestreGroup[];
  semestreGroups : SemestreGroup[] = [];

  constructor(
    private semestreGroupService: SemestreGroupService) {
    this.getAllSemestreGroups();
  }

  filter(event) {
    this.filteredSemestreGroups = DropdownUtil.filter(event, this.semestreGroups);
    console.info("Filtered SemestreGroups: " + this.filteredSemestreGroups)
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredSemestreGroups = this.semestreGroups;
    }, 10)
    console.info("Filtered SemestreGroups: " + this.filteredSemestreGroups)
  }

  private getAllSemestreGroups(): void {
    console.info(this.semestreGroups);
    this.semestreGroupService.getAll()
      .subscribe((data: SemestreGroup[]) => this.semestreGroups = data,
      error => console.log(error),
      () => console.log('Get All SemestreGroups Complete'));
  }

}
