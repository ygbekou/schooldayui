import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Level } from '../models/level';
import { LevelService } from '../services/level.service';
import { Constants } from '../app.constants';
import { CollegeDropdown } from './dropdowns/dropdown.college';
import { LevelGlobalDropdown } from './dropdowns/dropdown.levelGlobal';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LevelGlobal } from 'app/models/levelGlobal';
import { BaseService } from 'app/services';

@Component({
  selector: 'app-admin-levelGlobal',
  templateUrl: '../pages/adminLevelGlobal.html',
  providers: [LevelService, CollegeDropdown, ConfirmationService]
})
export class AdminLevelGlobal implements OnInit, OnDestroy {

  public levels: Level[];
  public levelGlobals: LevelGlobal[];
  public error: string = '';
  public selectedLevel: Level;
  public selectedLevelGlobal: Level;
  displayDialog: boolean;
  level: Level = new Level();
  levelGlobal: LevelGlobal = new LevelGlobal();
  newLevelGlobal: boolean;
  cols: any[];
  colleges = [];
  lmd = JSON.parse(Cookie.get('lmd'));
  @ViewChild(FileUploader) fileUploader: FileUploader;
  collegeDropdown: LevelGlobalDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  FILIERE: string = Constants.FILIERE;

  constructor(
    private levelService: LevelService,
    private baseService: BaseService,
    private clgDropdown: LevelGlobalDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {
    this.collegeDropdown = clgDropdown;
  }

  ngOnDestroy() {
    this.levelGlobals = null;
    this.error = null;
    this.selectedLevelGlobal = null;
    this.levelGlobal = null;
    this.cols = null;
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: { 'width': '40%', 'overflow': 'visible' } }
    ];
  }

  public getAll(): void {
    this.levels = [];
    this.baseService.getAllLevelGlobal()
      .subscribe(
        (data: LevelGlobal[]) => this.levelGlobals = data,
        error => console.log(error),
        () => console.log('Get all Levels complete')
      );
  }

  showDialogToAdd() {
    this.newLevelGlobal = true;
    this.levelGlobal = new LevelGlobal();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.baseService.saveLevelGlobal(this.levelGlobal)
        .subscribe(result => {
          if (result.id > 0) {
            this.levelGlobal = result;
            this.putInTable();
          } else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        });
      console.log(this.levelGlobal);
    } catch (e) {
      console.log(e);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete();
      },
      reject: () => {
        
      }
    });
  }

  delete() {
    try {
      this.error = '';
      this.baseService.deleteLevelGlobal(this.levelGlobal)
        .subscribe(result => {
          if (result) {
            this.removeFromTable();
          } else {
            this.error = Constants.deleteFailed;
            this.displayDialog = true;
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  putInTable() {
    if (this.newLevelGlobal) {
      this.levelGlobals.push(this.levelGlobal);
    } else {
      this.levelGlobals[this.findSelectedIndex()] = this.levelGlobal;
    }

    const onTheFly: LevelGlobal[] = [];
    onTheFly.push(...this.levelGlobals);
    this.levelGlobals = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.levelGlobals.splice(this.findSelectedIndex(), 1);
    const onTheFly: LevelGlobal[] = [];
    onTheFly.push(...this.levelGlobals);
    this.levelGlobals = onTheFly;
    this.resetData();
  }

  resetData() {
    this.levelGlobal = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newLevelGlobal = false;
    this.levelGlobal = this.clone(evt.data);
    console.log(this.levelGlobal);
    this.displayDialog = true;
  }

  clone(e: LevelGlobal): LevelGlobal {
    const aLevelGlobal = new LevelGlobal();
    for (const prop in e) {
      aLevelGlobal[prop] = e[prop];
    }
    return aLevelGlobal;
  }

  findSelectedIndex(): number {
    return this.levelGlobals.indexOf(this.selectedLevelGlobal);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage('level', data);
  }
}
