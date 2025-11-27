import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { TimeSheetEntryType } from '../../models/timeSheetEntryType';

@Injectable()
export class TimeSheetEntryTypeDropdown {

  filteredTimeSheetEntryTypes : TimeSheetEntryType[];
  timeSheetEntryTypes : TimeSheetEntryType[] = [];

  constructor(
    private baseService: BaseService) {
    this.getAllTimeSheetEntryTypes();
  }

  filter(event) {
    this.filteredTimeSheetEntryTypes = DropdownUtil.filter(event, this.timeSheetEntryTypes);
  }

  handleDropdownClick(event) {
    //this.filteredTuitionTypes = [];
    setTimeout(() => {
      this.filteredTimeSheetEntryTypes = this.timeSheetEntryTypes;
    }, 10)
  }

  private getAllTimeSheetEntryTypes(): void {
    this.baseService.getAllTimeSheetEntryTypes()
      .subscribe((data: TimeSheetEntryType[]) => this.timeSheetEntryTypes = data,
      error => console.log(error),
      () => console.log('Get All TimeSheetEntryTypes Complete'));
  }

}
