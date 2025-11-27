import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { FiscalYearService } from '../../../services/grh/fiscalYear.service';
import { FiscalYear } from 'app/models/grh/fiscalYear';

@Injectable()
export class FiscalYearDropdown {

  filteredFiscalYears: FiscalYear[];
  fiscalYears: FiscalYear[] = [];

  constructor(
    private fiscalYearService: FiscalYearService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredFiscalYears = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.fiscalYears);
    setTimeout(() => {
      this.filteredFiscalYears = this.fiscalYears;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredFYears = [];
      for(let i = 0; i < this.fiscalYears.length; i++) {
          let payParameter = this.fiscalYears[i];
          if(payParameter.key.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredFYears.push(payParameter);
          }
      }

    return filteredFYears;
  }

  private getAllPayParameters(): void {
    this.fiscalYearService.getAll()
      .subscribe((data: FiscalYear[]) => {
      this.fiscalYears = data;
      },
        error => console.log(error),
        () => console.log('Get All FiscalYears Complete'));
  }

}
