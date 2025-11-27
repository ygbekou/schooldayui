import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { BankService } from '../../../services/grh/bank.service';
import { Bank } from 'app/models/grh/bank';

@Injectable()
export class BankDropdown {

  filteredBanks: Bank[];
  banks: Bank[] = [];

  constructor(
    private bankService: BankService) {
    this.getAllBanks();
  }

  filter(event) {
    this.filteredBanks = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.banks);
    setTimeout(() => {
      this.filteredBanks = this.banks;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredB = [];
      for(let i = 0; i < this.banks.length; i++) {
          let b = this.banks[i];
          if(b.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredB.push(b);
          }
      }

    return filteredB;
  }

  private getAllBanks(): void {
    this.bankService.getAll()
      .subscribe((data: Bank[]) => {
      this.banks = data;
      },
        error => console.log(error),
        () => console.log('Get All Banks Complete'));
  }

}
