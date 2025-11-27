import { Injectable, OnInit } from '@angular/core';
import { MaterialsAcquired } from 'app/models/immo/MaterialsAcquired';
import { MaterialsAcquiredService } from 'app/services/immo/materials-acquired.service';

@Injectable()
export class MaterialsAcquiredDropdown {

  filteredMaterialsAcquireds: MaterialsAcquired[];
  MaterialsAcquireds: MaterialsAcquired[] = [];

  constructor(
    private locationService: MaterialsAcquiredService) {
    this.getAll();
  }

  filter(event) {
    this.filteredMaterialsAcquireds = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredMaterialsAcquireds = this.MaterialsAcquireds;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.MaterialsAcquireds.length; i++) {
          let a = this.MaterialsAcquireds[i];
        if (a.reference.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: MaterialsAcquired[]) => {
      this.MaterialsAcquireds = data;
      },
        error => console.log(error),
        () => console.log('Get All MaterialsAcquired Complete'));
  }

}
