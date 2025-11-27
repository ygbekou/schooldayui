import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { EventType } from '../../models/eventType';
 
@Injectable()
export class EventTypeDropdown {
  
  filteredEventTypes : EventType[];
  eventTypes : EventType[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllEventTypes();
  }
  
  filter(event) {
    this.filteredEventTypes = DropdownUtil.filter(event, this.eventTypes);
  }
  
  handleDropdownClick(event) {
    //this.filteredEventTypes = [];
    setTimeout(() => {
      this.filteredEventTypes = this.eventTypes;
    }, 10)
  }
  
  private getAllEventTypes(): void {
    this.baseService.getAllEventTypes()
      .subscribe((data: EventType[]) => this.eventTypes = data,
      error => console.log(error),
      () => console.log('Get All EventTypes Complete'));
  }
  
}