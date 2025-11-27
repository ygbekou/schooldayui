import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { PayParameterTypeService } from '../../../services/grh/payParameterType.service';
import { PayParameterType } from 'app/models/grh/payParameterType';

@Injectable()
export class PayParameterTypeDropdown {

  filteredPayParameterTypes: PayParameterType[];
  payParameterTypes: PayParameterType[] = [];

  constructor(
    private payParameterTypeService: PayParameterTypeService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredPayParameterTypes = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.payParameterTypes);
    setTimeout(() => {
      this.filteredPayParameterTypes = this.payParameterTypes;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.payParameterTypes.length; i++) {
          let payParameter = this.payParameterTypes[i];
          if(payParameter.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPTypes.push(payParameter);
          }
      }

    return filteredPTypes;
  }

  private getAllPayParameters(): void {
    this.payParameterTypeService.getAll()
      .subscribe((data: PayParameterType[]) => {
      this.payParameterTypes = data;
      },
        error => console.log(error),
        () => console.log('Get All PayParameterTypes Complete'));
  }

}
