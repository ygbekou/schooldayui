import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Avantage } from 'app/models/grh/avantage';

@Injectable()
export class AvantageDropdown {

  filteredAvantages: Avantage[];
  avantages: Avantage[] = [];

  constructor(
    private baseService: BaseService) {
    this.getAllAvantages();
  }

  filter(event) {
    this.filteredAvantages = DropdownUtil.filter(event, this.avantages);
  }

  handleDropdownClick(event) {
    console.info(this.avantages);
    setTimeout(() => {
      this.filteredAvantages = this.avantages;
    }, 10)
  }

  public find = (avantage: string): Avantage => {
    for (let i: 0; i < this.avantages.length; i++) {
      if (this.avantages[i].wording.toLowerCase() === avantage.toLowerCase()) {
        return this.avantages[i];
      }
    }
    return null;
  }

  private getAllAvantages(): void {
    this.baseService.getAllAvantages()
      .subscribe((data: Avantage[]) => {
      this.avantages = data;
      },
        error => console.log(error),
        () => console.log('Get All Avantages Complete'));
  }

}
