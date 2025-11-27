import { Injectable, OnInit } from '@angular/core';
import { CategoryMaterial } from 'app/models/immo/CategoryMaterial';
import { CategoryMaterialService } from 'app/services/immo/category-material.service';

@Injectable()
export class CategoryMaterialDropdown {

  filteredCategoryMaterials: CategoryMaterial[];
  CategoryMaterials: CategoryMaterial[] = [];

  constructor(
    private locationService: CategoryMaterialService) {
    this.getAll();
  }

  filter(event) {
    this.filteredCategoryMaterials = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredCategoryMaterials = this.CategoryMaterials;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.CategoryMaterials.length; i++) {
          let a = this.CategoryMaterials[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: CategoryMaterial[]) => {
      this.CategoryMaterials = data;
      },
        error => console.log(error),
        () => console.log('Get All CategoryMaterial Complete'));
  }

}
