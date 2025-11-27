import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from '../dropdown.util';
import { PayParameterService } from '../../../services/grh/payParameter.service';
import { PayParameter } from 'app/models/grh/payParameter';

@Injectable()
export class PayParameterDropdown {

  filteredPayParameters: PayParameter[];
  payParameters: PayParameter[] = [];

  constructor(
    private payParameterService: PayParameterService) {
    this.getAllPayParameters();
  }

  filter(event) {
    this.filteredPayParameters = this.find(event);
  }

  handleDropdownClick(event) {
    console.info(this.payParameters);
    setTimeout(() => {
      this.filteredPayParameters = this.payParameters;
    }, 10)
  }

  public find(event) {
      let query = event.query;
      let filteredPTypes = [];
      for(let i = 0; i < this.payParameters.length; i++) {
          let payParameter = this.payParameters[i];
          if(payParameter.wording.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filteredPTypes.push(payParameter);
          }
      }

    return filteredPTypes;
  }

  private getAllPayParameters(): void {
    this.payParameterService.getAll()
      .subscribe((data: PayParameter[]) => {
      this.payParameters = data;
      },
        error => console.log(error),
        () => console.log('Get All PayParameters Complete'));
  }

  public onFiscalYearPayParameter(event){
    console.info("selection");
    event.subscribe(value => console.log('Value changes'));
    
    /*  */
    /* let selectedPayParameter= new PayParameter();
    selectedPayParameter = event.target.value; */
    /* console.info("PayParameter selectionné : "+selectedPayParameter); */
  }

}
