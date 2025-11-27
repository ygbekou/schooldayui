import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LookUpTable } from '../models/lookUpTable';
import { LookUpTableService } from '../services/lookUpTable.service';
import { RelationTableService } from '../services/relationTable.service';
import { College } from '../models/college';
import { CollegeService } from '../services/college.service';
import { Constants } from '../app.constants';
import { RelationAssignment } from '../models/relationAssignment';
import { RelationTable } from '../models/relationTable';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, CheckboxModule, SelectItem, PickListModule }  from 'primeng/primeng';
import { User } from '../models/User';  
import { DropdownUtil } from './dropdowns/dropdown.util';
 
@Component({
  selector: 'app-admin-relationTable',
  templateUrl: '../pages/adminRelationTable.html',
  providers: [LookUpTableService]
})
export class AdminRelationTable implements OnInit, OnDestroy {

  
  public error: String = '';
  displayDialog: boolean;
  newrelaTable: boolean;
  cols: any[];
  
  parentTableNames: SelectItem[];
  selectedParentTableName: string;
  filteredParentTables : LookUpTable[];
  public parentTables: LookUpTable[];
  public selectedParentTable:  LookUpTable;
  
  childTableNames: SelectItem[];
  selectedChildTableName: string;
  
  relationTable:  RelationTable;
  
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL; 
  ASSIGN_LABEL: string = Constants.ASSIGN_LABEL; 
  
  childList1: LookUpTable[];
  childList2: LookUpTable[];
  
  @ViewChild(FileUploader) fileUploader: FileUploader;
  constructor
    (
    private collegeService: CollegeService, 
    private lookUpTableService: LookUpTableService,
    private relationTableService: RelationTableService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

      this.parentTableNames = [];
      this.parentTableNames.push({label:Constants.CHOOSE_PARENT_TABLE, value:{name: ''}});
      this.parentTableNames.push({label:Constants.COLLEGE, value:{name: 'COLLEGE'}});
    
      this.childTableNames = [];
      this.childTableNames.push({label:Constants.CHOOSE_CHILD_TABLE, value:{name: ''}});
      this.childTableNames.push({label:Constants.DOCUMENT_TYPE, value:{name: 'DOCUMENT_TYPE'}});
    
  }
  
  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.DESCRIPTION, sortable: 'true', filter: 'true' }
    ];
    this.childList1 = [];
    this.childList2 = [];
  }

  ngOnDestroy() {
    this.parentTables = null;
    this.error = null;
    //this.selectedParentTable= null;
    //this.parentTable = null;
  }

  public getParentAll(): void {

    this.parentTables = [];
    
    this.lookUpTableService.getAll(this.selectedParentTableName["name"])
      .subscribe((data: LookUpTable[]) => {
        this.parentTables = data;
        this.filteredParentTables = data;
      },
      error => console.log(error),
      () => console.log('Get all ParentTables complete'));
  }
  
  public getChildAll(): void {

    this.childList1 = [];
    console.log( this.selectedParentTable);
    console.log( this.selectedParentTableName["name"]);
    this.relationTableService.getChildAll(this.selectedParentTable, 
      this.selectedParentTableName["name"] + "|" + this.selectedChildTableName["name"])
      .subscribe((data: RelationAssignment) => {
        this.childList1 = data.unAssignedItems;
        this.childList2 = data.assignedItems;
      },
      error => console.log(error),
      () => console.log('Get all ChildTables complete'));
  }
  
  public resetChildInfo() {
    this.childList1 = [];
    this.childList2 = [];
    this.selectedChildTableName = "";
  }
  
  filterParentTables(event) {
    this.filteredParentTables = DropdownUtil.filter(event, this.parentTables);
  }
  
  handleDropdownClickParent(event) {
    //this.filteredParentTables = [];
    setTimeout(() => {
      this.filteredParentTables = this.parentTables;
    }, 10)
  }
 
 
   save() {
    try {
      this.error = '';
      
      this.relationTable = new RelationTable();
      this.relationTable.parent = this.selectedParentTable;
      this.relationTable.childs = [];
      this.relationTable.childs.push(...this.childList2);
      
      console.info(this.childList2);
      console.log(this.selectedParentTableName["name"] + "|" + this.selectedChildTableName["name"]);
      this.relationTableService.save(this.relationTable, 
        this.selectedParentTableName["name"] + "|" + this.selectedChildTableName["name"])
        .subscribe(result => {
          if (result.id > 0) {
            this.relationTable = result;
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

}
