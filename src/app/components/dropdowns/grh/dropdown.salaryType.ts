import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { SalaryTypeService } from '../../../services/grh/salaryType.service';
import { SalaryType } from 'app/models/grh/salaryType';

@Injectable()
export class SalaryTypeDropdown {

  filteredSalaryTypes: SalaryType[];
  salaryTypes: SalaryType[] = [];

  constructor(
    private salaryTypeService: SalaryTypeService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredSalaryTypes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.salaryTypes);
    setTimeout(() => {
      this.filteredSalaryTypes = this.salaryTypes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.salaryTypes.length; i++) {
          let payParameter = this.salaryTypes[i];
          if(payParameter.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPTypes.push(payParameter);
          }
      }

    return filteredPTypes;
  }

  private getAllPayParameters(): void {
    this.salaryTypeService.getAll()
      .subscribe((data: SalaryType[]) => {
      this.salaryTypes = data;
      },
        error => console.log(error),
        () => console.log('Get All SalaryTypes Complete'));
  }

}
