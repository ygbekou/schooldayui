import { Injectable, OnInit } from '@angular/core';
import { Reception } from 'app/models/immo/Reception';
import { ReceptionService } from 'app/services/immo/reception.service';


@Injectable()
export class ReceptionDropdown {

  filteredReceptions: Reception[];
  receptions: Reception[] = [];

  constructor(
    private receptionService: ReceptionService) {
    this.getAll();
  }

  filter(event) {
    this.filteredReceptions = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredReceptions = this.receptions;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.receptions.length; i++) {
          let a = this.receptions[i];
        if (a.procesVerbaleNumber.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.receptionService.getAll()
      .subscribe((data: Reception[]) => {
      this.receptions = data;
      },
        error => console.log(error),
        () => console.log('Get All Reception Complete'));
  }

}
