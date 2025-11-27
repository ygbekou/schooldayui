import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LevelSubject } from '../models/levelSubject';
import { LevelSubjectPro } from '../models/levelSubjectPro';
import { User } from '../models/User';
import { Term } from '../models/term';
import { Expense } from '../models/expense';
import { LevelSubjectService } from '../services/levelSubject.service';
import { LevelSubjectProService } from '../services/levelSubjectPro.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LevelDropdown } from './dropdowns/dropdown.level';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { ConfirmationService, DataTableModule, DialogModule } from 'primeng/primeng';
import { TermDropdown } from './dropdowns/dropdown.term';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';

@Component({
  selector: 'app-admin-levelsubjectpro',
  templateUrl: '../pages/adminLevelSubjectPro.html',
  providers: [LevelSubjectService, Constants, TermDropdown, SubjectDropdown, LevelDropdown
  ,SchoolYearDropdown,ConfirmationService]
})

export class AdminLevelSubjectPro implements OnInit, OnDestroy {

  public levelSubjects: LevelSubject[];
  public levelSubjectsPro: LevelSubjectPro[];
  public error: String = '';
  public selectedLevelSubject: LevelSubject;
  public selectedLevelSubjectPro: LevelSubjectPro;
  selectedLevelSubject1: LevelSubject;
  selectedLevelSubjectPro1: LevelSubjectPro;
  term: Term;
  displayDialog: boolean;
  levelSubject: LevelSubject = new LevelSubject();
  levelSubjectPro: LevelSubjectPro = new LevelSubjectPro();
  newLevelSubject: boolean;
  newLevelSubjectPro: boolean;
  cols: any[];
  public user: User;
  public subjectDropdown: SubjectDropdown;
  public termDropdown: TermDropdown;
  public levelDropdown: LevelDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  public searchText: string;
  msg: string;

  DETAIL: string = Constants.DETAIL;
  CLASS: string = Constants.CLASSE;
  SUBJECT: string = Constants.SUBJECT;
  LEVEL: string = Constants.LEVELS;
  TEACHER: string = Constants.TEACHER;
  PRINT: string = Constants.PRINT;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  LIBELLE: string = Constants.LIBELLE;
  COURSE_SEARCH_TEXT: string = Constants.COURSE_SEARCH_TEXT;
  TERM: string = Constants.TERM;


  constructor
    (
      private levelSubjectService: LevelSubjectService,
      private levelSubjectProService: LevelSubjectProService,
      private sbjDropdon: SubjectDropdown,
      private tmDropdown: TermDropdown,
      private lvlDropdown: LevelDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private schYearDropdown: SchoolYearDropdown,
      private confirmationService: ConfirmationService
    ) {
    this.subjectDropdown = sbjDropdon;
    this.termDropdown = tmDropdown;
    this.levelDropdown = lvlDropdown;
    this.schoolYearDropdown = schYearDropdown;

    //this.getAll();
  }

  ngOnDestroy() {
    this.levelSubjectsPro = null;
    this.error = null;
    this.selectedLevelSubjectPro = null;
    this.levelSubjectPro = null;
    this.cols = null;
  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'level.name', header: Constants.LEVELS, sortable: 'false', filter: 'true', style: { 'width': '22%', 'overflow': 'visible' } },
      { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: { 'width': '22%', 'overflow': 'visible' } }
    ];
  }


  public getAll(): void {
    this.levelSubjectsPro = [];
    this.levelSubjectProService.getAll()
      .subscribe((data: LevelSubjectPro[]) => {
        this.levelSubjectsPro = data
      },
        error => console.log(error),
        () => console.log('Get all LevelSubject complete'));
  }


  showDialogToAdd() {
    this.newLevelSubjectPro = true;
    this.levelSubjectPro = new LevelSubject();
    this.displayDialog = true;
  }

  public search() {
    this.levelSubjects = [];
    this.levelSubjectProService.search((this.selectedLevelSubject1 == null ? 0 : this.selectedLevelSubject1.id)  + '|' + this.searchText)
      .subscribe((data: LevelSubjectPro[]) => {
        this.levelSubjectsPro = data
      },
        error => console.log(error),
        () => console.log('Get levelSubject for ' + this.searchText + ' complete'));
  }

  save() {
    try {
      this.error = '';
      console.log(this.levelSubjectPro);
 
      if (this.levelSubjectPro.level == null || this.levelSubjectPro.subject == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.levelSubjectProService.save(this.levelSubjectPro)
          .subscribe(result => {
            if (result.id > 0) {
              this.levelSubjectPro = result;
              console.log('Après enrégistrement')
              console.log(this.levelSubjectPro)
              this.putInTable();
            }
            else {
              this.error = Constants.saveFailed;
              this.displayDialog = true;
            }
          })
      }
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.levelSubjectProService.delete(this.levelSubjectPro)
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

  putInTable() {
    if (this.newLevelSubjectPro) {
      console.log('pop up')
      this.levelSubjectsPro.push(this.levelSubjectPro);
    }
    else {
      console.log('pop down')
      this.levelSubjectsPro[this.findSelectedIndex()] = this.levelSubjectPro;
    }

    const onTheFly: LevelSubjectPro[] = [];
    onTheFly.push(...this.levelSubjectsPro);
    this.levelSubjectsPro = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.levelSubjectsPro.splice(this.findSelectedIndex(), 1);
    const onTheFly: LevelSubjectPro[] = [];
    onTheFly.push(...this.levelSubjectsPro);
    this.levelSubjectsPro = onTheFly;
    this.resetData();
  }

  resetData() {
    this.levelSubjectPro = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && (this.user.role === 1 || this.user.role === 8 || this.user.role === 11)) {
      this.newLevelSubjectPro = false;
      this.levelSubjectPro = this.clone(evt.data);
      this.displayDialog = true;
    }
  }

  clone(e: LevelSubjectPro): LevelSubjectPro {
    const aLevelSubject = new LevelSubjectPro();
    for (const prop in e) {
      aLevelSubject[prop] = e[prop];
    }
    return aLevelSubject;
  }

  findSelectedIndex(): number {
    console.log('Selection index')
    console.log(this.selectedLevelSubjectPro)
    return this.levelSubjectsPro.indexOf(this.selectedLevelSubjectPro);
  }

}
