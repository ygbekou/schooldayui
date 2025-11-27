import { Injectable, OnInit } from '@angular/core';
import { Year } from 'app/models/immo/Year';
import { YearService } from 'app/services/immo/year.service';

@Injectable()
export class YearDropdown {

  filteredYears: Year[];
  Years: Year[] = [];

  constructor(
    private locationService: YearService) {
    this.getAll();
  }

  filter(event) {
    this.filteredYears = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredYears = this.Years;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.Years.length; i++) {
          let a = this.Years[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: Year[]) => {
      this.Years = data;
      },
        error => console.log(error),
        () => console.log('Get All Year Complete'));
  }

}
