import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FiscalYearPayParameter } from '../../models/grh/fiscalYearPayParameter';
import { User } from '../../models/User';
import { FiscalYearPayParameterService } from '../../services/grh/fiscalYearPayParameter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { PayParameterDropdown } from '../dropdowns/grh/dropdown.payParameter';
import { FiscalYearDropdown } from '../dropdowns/grh/dropdown.fiscalYear';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { PayParameter } from 'app/models/grh/payParameter';

@Component({
  selector: 'app-grh-fiscal-year-pay-parameter',
  templateUrl: '../../pages/grh/grhFiscalYearPayParameter.html',
  providers: [FiscalYearPayParameterService, PayParameterDropdown, FiscalYearDropdown, Constants]
})

export class GrhFiscalYearPayParameter implements OnInit, OnDestroy {

  public fiscalYearPayParameter: FiscalYearPayParameter;
  public fiscalYearPayParameters: FiscalYearPayParameter[];
  public selectedFiscalYearPayParameter: FiscalYearPayParameter;

  public error: String = '';
  displayDialog: boolean;
  newFiscalYearPayParameter: boolean;
  cols: any[];
  public user: User;
  public payParameterDropdown: PayParameterDropdown;
  public fiscalYearDropdown: FiscalYearDropdown;

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
    private fiscalYearPayParameterService: FiscalYearPayParameterService,
    private ppDropdon: PayParameterDropdown,
    private fyDropdon: FiscalYearDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.payParameterDropdown = ppDropdon;
    this.fiscalYearDropdown = fyDropdon;
  }
  ngOnDestroy() {
    this.fiscalYearPayParameters = null;
    this.error = null;
    this.selectedFiscalYearPayParameter = null;
    this.fiscalYearPayParameter = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'fiscalYear.key', header: 'Année fiscale', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'payParameter.wording', header: 'Paramètre de paie', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'value', header: 'Valeur', sortable: 'true', filter: 'true',  style:  {'width':'30%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newFiscalYearPayParameter = true;
      this.fiscalYearPayParameter = new FiscalYearPayParameter();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.fiscalYearPayParameters = [];
    this.fiscalYearPayParameterService.getAll()
      .subscribe((data: FiscalYearPayParameter[]) => this.fiscalYearPayParameters = data,
      error => console.log(error),
      () => console.log('Get all FiscalYearPayParameters complete'));
  }

  save() {
    try {
      this.error = '';
      this.fiscalYearPayParameterService.save(this.fiscalYearPayParameter)
        .subscribe(result => {
          if (result.id > 0) {
            this.fiscalYearPayParameter = result;
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
      this.fiscalYearPayParameterService.delete(this.fiscalYearPayParameter)
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
    if (this.newFiscalYearPayParameter)
      this.fiscalYearPayParameters.push(this.fiscalYearPayParameter);
    else
      this.fiscalYearPayParameters[this.findSelectedIndex()] = this.fiscalYearPayParameter;

    var onTheFly: FiscalYearPayParameter[] = [];
    onTheFly.push(...this.fiscalYearPayParameters);
    this.fiscalYearPayParameters = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.fiscalYearPayParameters.splice(this.findSelectedIndex(), 1);
    var onTheFly: FiscalYearPayParameter[] = [];
    onTheFly.push(...this.fiscalYearPayParameters);
    this.fiscalYearPayParameters = onTheFly;
    this.resetData();
  }

  resetData() {
    this.fiscalYearPayParameter = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newFiscalYearPayParameter = false;
    this.fiscalYearPayParameter = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: FiscalYearPayParameter): FiscalYearPayParameter {
    let aAvantage = new FiscalYearPayParameter();
    for (let prop in e) {
      aAvantage[prop] = e[prop];
    }
    return aAvantage;
  }

  findSelectedIndex(): number {
    return this.fiscalYearPayParameters.indexOf(this.selectedFiscalYearPayParameter);
  }

  setFields(event){
    console.info("selection");
  }

}
