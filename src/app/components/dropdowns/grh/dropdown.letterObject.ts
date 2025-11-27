import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { BankService } from '../../../services/grh/bank.service';
import { LetterService } from 'app/services/grh/letter.service';
import { AccountNumber } from 'app/models/grh/accountNumber';
import { LetterObject } from 'app/models/grh/letterObject';

@Injectable()
export class LetterObjectDropdown {


  filteredAccountNumbers: AccountNumber[];
  accountNumbers: AccountNumber[] = [];

  filteredLetterObjects: LetterObject[];
  letterObjects: LetterObject[] = [];

  constructor(
   private letterService: LetterService) {

    this.getAllLetterObject();
  }

  filter(event) {
    this.filteredLetterObjects = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.filteredLetterObjects);
    setTimeout(() => {
      this.filteredLetterObjects = this.letterObjects;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.letterObjects.length; i++) {
          let b = this.letterObjects[i];
          if(b.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(b);
          }
      }

    return filteredA;
  }

  private getAllLetterObject(): void {
    this.letterService.getAllLetterObject()
      .subscribe((data: LetterObject[]) => {
      this.letterObjects = data;
      },
        error => console.log(error),
        () => console.log('Get All LetterObject Complete'));
  }

}
