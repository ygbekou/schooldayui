import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Level } from '../models/level';
import { LevelService } from '../services/level.service';
import { Constants } from '../app.constants';
import { CollegeDropdown } from './dropdowns/dropdown.college';
import { LevelGlobalDropdown } from './dropdowns/dropdown.levelGlobal';
import { ConfirmationService, DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin-level',
  templateUrl: '../pages/adminLevel.html',
  providers: [LevelService, CollegeDropdown,LevelGlobalDropdown,ConfirmationService]
})
export class AdminLevel implements OnInit, OnDestroy {

  public levels: Level[];
  public error: String = '';
  public selectedLevel: Level;
  displayDialog: boolean;
  level: Level = new Level();
  newLevel: boolean;
  cols: any[];
  colleges = [];
  lmd = JSON.parse(Cookie.get('lmd'));
  @ViewChild(FileUploader) fileUploader: FileUploader;
  collegeDropdown: CollegeDropdown;
  levelGlobalDropdown: LevelGlobalDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  FILIERE: string = Constants.FILIERE;
  constructor
    (
      private levelService: LevelService,
      private clgDropdown: CollegeDropdown,
      private levelGDropdown: LevelGlobalDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private confirmationService: ConfirmationService
    ) {
    this.collegeDropdown = clgDropdown;
    this.levelGlobalDropdown = levelGDropdown;
  }

  ngOnDestroy() {
    this.levels = null;
    this.error = null;
    this.selectedLevel = null;
    this.level = null;
    this.cols = null;
  }
  ngOnInit() {
    this.cols = [
      { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: { 'width': '40%', 'overflow': 'visible' } },
      { field: 'college.name', header: Constants.FILIERE, sortable: 'true', filter: 'true', style: { 'width': '33%', 'overflow': 'visible' } },
      { field: 'levelGlobal.name', header:"Niveau Global", sortable: 'true', filter: 'true', style: { 'width': '15%', 'overflow': 'visible' } }
    ];
    
  }

  public getAll(): void {
    this.levels = [];
    this.levelService.getAll()
      .subscribe((data: Level[]) => this.levels = data,
        error => console.log(error),
        () => console.log('Get all Levels complete'));
  }


  showDialogToAdd() {
    this.newLevel = true;
    this.level = new Level();
    this.displayDialog = true;
  }

  save() {

    console.log(this.level);
  
      this.error = '';
      this.levelService.save(this.level)
        .subscribe(result => {
          if (result.id > 0) {
            this.level = result;
            console.log(this.level);
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
  
  }

  delete() {
    try {
      this.error = '';
      this.levelService.delete(this.level)
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

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cet enregistrement?',
      accept: () => {
        this.delete();
      }
    });
  }

  putInTable() {
    if (this.newLevel) {
      this.levels.push(this.level);
    }
    else {
      this.levels[this.findSelectedIndex()] = this.level;
    }

    var onTheFly: Level[] = [];
    onTheFly.push(...this.levels);
    this.levels = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.levels.splice(this.findSelectedIndex(), 1);
    var onTheFly: Level[] = [];
    onTheFly.push(...this.levels);
    this.levels = onTheFly;
    this.resetData();
  }

  resetData() {
    this.level = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newLevel = false;
    this.level = this.clone(evt.data);
    this.level.openDate = new Date(evt.data.openDate);
    console.log(this.level);
    this.displayDialog = true;
  }

  clone(e: Level): Level {
    let aLevel = new Level();
    for (let prop in e) {
      aLevel[prop] = e[prop];
    }
    return aLevel;
  }

  findSelectedIndex(): number {
    return this.levels.indexOf(this.selectedLevel);
  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("level", data);
  }

}
