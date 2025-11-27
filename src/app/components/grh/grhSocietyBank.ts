import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {LetterObject} from '../../models/grh/letterObject';
import {SocietyBank} from '../../models/grh/societyBank'
import { User } from '../../models/User';
import { AvantageTypeService } from '../../services/grh/avantageType.service';
import { LetterService} from '../../services/grh/letter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-society-bank',
  templateUrl: '../../pages/grh/grhSocietyBank.html',
  providers: [AvantageTypeService, Constants, LetterService]
})

export class GrhSocietyBank implements OnInit, OnDestroy {

  public letterObject: LetterObject = new LetterObject();
  public letterObjects: LetterObject[];
  public selectedLetterObject: LetterObject;

  public societyBank: SocietyBank = new SocietyBank();
  public societyBanks: SocietyBank[];
  public selectedSocityBank: SocietyBank;

  public error: String = '';
  displayDialog: boolean;
  newLetterObject: boolean;
  newSocietyBank: boolean;
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
    this.societyBanks= null;
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
        { field: 'code', header: 'Code', sortable: 'true', filter: 'false', style:  {'width':'10%'}  },
        { field: 'name', header: 'Nom', sortable: 'false', filter: 'true',  style:  {'width':'30%'}  },
        { field: 'email', header: 'Mail', sortable: 'false', filter: 'false',  style:  {'width':'25%'}  },
        { field: 'phoneNumber', header: 'Phone', sortable: 'false', filter: 'false',  style:  {'width':'30%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newSocietyBank = true;
      this.societyBank = new SocietyBank();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.societyBanks = [];
    this.letterService.getAllSocietyBank()
      .subscribe((data: SocietyBank[]) => this.societyBanks = data,
      error => console.log(error),
      () => console.log('Get all societyBanks complete'));
  }

  save() {
    try {
      this.error = '';
      this.letterService.saveSocietyBank(this.societyBank)
        .subscribe(result => {
          if (result.id > 0) {
            this.societyBank = result;
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
      this.letterService.deleteSocietyBank(this.societyBank)
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
    if (this.newSocietyBank)
       this.societyBanks.push(this.societyBank);
    else
      this.societyBanks[this.findSelectedIndex()] = this.societyBank;

    var onTheFly: SocietyBank[] = [];
    onTheFly.push(...this.societyBanks);
    this.societyBanks = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.societyBanks.splice(this.findSelectedIndex(), 1);
    var onTheFly: SocietyBank[] = [];
    onTheFly.push(...this.societyBanks);
    this.societyBanks = onTheFly;
    this.resetData();
  }

  resetData() {
    this.societyBank = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newSocietyBank = false;
    this.societyBank = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: SocietyBank): SocietyBank {
    let aSocietyBank = new SocietyBank();
    for (let prop in e) {
      aSocietyBank[prop] = e[prop];
    }
    return aSocietyBank;
  }

  findSelectedIndex(): number {
    return this.societyBanks.indexOf(this.selectedSocityBank);
  }

}
