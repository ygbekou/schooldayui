import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LookUpTable } from '../models/lookUpTable';
import { LookUpTableService } from '../services/lookUpTable.service';
import { Constants } from '../app.constants';
import { Category } from '../models/category';
import { Building } from '../models/building';
import { EventType } from '../models/eventType';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, CheckboxModule, SelectItem } from 'primeng/primeng';
import { User } from '../models/User';
import { BuildingDropdown } from './dropdowns/dropdown.building';
import { CategoryDropdown } from './dropdowns/dropdown.category';
import { EventTypeDropdown } from './dropdowns/dropdown.eventType';

@Component({
  selector: 'app-admin-lookUpTable',
  templateUrl: '../pages/adminLookUpTable.html',
  providers: [LookUpTableService, CategoryDropdown, BuildingDropdown, EventTypeDropdown ]
})
export class AdminLookUpTable implements OnInit, OnDestroy {

  public lookUpTables: LookUpTable[];
  public error: String = '';
  public selectedLookUpTable: LookUpTable;
  displayDialog: boolean;
  lookUpTable: LookUpTable = new LookUpTable();
  newLookUpTable: boolean;
  cols: any[];
  tableNames: SelectItem[];
  selectedTableName: string;
  public selectedParentCategory: Category;
  public selectedBuilding: Building;
  public eventType1: EventType;
  public categoryDropdown: CategoryDropdown;
  public eventTypeDropdown: EventTypeDropdown;
  public buildingDropdown: BuildingDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  public typePersonPercents: SelectItem[];
  public selectedTypePersonPercent: number;

  @ViewChild(FileUploader) fileUploader: FileUploader;
  constructor
    (
    private lookUpTableService: LookUpTableService,
    private catDropdown: CategoryDropdown,
    private bldDropdown: BuildingDropdown,
    private evtTypeDropdown: EventTypeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {

      this.categoryDropdown = catDropdown;
      this.eventTypeDropdown = evtTypeDropdown;
      this.buildingDropdown = bldDropdown;

      this.tableNames = [];
      this.tableNames.push({label:Constants.GROUP, value:{name: 'TERM_GROUP'}});
      this.tableNames.push({label:Constants.SEMESTRE_GROUP, value:{name: 'SEMESTRE_GROUP'}});
      this.tableNames.push({label:Constants.TUITION_TYPE, value:{name: 'TUITION_TYPE'}});
      this.tableNames.push({label:Constants.EVENT_TYPE, value:{name: 'EVENT_TYPE'}});
      this.tableNames.push({label:Constants.EXPENSE_TYPE, value:{name: 'EXPENSE_TYPE'}});
      this.tableNames.push({label:Constants.EXAM_TYPE, value:{name: 'EXAM_TYPE'}});
      this.tableNames.push({label:Constants.PERIOD, value:{name: 'TIME_PERIOD'}});
      this.tableNames.push({label:Constants.DOCUMENT_TYPE, value:{name: 'DOCUMENT_TYPE'}});
      this.tableNames.push({label:Constants.DEPARTMENT, value:{name: 'DEPARTMENT'}});
      this.tableNames.push({label:Constants.BRAND, value:{name: 'BRAND'}});
      this.tableNames.push({label:Constants.PUBLISHER, value:{name: 'PUBLISHER'}});
      this.tableNames.push({label:Constants.LANGUAGE, value:{name: 'LANGUAGE'}});
      this.tableNames.push({label:Constants.CATEGORY, value:{name: 'CATEGORY'}});
      this.tableNames.push({label:Constants.BUILDING, value:{name: 'BUILDING'}});
      this.tableNames.push({label:Constants.ROOM, value:{name: 'ROOM'}});
      this.tableNames.push({label:Constants.TIMESHEET_BILLING_TYPE, value:{name: 'TIMESHEET_ENTRY_TYPE'}});
      this.tableNames.push({label:Constants.TIMESHEET_HOUR_TYPE, value:{name: 'TIMESHEET_HOUR_TYPE'}});
      this.tableNames.push({label:Constants.COMPANY, value:{name: 'COMPANY'}});
      this.tableNames.push({label:Constants.BANK, value:{name: 'BANK'}});
      this.tableNames.push({label:Constants.FEE, value:{name: 'FEE'}});
      this.tableNames.push({label:Constants.CANAL, value:{name: 'INFORMATION_CHANNEL'}});
      this.tableNames.push({label:Constants.COURSE_GROUPE_CODE, value:{name: 'COURSE_GROUPE_CODE'}});
      this.tableNames.push({label:Constants.STUDENTS_PROJECTS_PROMOTION, value:{name: 'STUDENTS_PROJECTS_PROMOTION'}});
      this.tableNames.push({label:Constants.PERSON_TYPE, value:{name: 'PERSON_TYPE'}});


      //Set percent for the type person
      this.typePersonPercents = [];
      for(var i=0; i <= 100; i++){
        this.typePersonPercents.push({label: i+"%", value: i/100});
      }
      

  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' }
    ];
  }

  ngOnDestroy() {
    this.lookUpTables = null;
    this.error = null;
    this.selectedLookUpTable= null;
    this.lookUpTable = null;
  }

  public getAll(): void {
    if ("EVENT_TYPE" === this.selectedTableName["name"]) {
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
        { field: 'flag1', header: Constants.AFFICHER_SUR_BULLETIN, sortable: 'true', filter: 'true' }
      ];
    }
    else if ("TIME_PERIOD" === this.selectedTableName["name"]) {
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
        { field: 'string1', header: Constants.DEBUT, sortable: 'true', filter: 'true' },
        { field: 'string2', header: Constants.FIN, sortable: 'true', filter: 'true' }
      ];
    }else if ("DEPARTMENT" === this.selectedTableName["name"]){

          this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
        { field: 'flag1', header: Constants.DISPLAY_DPT, sortable: 'true', filter: 'true' },
        { field: 'integer1', header: Constants.RANK, sortable: 'true', filter: 'true' },
      ];

    }
    else if ("CATEGORY" === this.selectedTableName["name"]) {
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
        { field: 'string1', header: Constants.PARENT, sortable: 'true', filter: 'true' },
        { field: 'integer3', header: Constants.LOAN_PERIOD },
        { field: 'double1', header: Constants.FINE_PER_PERIOD },
        { field: 'integer2', header: Constants.NB_DAYS_PER_FINE },
      ];
    }
    else if ("ROOM" === this.selectedTableName["name"]) {
      this.cols = [
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
        { field: 'string1', header: Constants.BUILDING, sortable: 'true', filter: 'true' }
      ];
    }
    else if ("COMPANY" === this.selectedTableName["name"]) {
        this.cols = [
            { field: 'name', header: Constants.NOM_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string1', header: Constants.PHONE_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string2', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string3', header: Constants.CONTACT_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string4', header: Constants.ADDRESS_COMPANY, sortable: 'true', filter: 'true' }
        ];
    }
    else if ("BANK" === this.selectedTableName["name"]) {
        this.cols = [
            { field: 'name', header: Constants.NOM_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string1', header: Constants.PHONE_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string2', header: Constants.EMAIL_COMPANY, sortable: 'true', filter: 'true' },
            { field: 'string3', header: Constants.ADDRESS_COMPANY, sortable: 'true', filter: 'true' }
        ];
    }
    else if ("FEE" === this.selectedTableName["name"]) {
        this.cols = [
            { field: 'name', header: Constants.INVOICE_FEE, sortable: 'true', filter: 'true' },
            { field: 'double1', header: Constants.COST, sortable: 'true', filter: 'true' }
        ];
    }
    else if ("INFORMATION_CHANNEL" === this.selectedTableName["name"]) {
        this.cols = [
            { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
            { field: 'string1', header: Constants.DESCRIPTION, sortable: 'true', filter: 'true' }
        ];
    }
    else if ("COURSE_GROUPE_CODE" === this.selectedTableName["name"]) {
        this.cols = [
            { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' }
        ];
    }
     else if ("STUDENTS_PROJECTS_PROMOTION" === this.selectedTableName["name"]) {
        this.cols = [
            { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' }
        ];
    }
    else if ("PERSON_TYPE" === this.selectedTableName["name"]) {
      this.cols = [
          { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true' },
          { field: 'string1', header: Constants.PERSON_TYPE_RATE, sortable: 'true', filter: 'true' }
      ];
  }
    else {
      this.cols = [
      { field: 'name', header: Constants.DESCRIPTION, sortable: 'true', filter: 'true' }
    ];
    }

    this.lookUpTables = [];
    this.lookUpTableService.getAll(this.selectedTableName["name"])
      .subscribe((data: LookUpTable[]) => {
        this.lookUpTables = data;
        if ("PERSON_TYPE" === this.selectedTableName["name"]){
          for(var i=0;  i < this.lookUpTables.length; i++){
            this.lookUpTables[i].string1 = this.lookUpTables[i].double1 * 100 + "%";
          }
        }
      },
      error => console.log(error),
      () => console.log('Get all LookUpTables complete'));

     
  }


  showDialogToAdd() {
    this.newLookUpTable = true;
    this.selectedParentCategory = new Category();
    this.selectedBuilding = new Building();
    this.lookUpTable = new LookUpTable();
    this.displayDialog = true;
  }

  private validateForm(): boolean {
    return this.lookUpTable.integer1 < this.lookUpTable.integer3
      || (this.lookUpTable.integer1 === this.lookUpTable.integer3 && this.lookUpTable.integer2 < this.lookUpTable.integer4)

  }

  save() {

    if ("TIME_PERIOD" === this.selectedTableName["name"]) {
       if (!this.validateForm()) {
         this.error = Constants.TIME_RANGE_ERROR;
         return;
      }
    }

    if ("CATEGORY" === this.selectedTableName["name"]) {
       this.lookUpTable.integer1 = this.selectedParentCategory.id;
       this.lookUpTable.string1 = this.selectedParentCategory.name;
    }

    if ("ROOM" === this.selectedTableName["name"]) {
       this.lookUpTable.integer1 = this.selectedBuilding.id;
       this.lookUpTable.string1 = this.selectedBuilding.name;
    }
     if ("DEPARTMENT" === this.selectedTableName["name"]) {
      if(this.lookUpTable.flag1 == null){
        this.lookUpTable.flag1 = false;
      }

    }

    try {
      this.error = '';
      this.lookUpTableService.save(this.lookUpTable, this.selectedTableName["name"])
        .subscribe(result => {
          if (result.id > 0) {
            this.lookUpTable = result;
                if ("TIME_PERIOD" === this.selectedTableName["name"]) {
                  const beginHour = (this.lookUpTable.integer1 < 10) ? ('0' + this.lookUpTable.integer1) : this.lookUpTable.integer1;
                  const beginMinute = (this.lookUpTable.integer2 < 10) ? ('0' + this.lookUpTable.integer2) : this.lookUpTable.integer2;
                  const endHour = (this.lookUpTable.integer3 < 10) ? ('0' + this.lookUpTable.integer3) : this.lookUpTable.integer3;
                  const endMinute = (this.lookUpTable.integer4 < 10) ? ('0' + this.lookUpTable.integer4) : this.lookUpTable.integer4;

                  this.lookUpTable.string1 = beginHour + ':' + beginMinute;
                  this.lookUpTable.string2 = endHour + ':' + endMinute;

                }
            console.log(this.lookUpTable);
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
      this.lookUpTableService.delete(this.lookUpTable, this.selectedTableName["name"])
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
    if (this.newLookUpTable) {
      this.lookUpTables.push(this.lookUpTable);
    }
    else {
      this.lookUpTables[this.findSelectedIndex()] = this.lookUpTable;
    }

    const onTheFly: LookUpTable [] = [];
    onTheFly.push(...this.lookUpTables);
    this.lookUpTables = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.lookUpTables.splice(this.findSelectedIndex(), 1);

    const onTheFly: LookUpTable [] = [];
    onTheFly.push(...this.lookUpTables);
    this.lookUpTables = onTheFly;

    this.resetData();
  }

  resetData() {
    this.lookUpTable = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newLookUpTable = false;
    this.lookUpTable = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: LookUpTable): LookUpTable {
    const aLookUpTable = new LookUpTable();
    for (const prop in e) {
      aLookUpTable[prop] = e[prop];
    }
    if ("CATEGORY" === this.selectedTableName["name"]) {
      this.selectedParentCategory = new Category();
      this.selectedParentCategory.id = e.integer1;
      this.selectedParentCategory.name = e.string1;
    }
     if ("ROOM" === this.selectedTableName["name"]) {
      this.selectedBuilding = new Building();
      this.selectedBuilding.id = e.integer1;
      this.selectedBuilding.name = e.string1;
    }
    return aLookUpTable;
  }

  reload() {

  }

  findSelectedIndex(): number {
    return this.lookUpTables.indexOf(this.selectedLookUpTable);
  }

}
