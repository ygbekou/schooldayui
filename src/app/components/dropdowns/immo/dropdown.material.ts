import { Injectable, OnInit } from '@angular/core';
import { Material } from 'app/models/immo/Material';
import { MaterialService } from 'app/services/immo/material.service';

@Injectable()
export class MaterialDropdown {

  filteredMaterials: Material[];
  Materials: Material[] = [];

  constructor(
    private locationService: MaterialService) {
    this.getAll();
  }

  filter(event) {
    this.filteredMaterials = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredMaterials = this.Materials;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.Materials.length; i++) {
          let a = this.Materials[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: Material[]) => {
      this.Materials = data;
      },
        error => console.log(error),
        () => console.log('Get All Material Complete'));
  }

}
