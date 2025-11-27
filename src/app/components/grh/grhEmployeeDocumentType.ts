import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { EmployeeDocumentType } from '../../models/grh/employeeDocumentType';
import { User } from '../../models/User';
import { EmployeeDocumentTypeService } from '../../services/grh/employeeDocumentType.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-employee-document-type',
  templateUrl: '../../pages/grh/grhEmployeeDocumentType.html',
  providers: [EmployeeDocumentTypeService, Constants]
})

export class GrhEmployeeDocumentType implements OnInit, OnDestroy {

  public employeeDocumentType: EmployeeDocumentType;
  public employeeDocumentTypes: EmployeeDocumentType[];
  public selectedEmployeeDocumentType: EmployeeDocumentType;

  public error: String = '';
  displayDialog: boolean;
  newEmployeeDocumentType: boolean;
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
    private employeeDocumentTypeService: EmployeeDocumentTypeService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnDestroy() {
    this.employeeDocumentTypes = null;
    this.error = null;
    this.selectedEmployeeDocumentType = null;
    this.employeeDocumentType = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'code', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'name', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newEmployeeDocumentType = true;
      this.employeeDocumentType = new EmployeeDocumentType();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.employeeDocumentTypes = [];
    this.employeeDocumentTypeService.getAll()
      .subscribe((data: EmployeeDocumentType[]) => this.employeeDocumentTypes = data,
      error => console.log(error),
      () => console.log('Get all EmployeeDocumentTypes complete'));
  }

  public getAllActive(): void {
    this.employeeDocumentTypes = [];
    this.employeeDocumentTypeService.getAllActive()
      .subscribe((data: EmployeeDocumentType[]) => this.employeeDocumentTypes = data,
      error => console.log(error),
      () => console.log('Get all EmployeeDocumentTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.employeeDocumentTypeService.save(this.employeeDocumentType)
        .subscribe(result => {
          if (result.id > 0) {
            this.employeeDocumentType = result;
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
      this.employeeDocumentTypeService.delete(this.employeeDocumentType)
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
    if (this.newEmployeeDocumentType)
      this.employeeDocumentTypes.push(this.employeeDocumentType);
    else
      this.employeeDocumentTypes[this.findSelectedIndex()] = this.employeeDocumentType;

    var onTheFly: EmployeeDocumentType[] = [];
    onTheFly.push(...this.employeeDocumentTypes);
    this.employeeDocumentTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.employeeDocumentTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: EmployeeDocumentType[] = [];
    onTheFly.push(...this.employeeDocumentTypes);
    this.employeeDocumentTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.employeeDocumentType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newEmployeeDocumentType = false;
    this.employeeDocumentType = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: EmployeeDocumentType): EmployeeDocumentType {
    let aEmployeeDocumentType = new EmployeeDocumentType();
    for (let prop in e) {
      aEmployeeDocumentType[prop] = e[prop];
    }
    return aEmployeeDocumentType;
  }

  findSelectedIndex(): number {
    return this.employeeDocumentTypes.indexOf(this.selectedEmployeeDocumentType);
  }

}
