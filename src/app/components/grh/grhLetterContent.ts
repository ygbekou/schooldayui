import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Avantage } from '../../models/grh/avantage';
import { User } from '../../models/User';
import { AvantageService } from '../../services/grh/avantage.service';
import {LetterService} from '../../services/grh/letter.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AvantageTypeDropdown } from '../dropdowns/dropdown.avantageType';
import {SocietyBankDropdown} from '../dropdowns/grh/dropdown.societyBank';
import { DataTableModule, DialogModule } from 'primeng/primeng';
import { AccountNumber } from 'app/models/grh/accountNumber';
import {LetterNumeroRefDropdown} from '../dropdowns/grh/dropdown.letterNumeroRef';
import {LetterObjectDropdown} from '../dropdowns/grh/dropdown.letterObject';
import {CivilityDropdown} from '../dropdowns/grh/dropdown.civility';
import { LetterContent } from 'app/models/grh/letterContent';
import { AccountNumberDropdown } from '../dropdowns/grh/dropdown.accountNumber';
import { LetterContentView } from 'app/models/grh/letterContentView';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grh-letter-content',
  templateUrl: '../../pages/grh/grhLetterContent.html',
  providers: [AccountNumberDropdown, LetterObjectDropdown, LetterNumeroRefDropdown, CivilityDropdown, SocietyBankDropdown, Constants]
})

export class GrhLetterContent implements OnInit, OnDestroy {


  public letterContent: LetterContent = new LetterContent();
  public letterContentN: LetterContent = new LetterContent();
  public letterContents: LetterContent[];
  public selectedLetterContent: LetterContent;
  public newLetterContent: boolean;

  public letterContentView: LetterContentView = new LetterContentView()
  public letterContentViews: LetterContentView[];
  public selectedLetterContenView: LetterContentView;
  public newLetterContentView: boolean;

  public error: String = '';
  displayDialog: boolean;
  newAccoutNumber: boolean;

  cols: any[];
  public user: User;
  public societyBankDropdown: SocietyBankDropdown;
  public letterNumeroRefDropdown: LetterNumeroRefDropdown;
  public letterObjectDropdown: LetterObjectDropdown;
  public civilityDropdown: CivilityDropdown;
  public accountNumberDropdown: AccountNumberDropdown;

  public reportName: String ='';

  DETAIL: string = Constants.DETAIL;
  LEVELS:  string = Constants.LEVELS;
  SUBJECT:  string = Constants.SUBJECT;
  NAME:  string = Constants.NAME;
  DESCRIPTION:  string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
   PRINT: string = Constants.PRINT;

  constructor
    (
    private letterService: LetterService,
    private sbDropDown: SocietyBankDropdown,
    private aNumber: AccountNumberDropdown,
    private object: LetterObjectDropdown,
    private lRef: LetterNumeroRefDropdown,
    private cv: CivilityDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.societyBankDropdown = sbDropDown;
    this.accountNumberDropdown = aNumber;
    this.letterObjectDropdown = object;
    this.letterNumeroRefDropdown = lRef;
    this.civilityDropdown = cv;
  }
  ngOnDestroy() {
    this.letterContentViews = null;
    this.error = null;
    this.selectedLetterContent = null;
    this.letterContent = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'letterNumeroRef', header: 'Ref.', sortable: 'true', filter: 'true', style:  {'width':'28%'}  },
        { field: 'letterObject', header: 'Objet.', sortable: 'true', filter: 'true', style:  {'width':'28%'}  },
        { field: 'bank', header: 'Banque', sortable: 'true', filter: 'true', style:  {'width':'19%'}  },
        { field: 'accountNumber', header: 'Numero Bancaire', sortable: 'true', filter: 'true', style:  {'width':'20%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newLetterContent = true;
      this.letterContent = new LetterContent();
      this.displayDialog = true;
    }
  }
  public transform(){
     try{
        this.error = '';
      this.letterContentView.id = this.letterContent.id;
      this.letterContentView.accountNumberId = this.letterContent.accountNumber.id;
      this.letterContentView.amountInLetter = this.letterContent.amountInLetter;
      this.letterContentView.civilityId = this.letterContent.civility.id;
      this.letterContentView.letterNumeroRefId = this.letterContent.letterNumeroRef.id;
      this.letterContentView.letterObjectId = this.letterContent.letterObject.id;
      this.letterContentView.accountNumber = this.letterContent.accountNumber.number;
      this.letterContentView.civility = this.letterContent.civility.name;
      this.letterContentView.letterNumeroRef = this.letterContent.letterNumeroRef.name;
      this.letterContentView.letterObject = this.letterContent.letterObject.name;
      this.letterContentView.bank = this.letterContent.accountNumber.societyBank.name;
      console.log(this.letterContentView);
     }catch(e){
      console.log(e);
     }
  }

  public getAll(): void {
    this.letterContentViews = [];
    this.letterService.getAllLetterContent()
      .subscribe((data: LetterContentView[]) => this.letterContentViews = data,
      error => console.log(error),
      () => console.log('Get all letterContents complete'));
  }

  public getById(l: number) {
   this.letterService.getLetterContentById(l)
   .subscribe(result =>{
     if(result.id>0){
       this.letterContent = result;
     } else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
   });
  }

  save() {
    try {
      this.error = '';
     this.transform();
      this.letterService.saveLetterContent(this.letterContent)
        .subscribe(result => {
          if (result.id > 0) {
            this.letterContent = result;
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
      this.transform();
      this.letterService.deleteLetterContentById(this.letterContentView)
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

  getLetterContent(evt){
    this.getById(evt.data.id);
  }

 public printLetter() {
   
   
    this.letterService.printLetter(this.letterContent).subscribe((data: string) => { this.reportName = data; },
      error => console.log(error),
      () => console.log('Get printletter'));
  }
  putInTable() {
    if (this.newLetterContent){
      this.transform();
      this.letterContentViews.push(this.letterContentView);
    }
    else{
      this.transform();
      this.letterContentViews[this.findSelectedIndex()] = this.letterContentView;
    }
    var onTheFly: LetterContentView[] = [];
    onTheFly.push(...this.letterContentViews);
    this.letterContentViews = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.letterContentViews.splice(this.findSelectedIndex(), 1);
    var onTheFly: LetterContentView[] = [];
    onTheFly.push(...this.letterContentViews);
    this.letterContentViews = onTheFly;
    this.resetData();
  }

  resetData() {
    this.letterContent = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newLetterContent = false;
    this.getById(evt.data.id);
    this.letterContent = this.clone(this.letterContent);
    this.displayDialog = true;
  }

  clone(e: LetterContent): LetterContent {
    let aLetterContent = new LetterContent();
    for (let prop in e) {
      aLetterContent[prop] = e[prop];
    }
    return aLetterContent;
  }

  findSelectedIndex(): number {
    this.transform();
    return this.letterContentViews.indexOf(this.letterContentView);
    
  }
}
