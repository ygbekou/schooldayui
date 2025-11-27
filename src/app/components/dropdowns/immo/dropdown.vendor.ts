import { Injectable, OnInit } from '@angular/core';
import { Vendor } from 'app/models/immo/Vendor';
import { VendorService } from 'app/services/immo/vendor.service';

@Injectable()
export class VendorDropdown {

  filteredVendors: Vendor[];
  Vendors: Vendor[] = [];

  constructor(
    private locationService: VendorService) {
    this.getAll();
  }

  filter(event) {
    this.filteredVendors = this.find(event);
  }

  handleDropdownClick(event) {
    this.getAll();
    setTimeout(() => {
      this.filteredVendors = this.Vendors;
    }, 3)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.Vendors.length; i++) {
          let a = this.Vendors[i];
        if (a.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(a);
          }
      }

    return filteredA;
  }

  public getAll(): void {
    this.locationService.getAll()
      .subscribe((data: Vendor[]) => {
      this.Vendors = data;
      },
        error => console.log(error),
        () => console.log('Get All Vendor Complete'));
  }

}
