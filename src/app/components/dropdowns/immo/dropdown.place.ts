import { Injectable, OnInit } from '@angular/core';
import { Place } from 'app/models/immo/Place';
import { PlaceService } from 'app/services/immo/place.service';

@Injectable()
export class PlaceDropdown {

  filteredPlaces: Place[];
  Places: Place[] = [];

  constructor(
    private locationService: PlaceService) {
    this.getAll();
  }

  filter(event) {
    this.filteredPlaces = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredPlaces = this.Places;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.Places.length; i++) {
          let a = this.Places[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: Place[]) => {
      this.Places = data;
      },
        error => console.log(error),
        () => console.log('Get All Place Complete'));
  }

}
