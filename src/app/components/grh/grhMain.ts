import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { AvantageTypeGRH } from './avantageType';
import { GrhAvantage } from './grhAvantage';
import { GrhContractType } from './grhContractType';
import { GrhFiscalYear } from './grhFiscalYear';
import { GrhEmployeeDocumentType } from './grhEmployeeDocumentType';
import { GrhPaiementMode } from './grhPaiementMode';
import { GrhEmployeeBank } from './grhEmployeeBank';
import {Constants} from '../../app.constants';
import {SchoolYearDropdown} from '../dropdowns/dropdown.schoolYear';
import {BaseService} from '../../services/base.service';

@Component({
  selector: 'app-grh-main',
  templateUrl: '../../pages/grh/grhMain.html',
  providers: [SchoolYearDropdown]
})
export class GrhMain implements OnInit {

    @ViewChild(AvantageTypeGRH) avantageTypeGRH: AvantageTypeGRH;
    @ViewChild(GrhAvantage) grhAvantage: GrhAvantage;
    @ViewChild(GrhContractType) grhContractType: GrhContractType;
    @ViewChild(GrhFiscalYear) grhFiscalYear: GrhFiscalYear;
    @ViewChild(GrhEmployeeDocumentType) grhEmployeeDocumentType: GrhEmployeeDocumentType;
    @ViewChild(GrhPaiementMode) grhPaiementMode: GrhPaiementMode;
    @ViewChild(GrhEmployeeBank) grhEmployeeBank: GrhEmployeeBank;

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    FISCAL_YEAR: string = Constants.FISCAL_YEAR;
    TYPE_CONTRACT: string = Constants.TYPE_CONTRACT;
    TYPE_AVANTAGE: string = Constants.TYPE_AVANTAGE;
    AVANTAGE: string = Constants.AVANTAGE;
    EMPLOYEE_DOCUMENT_TYPE: string = Constants.EMPLOYEE_DOCUMENT_TYPE;
    PAIEMENT_MODE: string = Constants.PAIEMENT_MODE;
    BANK: string = Constants.BANK;

    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      this.grhFiscalYear.getAll();
    }

    onTabChange(evt) {
      if (evt.index == 0) {
        this.grhFiscalYear.getAll();
      } else if (evt.index == 1) {
        this.grhContractType.getAll();
      } else if (evt.index == 2) {
        this.grhEmployeeDocumentType.getAllActive();
      }
      else if (evt.index == 3) {
        this.grhEmployeeBank.getAll();
      }
      else if (evt.index == 4) {
        this.grhPaiementMode.getAll();
      }
      else if (evt.index == 5) {
        this.avantageTypeGRH.getAll();
      }
      else if (evt.index == 6) {
        this.grhAvantage.getAll();
      }
    }

}
