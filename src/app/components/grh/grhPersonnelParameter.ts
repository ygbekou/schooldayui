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
import { GrhSalaryType } from './grhSalaryType';
import { GrhPersonnelType } from './grhPersonnelType';
import { GrhTeacherType } from './grhTeacherType';
import { GrhTeacherLevel } from './grhTeacherLevel';

@Component({
  selector: 'app-grh-personnel-parmeter-menu',
  templateUrl: '../../pages/grh/grhPersonnelParameterMenu.html',
  providers: [SchoolYearDropdown]
})
export class GrhPersonnelParameterMenu implements OnInit {

    @ViewChild(GrhSalaryType) grhSalaryType: GrhSalaryType;
    @ViewChild(GrhPersonnelType) grhPersonnelType: GrhPersonnelType;
    @ViewChild(GrhTeacherType) grhTeacherType: GrhTeacherType;
    @ViewChild(GrhTeacherLevel) grhTeacherLevel: GrhTeacherLevel;

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    SALARY_TYPE: string = Constants.SALARY_TYPE;
    PERSONNEL_TYPE: string = Constants.PERSONNEL_TYPE;
    TEACHER_TYPE: string = Constants.TEACHER_TYPE;
    TEACHER_LEVEL: string = Constants.TEACHER_LEVEL;

    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      this.grhSalaryType.getAll();
    }

    onTabChange(evt) {
      if (evt.index == 0) {
        this.grhSalaryType.getAll();
      } else if (evt.index == 1) {
        this.grhPersonnelType.getAll();
      } else if (evt.index == 2) {
        this.grhTeacherType.getAll();
      }  else if (evt.index == 3) {
        this.grhTeacherLevel.getAll();
      } 
    }

}
