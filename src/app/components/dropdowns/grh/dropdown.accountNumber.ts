import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { BankService } from '../../../services/grh/bank.service';
import { Bank } from 'app/models/grh/bank';
import {SocietyBank} from 'app/models/grh/societyBank';
import { LetterService } from 'app/services/grh/letter.service';
import { AccountNumber } from 'app/models/grh/accountNumber';

@Injectable()
export class AccountNumberDropdown {


  filteredAccountNumbers: AccountNumber[];
  accountNumbers: AccountNumber[] = [];

  constructor(
              private letterService: LetterService) {

    this.getAllAccountNumber();
  }

  filter(event) {
    this.filteredAccountNumbers = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.filteredAccountNumbers);
    setTimeout(() => {
      this.filteredAccountNumbers = this.accountNumbers;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.accountNumbers.length; i++) {
          let b = this.accountNumbers[i];
          if(b.number.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(b);
          }
      }

    return filteredA;
  }

  private getAllAccountNumber(): void {
    this.letterService.getAllAccounNumber()
      .subscribe((data: AccountNumber[]) => {
      this.accountNumbers = data;
      },
        error => console.log(error),
        () => console.log('Get All AccountNumbers Complete'));
  }

}
