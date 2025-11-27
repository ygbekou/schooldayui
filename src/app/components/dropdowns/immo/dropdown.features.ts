import { Injectable, OnInit } from '@angular/core';
import { Features } from 'app/models/immo/Features';
import { FeaturesService } from 'app/services/immo/features.service';

@Injectable()
export class FeaturesDropdown {

  filteredFeaturess: Features[];
  Featuress: Features[] = [];

  constructor(
    private locationService: FeaturesService) {
    this.getAll();
  }

  filter(event) {
    this.filteredFeaturess = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredFeaturess = this.Featuress;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.Featuress.length; i++) {
          let a = this.Featuress[i];
        if (String(a.name + " : " + a.value).toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: Features[]) => {
      this.Featuress = data;
      },
        error => console.log(error),
        () => console.log('Get All Features Complete'));
  }

}
