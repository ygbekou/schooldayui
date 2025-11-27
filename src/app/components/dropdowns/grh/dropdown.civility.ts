import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { BankService } from '../../../services/grh/bank.service';
import { LetterService } from 'app/services/grh/letter.service';
import { AccountNumber } from 'app/models/grh/accountNumber';
import { LetterObject } from 'app/models/grh/letterObject';
import { SocietyBank } from 'app/models/grh/societyBank';
import { Civility } from 'app/models/grh/civility';

@Injectable()
export class CivilityDropdown {


  filteredSocietyBanks: SocietyBank[];
  societyBanks: SocietyBank[]=[];

  filiteredCivilities: Civility[];
  civilities: Civility[]=[];

  constructor(
   private letterService: LetterService) {

    this.getAllCivility();
  }

  filter(event) {
    this.filiteredCivilities = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.filiteredCivilities);
    setTimeout(() => {
      this.filiteredCivilities = this.civilities;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.civilities.length; i++) {
          let b = this.civilities[i];
          if(b.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(b);
          }
      }

    return filteredA;
  }

  private getAllCivility(): void {
    this.letterService.getAllCivility()
      .subscribe((data: Civility[]) => {
      this.civilities = data;
      },
        error => console.log(error),
        () => console.log('Get All Civility Complete'));
  }

}
