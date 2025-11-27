import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PersonnelType } from '../../models/grh/personnelType';
import { User } from '../../models/User';
import { PersonnelTypeService } from '../../services/grh/personnelType.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-personnel-type',
  templateUrl: '../../pages/grh/grhPersonnelType.html',
  providers: [PersonnelTypeService, /*LevelDropdown,*/ Constants]
})

export class GrhPersonnelType implements OnInit, OnDestroy {

  public personnelType: PersonnelType;
  public personnelTypes: PersonnelType[];
  public selectedPersonnelType: PersonnelType;

  public error: String = '';
  displayDialog: boolean;
  newPersonnelType: boolean;
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
    private personnelTypeService: PersonnelTypeService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.personnelTypes = null;
    this.error = null;
    this.selectedPersonnelType = null;
    this.personnelType = null;
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
      this.newPersonnelType = true;
      this.personnelType = new PersonnelType();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.personnelTypes = [];
    this.personnelTypeService.getAll()
      .subscribe((data: PersonnelType[]) => this.personnelTypes = data,
      error => console.log(error),
      () => console.log('Get all AvantageTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.personnelTypeService.save(this.personnelType)
        .subscribe(result => {
          if (result.id > 0) {
            this.personnelType = result;
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
      this.personnelTypeService.delete(this.personnelType)
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
    if (this.newPersonnelType)
      this.personnelTypes.push(this.personnelType);
    else
      this.personnelTypes[this.findSelectedIndex()] = this.personnelType;

    var onTheFly: PersonnelType[] = [];
    onTheFly.push(...this.personnelTypes);
    this.personnelTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.personnelTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: PersonnelType[] = [];
    onTheFly.push(...this.personnelTypes);
    this.personnelTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.personnelType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newPersonnelType = false;
    this.personnelType = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: PersonnelType): PersonnelType {
    let aAvantageType = new PersonnelType();
    for (let prop in e) {
      aAvantageType[prop] = e[prop];
    }
    return aAvantageType;
  }

  findSelectedIndex(): number {
    return this.personnelTypes.indexOf(this.selectedPersonnelType);
  }

}
