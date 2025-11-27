import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { LevelSubject } from '../models/levelSubject';
import { User } from '../models/User';
import { Term } from '../models/term';
import { Expense } from '../models/expense';
import { LevelSubjectService } from '../services/levelSubject.service';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LevelDropdown } from './dropdowns/dropdown.level';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { ConfirmationService, DataTableModule, DialogModule } from 'primeng/primeng';
import { TermDropdown } from './dropdowns/dropdown.term';
import { SchoolYearDropdown } from './dropdowns/dropdown.schoolYear';

@Component({
  selector: 'app-admin-levelsubject',
  templateUrl: '../pages/adminLevelSubject.html',
  providers: [LevelSubjectService, Constants, TermDropdown, SubjectDropdown, LevelDropdown
  ,SchoolYearDropdown,ConfirmationService]
})

export class AdminLevelSubject implements OnInit, OnDestroy {

  public levelSubjects: LevelSubject[] = [];
  public error: String = '';
  public selectedLevelSubject: LevelSubject;
  selectedLevelSubject1: LevelSubject;
  term: Term;
  displayDialog: boolean;
  levelSubject: LevelSubject = new LevelSubject();
  newLevelSubject: boolean;
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
    this.levelSubjects = null;
    this.error = null;
    this.selectedLevelSubject = null;
    this.levelSubject = null;
    this.cols = null;
  }

  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
    this.cols = [
      { field: 'level.name', header: Constants.LEVELS, sortable: 'false', filter: 'true', style: { 'width': '22%', 'overflow': 'visible' } },
      { field: 'term.name', header: Constants.TERM, sortable: 'false', filter: 'true', style: { 'width': '10%', 'overflow': 'visible' } },
      { field: 'subject.name', header: Constants.SUBJECT, sortable: 'false', filter: 'true', style: { 'width': '22%', 'overflow': 'visible' } },
      { field: 'subject.credit', header: Constants.CREDIT, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
      { field: 'courseNumberHours', header: Constants.NUMBER_COURSE_HOURS, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
      { field: 'tpNumberHours', header: Constants.TP_HOURS_NUMBER, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } },
      { field: 'personnalNumberHours', header: Constants.PERSONNAL_HOURS_NUMBER, sortable: 'true', filter: 'true', style: { 'overflow': 'visible' } }
      

    ];
  }


  public getAll(): void {
    this.levelSubjects = [];
    this.levelSubjectService.getAll()
      .subscribe((data: LevelSubject[]) => {
        this.levelSubjects = data
      },
        error => console.log(error),
        () => console.log('Get all LevelSubject complete'));
  }


  showDialogToAdd() {
    this.newLevelSubject = true;
    this.levelSubject = new LevelSubject();
    this.displayDialog = true;
  }

  public search() {
    this.levelSubjects = [];
    this.levelSubjectService.search((this.selectedLevelSubject1 == null ? 0 : this.selectedLevelSubject1.id) + '|' + 
    (this.term == null ? 0 : this.term.id) + '|' + this.searchText)
      .subscribe((data: LevelSubject[]) => {
        this.levelSubjects = data
      },
        error => console.log(error),
        () => console.log('Get levelSubject for ' + this.searchText + ' complete'));
  }

  save() {
    try {
      this.error = '';
      console.log(this.levelSubject);
 
      if (this.levelSubject.level == null || this.levelSubject.subject == null) {
        this.error = Constants.REQUIRED_FIELD_MISSING;
      } else {
        this.levelSubjectService.save(this.levelSubject)
          .subscribe(result => {
            if (result.id > 0) {
              this.levelSubject = result;
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
      this.levelSubjectService.delete(this.levelSubject)
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
    if (this.newLevelSubject) {
      this.levelSubjects.push(this.levelSubject);
    }
    else {
      this.levelSubjects[this.findSelectedIndex()] = this.levelSubject;
    }

    const onTheFly: LevelSubject[] = [];
    onTheFly.push(...this.levelSubjects);
    this.levelSubjects = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.levelSubjects.splice(this.findSelectedIndex(), 1);
    const onTheFly: LevelSubject[] = [];
    onTheFly.push(...this.levelSubjects);
    this.levelSubjects = onTheFly;
    this.resetData();
  }

  resetData() {
    this.levelSubject = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && (this.user.role === 1 || this.user.role === 8 || this.user.role === 11)) {
      this.newLevelSubject = false;
      this.levelSubject = this.clone(evt.data);
      this.displayDialog = true;
    }
  }

  clone(e: LevelSubject): LevelSubject {
    const aLevelSubject = new LevelSubject();
    for (const prop in e) {
      aLevelSubject[prop] = e[prop];
    }
    return aLevelSubject;
  }

  findSelectedIndex(): number {
    return this.levelSubjects.indexOf(this.selectedLevelSubject);
  }

}
