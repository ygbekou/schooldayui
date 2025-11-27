import { Injectable, OnInit } from '@angular/core';
import { MaterialBrand } from 'app/models/immo/MaterialBrand';
import { MaterialBrandService } from 'app/services/immo/material-brand.service';

@Injectable()
export class MaterialBrandDropdown {

  filteredMaterialBrands: MaterialBrand[];
  MaterialBrands: MaterialBrand[] = [];

  constructor(
    private locationService: MaterialBrandService) {
    this.getAll();
  }

  filter(event) {
    this.filteredMaterialBrands = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredMaterialBrands = this.MaterialBrands;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.MaterialBrands.length; i++) {
          let a = this.MaterialBrands[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: MaterialBrand[]) => {
      this.MaterialBrands = data;
      },
        error => console.log(error),
        () => console.log('Get All MaterialBrand Complete'));
  }

}
