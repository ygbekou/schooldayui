import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { PersonnelTypeService } from '../../../services/grh/personnelType.service';
import { PersonnelType } from 'app/models/grh/personnelType';

@Injectable()
export class PersonnelTypeDropdown {

  filteredPersonnelTypes: PersonnelType[];
  personnelTypes: PersonnelType[] = [];

  constructor(
    private personnelTypeService: PersonnelTypeService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredPersonnelTypes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.personnelTypes);
    setTimeout(() => {
      this.filteredPersonnelTypes = this.personnelTypes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.personnelTypes.length; i++) {
          let payParameter = this.personnelTypes[i];
          if(payParameter.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPTypes.push(payParameter);
          }
      }

    return filteredPTypes;
  }

  private getAllPayParameters(): void {
    this.personnelTypeService.getAll()
      .subscribe((data: PersonnelType[]) => {
      this.personnelTypes = data;
      },
        error => console.log(error),
        () => console.log('Get All PersonnelTypes Complete'));
  }

}
