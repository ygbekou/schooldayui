import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { LetterService } from 'app/services/grh/letter.service';
import { LetterNumeroRef } from 'app/models/grh/letterNumeroRef';

@Injectable()
export class LetterNumeroRefDropdown {


  filteredLetterNumeroRefs: LetterNumeroRef[];
  letterNumeroRefs: LetterNumeroRef[] = [];

  constructor(
   private letterService: LetterService) {

    this.getAllLetterNumeroRef();
  }

  filter(event) {
    this.filteredLetterNumeroRefs = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.filteredLetterNumeroRefs);
    setTimeout(() => {
      this.filteredLetterNumeroRefs = this.letterNumeroRefs;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredA = [];
      for(let i = 0; i < this.letterNumeroRefs.length; i++) {
          let b = this.letterNumeroRefs[i];
          if(b.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredA.push(b);
          }
      }

    return filteredA;
  }

  private getAllLetterNumeroRef(): void {
    this.letterService.getAll()
      .subscribe((data: LetterNumeroRef[]) => {
      this.letterNumeroRefs = data;
      },
        error => console.log(error),
        () => console.log('Get All LetterNumeroRef Complete'));
  }

}
