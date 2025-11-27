import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import {InformationChannel} from "../../models/informationChannel";
 
@Injectable()
export class InformationChannelDropdown {
  
  filteredInformationChannels : InformationChannel[];
  informationChannels : InformationChannel[] = [];
  
  constructor(
    private baseService: BaseService) {
    this.getAllInformationChannels();
  }
  
  filter(event) {
    this.filteredInformationChannels = DropdownUtil.filter(event, this.informationChannels);
  }
  
  handleDropdownClick(event) {
    //this.filteredCategories = [];
    setTimeout(() => {
      this.filteredInformationChannels = this.informationChannels;
    }, 10)
  }
  
  private getAllInformationChannels() {
    this.baseService.getAllInformationsChannel()
      .subscribe((data: InformationChannel[]) => this.informationChannels = data,
      error => console.log(error),
      () => console.log('Get All Informations Channels Complete'));
  }
  
}