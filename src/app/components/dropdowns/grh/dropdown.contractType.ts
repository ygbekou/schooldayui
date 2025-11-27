import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { ContractTypeService } from '../../../services/grh/contractType.service';
import { ContractType } from 'app/models/grh/contractType';

@Injectable()
export class ContractTypeDropdown {

  filteredContractTypes: ContractType[];
  contractTypes: ContractType[] = [];

  constructor(
    private contractTypeService: ContractTypeService) {
    this.getAllContractTypes();
  }

  filter(event) {
    this.filteredContractTypes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.contractTypes);
    setTimeout(() => {
      this.filteredContractTypes = this.contractTypes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredCTypes = [];
      for(let i = 0; i < this.contractTypes.length; i++) {
          let cType = this.contractTypes[i];
          if(cType.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredCTypes.push(cType);
          }
      }

    return filteredCTypes;
  }

  private getAllContractTypes(): void {
    this.contractTypeService.getAll()
      .subscribe((data: ContractType[]) => {
      this.contractTypes = data;
      },
        error => console.log(error),
        () => console.log('Get All ContractTypes Complete'));
  }

}
