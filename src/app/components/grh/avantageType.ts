import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AvantageType } from '../../models/grh/avantageType';
import { User } from '../../models/User';
import { AvantageTypeService } from '../../services/grh/avantageType.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-avantage-type',
  templateUrl: '../../pages/grh/avantageType.html',
  providers: [AvantageTypeService, /*LevelDropdown,*/ Constants]
})

export class AvantageTypeGRH implements OnInit, OnDestroy {

  public avantageType: AvantageType;
  public avantageTypes: AvantageType[];
  public selectedAvantageType: AvantageType;

  public error: String = '';
  displayDialog: boolean;
  newAvantageType: boolean;
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
    private avantageTypeService: AvantageTypeService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.avantageTypes = null;
    this.error = null;
    this.selectedAvantageType = null;
    this.avantageType = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    //this.selectedSubjectLevel = new SubjectLevelView();
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
      this.newAvantageType = true;
      this.avantageType = new AvantageType();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.avantageTypes = [];
    this.avantageTypeService.getAll()
      .subscribe((data: AvantageType[]) => this.avantageTypes = data,
      error => console.log(error),
      () => console.log('Get all AvantageTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.avantageTypeService.save(this.avantageType)
        .subscribe(result => {
          if (result.id > 0) {
            this.avantageType = result;
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
      this.avantageTypeService.delete(this.avantageType)
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
    if (this.newAvantageType)
      this.avantageTypes.push(this.avantageType);
    else
      this.avantageTypes[this.findSelectedIndex()] = this.avantageType;

    var onTheFly: AvantageType[] = [];
    onTheFly.push(...this.avantageTypes);
    this.avantageTypes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.avantageTypes.splice(this.findSelectedIndex(), 1);
    var onTheFly: AvantageType[] = [];
    onTheFly.push(...this.avantageTypes);
    this.avantageTypes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.avantageType = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAvantageType = false;
    this.avantageType = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: AvantageType): AvantageType {
    let aAvantageType = new AvantageType();
    for (let prop in e) {
      aAvantageType[prop] = e[prop];
    }
    return aAvantageType;
  }

  findSelectedIndex(): number {
    return this.avantageTypes.indexOf(this.selectedAvantageType);
  }

}
