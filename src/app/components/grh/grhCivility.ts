import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {LetterNumeroRef} from '../../models/grh/letterNumeroRef';
import {LetterObject} from '../../models/grh/letterObject';
import { User } from '../../models/User';
import { LetterService} from '../../services/grh/letter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { Civility } from 'app/models/grh/civility';

@Component({
  selector: 'app-grh-cilivility',
  templateUrl: '../../pages/grh/grhCivility.html',
  providers: [Constants, LetterService]
})

export class GrhCivility implements OnInit, OnDestroy {

  public letterObject: LetterObject = new LetterObject();
  public letterObjects: LetterObject[];
  public selectedLetterObject: LetterObject;

  public civility: Civility = new Civility();
  public civilities: Civility[];
  public selectedCivility: Civility;

  public error: String = '';
  displayDialog: boolean;
  newLetterObject: boolean;
  newCivility: boolean;
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

    private letterService: LetterService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }
  ngOnDestroy() {
    this.letterObjects= null;
    this.error = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'code', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'name', header: 'Objet', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newCivility = true;
      this.civility = new LetterObject();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.civilities = [];
    this.letterService.getAllCivility()
      .subscribe((data: Civility[]) => this.civilities = data,
      error => console.log(error),
      () => console.log('Get all civilities complete'));
  }

  save() {
    try {
      this.error = '';
      this.letterService.saveCivility(this.civility)
        .subscribe(result => {
          if (result.id > 0) {
            this.civility = result;
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
      this.letterService.deleteCivility(this.civility)
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
    if (this.newCivility)
       this.civilities.push(this.civility);
    else
      this.civilities[this.findSelectedIndex()] = this.civility;

    var onTheFly: Civility[] = [];
    onTheFly.push(...this.civilities);
    this.civilities = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.civilities.splice(this.findSelectedIndex(), 1);
    var onTheFly: Civility[] = [];
    onTheFly.push(...this.civilities);
    this.civilities = onTheFly;
    this.resetData();
  }

  resetData() {
    this.civility = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCivility = false;
    this.civility = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Civility): Civility {
    let aCivility = new Civility();
    for (let prop in e) {
      aCivility[prop] = e[prop];
    }
    return aCivility;
  }

  findSelectedIndex(): number {
    return this.civilities.indexOf(this.selectedCivility);
  }

}
