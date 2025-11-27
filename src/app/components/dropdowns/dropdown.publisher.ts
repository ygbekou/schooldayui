
import { Publisher } from '../../models/publisher';
import { BaseService } from '../../services/base.service';
import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';

@Injectable()
export class PublisherDropdown {
  
  filteredPublishers : Publisher[];
  publishers : Publisher[] = []; 
  
  constructor(
    private baseService: BaseService) {
    this.getAllPublishers();
  }
  
  filter(event) {
    this.filteredPublishers = DropdownUtil.filter(event, this.publishers);
  }
  
  handleDropdownClick(event) {
    //this.filteredPublishers = [];
    setTimeout(() => {
      this.filteredPublishers = this.publishers;
    }, 10)
  }
  
  private getAllPublishers(): void {
    this.baseService.getAllPublishers()
      .subscribe((data: Publisher[]) => this.publishers = data,
      error => console.log(error),
      () => console.log('Get All Publishers Complete'));
  }
  
}