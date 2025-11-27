import { Injectable, OnInit } from '@angular/core';
import { MaterialAcquired } from 'app/models/immo/MaterialAcquired';
import { MaterialAcquiredService } from 'app/services/immo/material-acquired.service';

@Injectable()
export class MaterialAcquiredDropdown {

  filteredMaterialAcquireds: MaterialAcquired[];
  MaterialAcquireds: MaterialAcquired[] = [];

  constructor(
    private locationService: MaterialAcquiredService) {
    this.getAll();
  }

  filter(event) {
    this.filteredMaterialAcquireds = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredMaterialAcquireds = this.MaterialAcquireds;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.MaterialAcquireds.length; i++) {
          let a = this.MaterialAcquireds[i];
        if (`${a.materialsAcquired.material.name} - ${a.identificationCode}`.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: MaterialAcquired[]) => {
      this.MaterialAcquireds = data;
      },
        error => console.log(error),
        () => console.log('Get All MaterialAcquired Complete'));
  }

}
