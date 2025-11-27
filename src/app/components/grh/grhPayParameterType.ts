import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PayParameterType } from '../../models/grh/payParameterType';
import { User } from '../../models/User';
import { PayParameterTypeService } from '../../services/grh/payParameterType.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-pay-parameter-type',
  templateUrl: '../../pages/grh/grhPayParameterType.html',
  providers: [PayParameterTypeService, /*LevelDropdown,*/ Constants]
})

export class GrhPayParameterType implements OnInit, OnDestroy {

  public payParameterType: PayParameterType;
  public payParameterTypes: PayParameterType[];
  public selectedPayParameterType: PayParameterType;

  public error: String = '';
  displayDialog: boolean;
  newPayParameterType: boolean;
  cols: any[];
  public user: User;
  //public subjectDropdown: SubjectDropdown;

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
    private payParameterTypeService: PayParameterTypeService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.payParameterTypes = null;
    this.error = null;
    this.selectedPayParameterType = null;
    this.payParameterType = null;
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

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newPayParameterType = true;
      this.payParameterType = new PayParameterType();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.payParameterTypes = [];
    this.payParameterTypeService.getAll()
      .subscribe((data: PayParameterType[]) => this.payParameterTypes = data,
      error => console.log(error),
      () => console.log('Get all AvantageTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.payParameterTypeService.save(this.payParameterType)
        .subscribe(result => {
          if (result.id > 0) {
            this.payParameterType = result;
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
      this.payParameterTypeService.delete(this.payParameterType)
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
    if (this.newPayParameterType)
      this.payParameterTypes.push(this.payParameterType);
    else
      this.payParameterTypes[this.findSelectedIndex()] = this.payParameterType;

    var onTheFly: PayParameterType[] = [];
    onTheFly.push(...this.payParameterTypes);
    this.payParameterTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.payParameterTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: PayParameterType[] = [];
    onTheFly.push(...this.payParameterTypes);
    this.payParameterTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.payParameterType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPayParameterType = false;
    this.payParameterType = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: PayParameterType): PayParameterType {
    let aAvantageType = new PayParameterType();
    for (let prop in e) {
      aAvantageType[prop] = e[prop];
    }
    return aAvantageType;
  }

  findSelectedIndex(): number {
    return this.payParameterTypes.indexOf(this.selectedPayParameterType);
  }

}
