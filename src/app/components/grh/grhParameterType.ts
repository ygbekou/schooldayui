import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ParameterType } from '../../models/grh/parameterType';
import { User } from '../../models/User';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-parameter-type',
  templateUrl: '../../pages/grh/grhParameterType.html',
  providers: [Constants]
})

export class GrhParameterType implements OnInit, OnDestroy {

  public parameterType: ParameterType;
  public parameterTypes: ParameterType[];
  public selectedParameterType: ParameterType;

  public error: String = '';
  displayDialog: boolean;
  newParameterType: boolean;
  cols: any[];
  public user: User;

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
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnDestroy() {
    this.parameterTypes = null;
    this.error = null;
    this.selectedParameterType = null;
    this.parameterType = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));

    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'wording', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

 public getAvantageTypes(): void {
    this.parameterTypes = [];

  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newParameterType = true;
      this.parameterType = new ParameterType();
      this.displayDialog = true;
    }
  }

}
