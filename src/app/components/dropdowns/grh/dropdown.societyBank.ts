import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { BankService } from '../../../services/grh/bank.service';
import { LetterService } from 'app/services/grh/letter.service';
import { AccountNumber } from 'app/models/grh/accountNumber';
import { LetterObject } from 'app/models/grh/letterObject';
import { SocietyBank } from 'app/models/grh/societyBank';

@Injectable()
export class SocietyBankDropdown {


  filteredSocietyBanks: SocietyBank[];
  societyBanks: SocietyBank[]=[];

  constructor(
   private letterService: LetterService) {

    this.getAllSocietyBank();
  }

  filter(event) {
    this.filteredSocietyBanks = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.filteredSocietyBanks);
    setTimeout(() => {
      this.filteredSocietyBanks = this.societyBanks;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.societyBanks.length; i++) {
          let b = this.societyBanks[i];
          if(b.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(b);
          }
      }

    return filteredA;
  }

  private getAllSocietyBank(): void {
    this.letterService.getAllSocietyBank()
      .subscribe((data: SocietyBank[]) => {
      this.societyBanks = data;
      },
        error => console.log(error),
        () => console.log('Get All SocietyBank Complete'));
  }

}
