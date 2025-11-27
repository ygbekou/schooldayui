import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PayParameter } from '../../models/grh/payParameter';
import { User } from '../../models/User';
import { PayParameterService } from '../../services/grh/payParameter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { PayParameterTypeDropdown } from '../dropdowns/grh/dropdown.payParameterType';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-pay-parameter',
  templateUrl: '../../pages/grh/grhPayParameter.html',
  providers: [PayParameterService, PayParameterTypeDropdown, Constants]
})

export class GrhPayParameter implements OnInit, OnDestroy {

  public payParameter: PayParameter;
  public payParameters: PayParameter[];
  public selectedPayParameter: PayParameter;

  public error: String = '';
  displayDialog: boolean;
  newPayParameter: boolean;
  cols: any[];
  public user: User;
  public payParameterTypeDropdown: PayParameterTypeDropdown;

  DETAIL: string = Constants.DETAIL;
  LEVELS:  string = Constants.LEVELS;
  SUBJECT:  string = Constants.SUBJECT;
  NAME:  string = Constants.NAME;
  DESCRIPTION:  string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private payParameterService: PayParameterService,
    private pptDropdon: PayParameterTypeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.payParameterTypeDropdown = pptDropdon;
  }
  ngOnDestroy() {
    this.payParameters = null;
    this.error = null;
    this.selectedPayParameter = null;
    this.payParameter = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'parameterType.wording', header: 'Type', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'wording', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'30%'}  }
        /*,
        { field: 'value', header: 'Valeur', sortable: 'true', filter: 'true',  style:  {'width':'30%'}  }
        */
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newPayParameter = true;
      this.payParameter = new PayParameter();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.payParameters = [];
    this.payParameterService.getAll()
      .subscribe((data: PayParameter[]) => this.payParameters = data,
      error => console.log(error),
      () => console.log('Get all PayParameters complete'));
  }

  save() {
    try {
      this.error = '';
      this.payParameterService.save(this.payParameter)
        .subscribe(result => {
          if (result.id > 0) {
            this.payParameter = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.payParameterService.delete(this.payParameter)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          }
          else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newPayParameter)
      this.payParameters.push(this.payParameter);
    else
      this.payParameters[this.findSelectedIndex()] = this.payParameter;

    var onTheFly: PayParameter[] = [];
    onTheFly.push(...this.payParameters);
    this.payParameters = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.payParameters.splice(this.findSelectedIndex(), 1);
    var onTheFly: PayParameter[] = [];
    onTheFly.push(...this.payParameters);
    this.payParameters = onTheFly;
    this.resetData();
  }

  resetData() {
    this.payParameter = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPayParameter = false;
    this.payParameter = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: PayParameter): PayParameter {
    let aAvantage = new PayParameter();
    for (let prop in e) {
      aAvantage[prop] = e[prop];
    }
    return aAvantage;
  }

  findSelectedIndex(): number {
    return this.payParameters.indexOf(this.selectedPayParameter);
  }

}
