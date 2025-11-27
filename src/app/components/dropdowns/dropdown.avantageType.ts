import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { AvantageTypeService } from '../../services/grh/avantageType.service';
import { AvantageType } from 'app/models/grh/avantageType';

@Injectable()
export class AvantageTypeDropdown {

  filteredAvantageTypes: AvantageType[];
  avantageTypes: AvantageType[] = [];

  constructor(
    private avantageTypeService: AvantageTypeService) {
    this.getAllAvantageTypes();
  }

  filter(event) {
    //this.filteredAvantageTypes = DropdownUtil.filter(event, this.avantageTypes);
    this.filteredAvantageTypes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.avantageTypes);
    setTimeout(() => {
      this.filteredAvantageTypes = this.avantageTypes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredATypes = [];
      for(let i = 0; i < this.avantageTypes.length; i++) {
          let avantageType = this.avantageTypes[i];
          if(avantageType.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredATypes.push(avantageType);
          }
      }

    return filteredATypes;
  }

  /*
  public find = (avantageType: string): AvantageType => {
    for (let i: 0; i < this.avantageTypes.length; i++) {
      if (this.avantageTypes[i].wording.toLowerCase() === avantageType.toLowerCase()) {
        return this.avantageTypes[i];
      }
    }
    return null;
  }
  */

  private getAllAvantageTypes(): void {
    this.avantageTypeService.getAll()
      .subscribe((data: AvantageType[]) => {
      this.avantageTypes = data;
      },
        error => console.log(error),
        () => console.log('Get All AvantageTypes Complete'));
  }

}
