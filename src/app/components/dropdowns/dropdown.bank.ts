import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { BaseService } from '../../services/base.service';
import { Bank } from 'app/models/bank';

@Injectable()
export class BankDropdown {

  filteredBanks: Bank[];
  banks: Bank[] = [];

  constructor(
    private baseService: BaseService) {
    this.getAllBanks();
  }

  filter(event) {
    this.filteredBanks = DropdownUtil.filter(event, this.banks);
  }

  handleDropdownClick(event) {
    // tslint:disable-next-line:no-console
    console.info(this.banks);
    //this.filteredCompanies = [];
    setTimeout(() => {
      this.filteredBanks = this.banks;
    }, 10)
    // console.info("Filtered Companies: " + this.filteredCompanies)
  }
  public find = (bank: string): Bank => {
    for (let i: 0; i < this.banks.length; i++) {
      if (this.banks[i].name.toLowerCase() === bank.toLowerCase()) {
        return this.banks[i];
      }
    }
    return null;
  }

  private getAllBanks(): void {
    //console.info(this.companies);
    this.baseService.getAllBanks()
      .subscribe((data: Bank[]) => {
      this.banks = data;
      },
        error => console.log(error),
        () => console.log('Get All Banks Complete'));
  }

}