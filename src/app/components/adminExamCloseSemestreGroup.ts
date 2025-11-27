import {Component, OnInit, OnDestroy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter} from '@angular/core';
import { Message } from 'primeng/primeng';
import {User} from '../models/User';
import { CloseSemestreGroup } from '../models/closeSemestreGroup';
import { CloseSemestreGroupService } from '../services/closeSemestreGroup.service';
import {Constants} from '../app.constants';
import { CycleDropdown } from './dropdowns/dropdown.cycle';
import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';
import { SemestreGroupDropdown } from './dropdowns/dropdown.semestreGroup';
import {DataTableModule, DialogModule, InputTextareaModule, DataGridModule, PanelModule} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-admin-exam-close-semestre-group',
  templateUrl: '../pages/adminExamCloseSemestreGroup.html',
  providers: [CloseSemestreGroupService, Constants, CycleDropdown, SchoolYearDropdown, SemestreGroupDropdown]
})
export class AdminExamCloseSemestreGroup implements OnInit, OnDestroy {

  public user: User;
  public cycleDropdown: CycleDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public semestreGroupDropdown: SemestreGroupDropdown;
  public error: string;
  public msg: string;
  public disabled: boolean = false;
  
  msgs: Message[] = [];

  public closeSemestreGroup: CloseSemestreGroup;
  public selectedCloseSemestreGroup: CloseSemestreGroup;
  public closeSemestreGroups: CloseSemestreGroup[];
  newCloseSemestreGroup: boolean;
  displayDialog: boolean;
  cols: any[];
  submitButtonText: string = 'Délibérer';

  CYCLE: string = "Niveau";
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  TERM: string = Constants.TERM;
  SEMESTRE_GROUP:string='Groupe de semestres';

  constructor
    (
    private closeSemestreGroupService: CloseSemestreGroupService,
    private ccDropdown: CycleDropdown,
    private syDropdown: SchoolYearDropdown,
    private semestreGrpDropdown: SemestreGroupDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.cycleDropdown = ccDropdown;
    this.schoolYearDropdown = syDropdown;
    this.semestreGroupDropdown = semestreGrpDropdown;
  }

  ngOnInit() {

    this.closeSemestreGroup = new CloseSemestreGroup();

    this.user = JSON.parse(atob(Cookie.get('user')));

    this.cols = [
      { field: 'schoolYear.year', header: Constants.SCHOOLYEAR, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'cycle.name', header: this.CYCLE, type: 'string', sortable: 'true', filter: 'true' },
      { field: 'semestreGroup.name', header: this.SEMESTRE_GROUP, type: 'string', sortable: 'false', filter: 'true' },
      //{ field: 'semestreGroup.semestres', header: 'Semestres', type: 'string', sortable: 'false', filter: 'true' },
      { field: 'createDate', header: 'Date déliberation', type: 'Date', sortable: 'false', filter: 'true' }
    ];

  }

  ngOnDestroy() {
    this.user = null;
  }

  public getAll(): void {
    this.closeSemestreGroups = [];
    this.closeSemestreGroupService.getAll()
      .subscribe((data: CloseSemestreGroup[]) => this.closeSemestreGroups = data,
      error => console.log(error),
      () => console.log('Get all CloseSemestreGroups complete'));
  }

  public closeSemestreGroupByCycleAndSchoolyear() {
    console.log(this.closeSemestreGroup);

    this.submitButtonText = 'Délibération en cours...';
    this.error ='';
    this.msg = '';

    this.closeSemestreGroupService.save(this.closeSemestreGroup)
      .subscribe((result : CloseSemestreGroup) => {
        console.log(this.closeSemestreGroup);

        if (result.id > 0) {
          this.closeSemestreGroup = result;
          this.submitButtonText = 'Délibérer';
          this.msg = 'Groupe de semestres clôturé avec succès pour le cycle de ' + this.closeSemestreGroup.cycle.name + ',  ' + this.closeSemestreGroup.schoolYear.description + ' !';
          this.msgs.push({ severity: 'success', summary: 'Success', detail: 'Groupe de semestres clôturé avec succès pour le cycle de ' + this.closeSemestreGroup.cycle.name + ',  ' + this.closeSemestreGroup.schoolYear.description + ' !'});
          this.putInTable();
        }
        else if (result.error != null) {
          this.submitButtonText = 'Délibérer';
          this.error = result.error;
        }
        else {
          this.submitButtonText = 'Délibérer';
          this.error = 'Une erreur est survenue lors du traitement, réessayez !';
        }
      });
  }

  showDialogToAdd() {
    this.newCloseSemestreGroup = true;
    this.closeSemestreGroup = new CloseSemestreGroup();
    this.submitButtonText = 'Délibérer';
    this.displayDialog = true;
  }

  putInTable() {
    this.closeSemestreGroups.push(this.closeSemestreGroup);
    
    const onTheFly: CloseSemestreGroup[] = [];
    onTheFly.push(...this.closeSemestreGroups);
    this.closeSemestreGroups = onTheFly;

    this.resetData();
  }

  resetData() {
    this.closeSemestreGroup = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newCloseSemestreGroup = false;
    this.closeSemestreGroup = this.clone(evt.data);
    this.closeSemestreGroup.createDate = new Date(this.closeSemestreGroup.createDate);
    console.log(this.closeSemestreGroup);

    this.displayDialog = true;
  }

  clone(e: CloseSemestreGroup): CloseSemestreGroup {
    const aCloseSemestreGroup = new CloseSemestreGroup();
    for (const prop in e) {
      aCloseSemestreGroup[prop] = e[prop];
    }
    return aCloseSemestreGroup;
  }

}
