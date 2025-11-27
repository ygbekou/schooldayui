import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { GrhPayParameterType } from './grhPayParameterType';
import { GrhPayParameter } from './grhPayParameter';
import { GrhFiscalYearPayParameter } from './grhFiscalYearPayParameter';
import { GrhHourlyCost } from './grhHourlyCost';
import {Constants} from '../../app.constants';
import {SchoolYearDropdown} from '../dropdowns/dropdown.schoolYear';
import {BaseService} from '../../services/base.service';
import { GrhLetterNumeroRef } from './grhLetterNumeroReft';
import {GrhLetterObject} from './grhLetterObject';
import {GrhCivility} from './grhCivility';
import { GrhSocietyBank } from './grhSocietyBank';
import {GrhAccountNumber} from './grhAccountNumber'; 
import {GrhLetterContent} from './grhLetterContent';

@Component({
  selector: 'app-grh-pay-parmeter-menu',
  templateUrl: '../../pages/grh/grhTransferLetterMenu.html',
  providers: [SchoolYearDropdown]
})
export class GrhTransferLetterMenu implements OnInit {

    @ViewChild(GrhPayParameterType) grhPayParameterType: GrhPayParameterType;
    @ViewChild(GrhPayParameter) grhPayParameter: GrhPayParameter;
    @ViewChild(GrhFiscalYearPayParameter) grhFiscalYearPayParameter: GrhFiscalYearPayParameter;
    @ViewChild(GrhHourlyCost) grhHourlyCost: GrhHourlyCost;
   

    @ViewChild(GrhLetterNumeroRef) grhLetterNumeroRef: GrhLetterNumeroRef;
    @ViewChild(GrhLetterObject) grhLetterObject: GrhLetterObject;
    @ViewChild(GrhCivility) grhCivility: GrhCivility;
    @ViewChild(GrhSocietyBank) grhSocietyBank: GrhSocietyBank;
    @ViewChild(GrhAccountNumber) grhAccountNumber: GrhAccountNumber;
    @ViewChild(GrhLetterContent) grhLetterContent: GrhLetterContent;

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    PAY_PARAMETER_TYPE: string = Constants.PAY_PARAMETER_TYPE;
    PAY_PARAMETER: string = Constants.PAY_PARAMETER;
    FISCAL_YEAR_PAY_PARAMETER: string = Constants.FISCAL_YEAR_PAY_PARAMETER;
    HOURLY_COST_TEACHER: string = Constants.HOURLY_COST_TEACHER;
    LETTER_NUMERO_REF: string = Constants.LETTER_NUMERO_REF;
    LETTER_OJECT: string= Constants.LETTER_OJECT;
    CIVILITY: string = Constants.CIVILITY;
    BANK: string = Constants.BANK;


    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      this.grhLetterNumeroRef.getAll();
    }

    onTabChange(evt) {
      if (evt.index == 0) {
        this.grhLetterNumeroRef.getAll();
      } else if (evt.index == 1) {
        this.grhLetterObject.getAll();
      } else if (evt.index == 2) {
        this.grhCivility.getAll();
      } else if (evt.index == 3) {
        this.grhSocietyBank.getAll();
      } else if (evt.index == 4) {
        this.grhAccountNumber.getAll();
      }else if(evt.index == 5){
        this.grhLetterContent.getAll();
      }
    }

}
