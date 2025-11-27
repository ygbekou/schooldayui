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

@Component({
  selector: 'app-grh-pay-parmeter-menu',
  templateUrl: '../../pages/grh/grhPayParameterMenu.html',
  providers: [SchoolYearDropdown]
})
export class GrhPayParameterMenu implements OnInit {

    @ViewChild(GrhPayParameterType) grhPayParameterType: GrhPayParameterType;
    @ViewChild(GrhPayParameter) grhPayParameter: GrhPayParameter;
    @ViewChild(GrhFiscalYearPayParameter) grhFiscalYearPayParameter: GrhFiscalYearPayParameter;
    @ViewChild(GrhHourlyCost) grhHourlyCost: GrhHourlyCost;

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    PAY_PARAMETER_TYPE: string = Constants.PAY_PARAMETER_TYPE;
    PAY_PARAMETER: string = Constants.PAY_PARAMETER;
    FISCAL_YEAR_PAY_PARAMETER: string = Constants.FISCAL_YEAR_PAY_PARAMETER;
    HOURLY_COST_TEACHER: string = Constants.HOURLY_COST_TEACHER;

    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      this.grhPayParameterType.getAll();
    }

    onTabChange(evt) {
      if (evt.index == 0) {
        this.grhPayParameterType.getAll();
      } else if (evt.index == 1) {
        this.grhPayParameter.getAll();
      } else if (evt.index == 2) {
        this.grhFiscalYearPayParameter.getAll();
      } else if (evt.index == 3) {
        this.grhHourlyCost.getAll();
      }
    }

}
