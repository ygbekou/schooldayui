import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AvantageType } from '../../models/grh/avantageType';
import {LetterNumeroRef} from '../../models/grh/letterNumeroRef';
import { User } from '../../models/User';
import { AvantageTypeService } from '../../services/grh/avantageType.service';
import { LetterService} from '../../services/grh/letter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-letter-numeroRef',
  templateUrl: '../../pages/grh/grhLetterNumeroRef.html',
  providers: [AvantageTypeService, Constants, LetterService]
})

export class GrhLetterNumeroRef implements OnInit, OnDestroy {

  public letterNumeroRef: LetterNumeroRef = new LetterNumeroRef();
  public letterNumeroRefs: LetterNumeroRef[];
  public selectedLetterNumberRef: LetterNumeroRef;

  public error: String = '';
  displayDialog: boolean;
  newAvantageType: boolean;
  newLetterNumeroRef: boolean;
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
    private letterService: LetterService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.letterNumeroRefs = null;
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
        { field: 'name', header: 'Nom', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newLetterNumeroRef = true;
      this.letterNumeroRef = new LetterNumeroRef();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.letterNumeroRefs = [];
    this.letterService.getAll()
      .subscribe((data: LetterNumeroRef[]) => this.letterNumeroRefs = data,
      error => console.log(error),
      () => console.log('Get all LetterNumeroRefs complete'));
  }

  save() {
    try {
      this.error = '';
      this.letterService.save(this.letterNumeroRef)
        .subscribe(result => {
          if (result.id > 0) {
            this.letterNumeroRef = result;
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
      this.letterService.delete(this.letterNumeroRef)
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
    if (this.newLetterNumeroRef)
       this.letterNumeroRefs.push(this.letterNumeroRef);
    else
      this.letterNumeroRefs[this.findSelectedIndex()] = this.letterNumeroRef;

    var onTheFly: LetterNumeroRef[] = [];
    onTheFly.push(...this.letterNumeroRefs);
    this.letterNumeroRefs = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.letterNumeroRefs.splice(this.findSelectedIndex(), 1);
    var onTheFly: LetterNumeroRef[] = [];
    onTheFly.push(...this.letterNumeroRefs);
    this.letterNumeroRefs = onTheFly;
    this.resetData();
  }

  resetData() {
    this.letterNumeroRef = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newLetterNumeroRef = false;
    this.letterNumeroRef = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: LetterNumeroRef): LetterNumeroRef {
    let aLetterNumeroRef = new LetterNumeroRef();
    for (let prop in e) {
      aLetterNumeroRef[prop] = e[prop];
    }
    return aLetterNumeroRef;
  }

  findSelectedIndex(): number {
    return this.letterNumeroRefs.indexOf(this.selectedLetterNumberRef);
  }

}
