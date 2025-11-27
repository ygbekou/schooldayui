import { Injectable, OnInit } from '@angular/core';
import { Nature } from 'app/models/immo/Nature';
import { NatureService } from 'app/services/immo/nature.service';

@Injectable()
export class NatureDropdown {

  filteredNatures: Nature[];
  Natures: Nature[] = [];

  constructor(
    private locationService: NatureService) {
    this.getAll();
  }

  filter(event) {
    this.filteredNatures = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredNatures = this.Natures;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.Natures.length; i++) {
          let a = this.Natures[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: Nature[]) => {
      this.Natures = data;
      },
        error => console.log(error),
        () => console.log('Get All Nature Complete'));
  }

}
