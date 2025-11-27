import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {LetterNumeroRef} from '../../models/grh/letterNumeroRef';
import {LetterObject} from '../../models/grh/letterObject';
import { User } from '../../models/User';
import { AvantageTypeService } from '../../services/grh/avantageType.service';
import { LetterService} from '../../services/grh/letter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-letter-object',
  templateUrl: '../../pages/grh/grhLetterObject.html',
  providers: [AvantageTypeService, Constants, LetterService]
})

export class GrhLetterObject implements OnInit, OnDestroy {

  public letterNumeroRef: LetterNumeroRef = new LetterNumeroRef();
  public letterNumeroRefs: LetterNumeroRef[];
  public selectedLetterNumberRef: LetterNumeroRef;

  public letterObject: LetterObject = new LetterObject();
  public letterObjects: LetterObject[];
  public selectedLetterObject: LetterObject;

  public error: String = '';
  displayDialog: boolean;
  newLetterNumeroRef: boolean;
  newLetterObject: boolean;
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
    //this.selectedSubjectLevel = new SubjectLevelView();
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
      this.newLetterObject = true;
      this.letterObject = new LetterObject();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.letterObjects = [];
    this.letterService.getAllLetterObject()
      .subscribe((data: LetterObject[]) => this.letterObjects = data,
      error => console.log(error),
      () => console.log('Get all letterObjects complete'));
  }

  save() {
    try {
      this.error = '';
      this.letterService.saveLetterObject(this.letterObject)
        .subscribe(result => {
          if (result.id > 0) {
            this.letterObject = result;
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
      this.letterService.deleteLetterObject(this.letterObject)
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
    if (this.newLetterObject)
       this.letterObjects.push(this.letterObject);
    else
      this.letterObjects[this.findSelectedIndex()] = this.letterObject;

    var onTheFly: LetterObject[] = [];
    onTheFly.push(...this.letterObjects);
    this.letterObjects = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.letterObjects.splice(this.findSelectedIndex(), 1);
    var onTheFly: LetterObject[] = [];
    onTheFly.push(...this.letterObjects);
    this.letterObjects = onTheFly;
    this.resetData();
  }

  resetData() {
    this.letterObject = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newLetterObject = false;
    this.letterObject = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: LetterObject): LetterObject {
    let aLetterObject = new LetterObject();
    for (let prop in e) {
      aLetterObject[prop] = e[prop];
    }
    return aLetterObject;
  }

  findSelectedIndex(): number {
    return this.letterObjects.indexOf(this.selectedLetterObject);
  }

}
