import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { AvantageService } from '../../../services/grh/avantage.service';
import { Avantage } from 'app/models/grh/avantage';

@Injectable()
export class AvantageDropdown {

  filteredAvantages: Avantage[];
  avantages: Avantage[] = [];

  constructor(
    private avantageService: AvantageService) {
    this.getAllAvantages();
  }

  filter(event) {
    this.filteredAvantages = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.avantages);
    setTimeout(() => {
      this.filteredAvantages = this.avantages;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.avantages.length; i++) {
          let a = this.avantages[i];
          if(a.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  private getAllAvantages(): void {
    this.avantageService.getAll()
      .subscribe((data: Avantage[]) => {
      this.avantages = data;
      },
        error => console.log(error),
        () => console.log('Get All Avantages Complete'));
  }

}
