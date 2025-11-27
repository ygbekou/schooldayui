import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HourlyCost } from '../../models/grh/hourlyCost';
import { TeacherType } from '../../models/grh/teacherType';
import { TeacherLevel } from '../../models/grh/teacherLevel';
import { User } from '../../models/User';
import { HourlyCostService } from '../../services/grh/hourlyCost.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TimeSheetEntryTypeDropdown } from '../dropdowns/dropdown.timeSheetEntryType';
import { PayParameterDropdown } from '../dropdowns/grh/dropdown.payParameter';
import { FiscalYearDropdown } from '../dropdowns/grh/dropdown.fiscalYear';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-hourly-cost',
  templateUrl: '../../pages/grh/grhHourlyCost.html',
  providers: [HourlyCostService, TimeSheetEntryTypeDropdown,
              PayParameterDropdown, FiscalYearDropdown, Constants]
})

export class GrhHourlyCost implements OnInit, OnDestroy {

  public hourlyCost: HourlyCost;
  public hourlyCosts: HourlyCost[];
  public selectedHourlyCost: HourlyCost;

  public teacherType: TeacherType;
  public teacherLevel: TeacherLevel;

  teacherTypes = TeacherType;
  teacherLevels = TeacherLevel;

  public error: String = '';
  displayDialog: boolean;
  newHourlyCost: boolean;
  cols: any[];
  public user: User;
  public timeSheetEntryTypeDropdown: TimeSheetEntryTypeDropdown;
  public payParameterDropdown: PayParameterDropdown;
  public fiscalYearDropdown: FiscalYearDropdown;

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
    private hourlyCostService: HourlyCostService,
    private ppDropdon: PayParameterDropdown,
    private fyDropdon: FiscalYearDropdown,
    private tsetDropdown: TimeSheetEntryTypeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.payParameterDropdown = ppDropdon;
    this.fiscalYearDropdown = fyDropdon;
    this.timeSheetEntryTypeDropdown = tsetDropdown;
  }
  ngOnDestroy() {
    this.hourlyCosts = null;
    this.error = null;
    this.selectedHourlyCost = null;
    this.hourlyCost = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'timeSheetEntryType.name', header: 'Type heure', sortable: 'true', filter: 'true', style:  {'width':'40%'}  },
        { field: 'teacherType', header: 'Type ens.', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'level', header: 'Grade', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'amount', header: 'Coût horaire', sortable: 'true', filter: 'true',  style:  {'width':'20%'}  }
      ];
      console.log(this.teacherTypes);
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newHourlyCost = true;
      this.hourlyCost = new HourlyCost();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.hourlyCosts = [];
    this.hourlyCostService.getAll()
      .subscribe((data: HourlyCost[]) => this.hourlyCosts = data,
      error => console.log(error),
      () => console.log('Get all HourlyCosts complete'));
  }

  save() {
    try {
      this.error = '';
      /*
      this.hourlyCost.teacherType = TeacherType.INTERNE;
      this.hourlyCost.level = TeacherLevel.INGENEER;
      */
      this.hourlyCost.status = 1;
      console.log(this.hourlyCost);

      this.hourlyCostService.save(this.hourlyCost)
        .subscribe(result => {
          if (result.id > 0) {
            this.hourlyCost = result;
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
      this.hourlyCostService.delete(this.hourlyCost)
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
    if (this.newHourlyCost)
      this.hourlyCosts.push(this.hourlyCost);
    else
      this.hourlyCosts[this.findSelectedIndex()] = this.hourlyCost;

    var onTheFly: HourlyCost[] = [];
    onTheFly.push(...this.hourlyCosts);
    this.hourlyCosts = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.hourlyCosts.splice(this.findSelectedIndex(), 1);
    var onTheFly: HourlyCost[] = [];
    onTheFly.push(...this.hourlyCosts);
    this.hourlyCosts = onTheFly;
    this.resetData();
  }

  resetData() {
    this.hourlyCost = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newHourlyCost = false;
    this.hourlyCost = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: HourlyCost): HourlyCost {
    let aHourlyCost = new HourlyCost();
    for (let prop in e) {
      aHourlyCost[prop] = e[prop];
    }
    return aHourlyCost;
  }

  findSelectedIndex(): number {
    return this.hourlyCosts.indexOf(this.selectedHourlyCost);
  }

}
