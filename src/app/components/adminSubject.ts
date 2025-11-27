import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subject } from '../models/subject';
import { Prerequisit } from '../models/prerequisit';
import { SubjectService } from '../services/subject.service';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-admin-subject',
  templateUrl: '../pages/adminSubject.html',
  providers: [SubjectService, SubjectDropdown,ConfirmationService]
})


export class AdminSubject implements OnInit, OnDestroy {

  public subjects: Subject[];
  public prerequisits: Subject[];
  public error: String = '';
  public selectedSubject: Subject;
  public subjectDropdown: SubjectDropdown;
  displayDialog: boolean;
  subject: Subject = new Subject();
  newSubject: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;
  msg: string;
  lmd = JSON.parse(Cookie.get('lmd'));
  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  SAVE_LAEL: string = Constants.SAVE_LABEL;
  SUBJECT: string = Constants.SUBJECT;

  constructor
    (
      private subjectService: SubjectService,
      sbjDropdon: SubjectDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private confirmationService: ConfirmationService
    ) {
    this.subjectDropdown = sbjDropdon;
  }

  ngOnDestroy() {
    this.subjects = null;
    this.error = null;
    this.selectedSubject = null;
    this.subject = null;
    this.cols = null;
  }

  ngOnInit() {
    if (this.lmd === 1) {
      this.cols = [
        { field: 'code', header: Constants.CODE, sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: { 'width': '50%', 'overflow': 'visible' } },
        { field: 'credit', header: Constants.CREDIT, sortable: 'true', filter: 'true', style: { 'width': '8%', 'overflow': 'visible' } }
      ];
    } else {
      this.cols = [
        { field: 'code', header: Constants.CODE, sortable: 'true', filter: 'true', style: { 'width': '20%', 'overflow': 'visible' } },
        { field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: { 'width': '50%', 'overflow': 'visible' } }
      ];
    }
  }

  public getAll(): void {
    this.subjects = [];
    this.subjectService.getAll()
      .subscribe((data: Subject[]) => this.subjects = data,
        error => console.log(error),
        () => console.log('Get all Subjects complete'));
  }


  showDialogToAdd() {
    this.newSubject = true;
    this.subject = new Subject();
    this.displayDialog = true;
  }

  savePrerequisit(prerequisit: Prerequisit) {
    prerequisit.subject = this.subject;
    this.subjectService.savePrerequisit(prerequisit)
      .subscribe((data: Prerequisit) => {
        if (data != null) {
          //this.subject.prerequisits.push(data);
          this.msg = Constants.saveSuccess;
        } else {
          this.error = Constants.saveFailed;
        }
      },
        error => console.log(error),
        () => console.log('Add prerequisit complete'));

  }

  deletePrerequisit(prerequisit: Prerequisit) {
    try {
      this.error = '';
      this.subjectService.deletePrerequisit(prerequisit)
        .subscribe(result => {
          if (result) {

            this.subject.prerequisits.splice(this.subject.prerequisits.indexOf(prerequisit), 1);

            const onTheFly: Prerequisit[] = [];
            onTheFly.push(...this.subject.prerequisits);
            this.subject.prerequisits = onTheFly;
            this.msg = Constants.deleteSuccess;
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

  addNewPrerequisit() {
    if (this.subject.prerequisits == null) {
      this.subject.prerequisits = [];
    }

    this.subject.prerequisits.push(new Prerequisit());

    const onTheFly: Prerequisit[] = [];
    onTheFly.push(...this.subject.prerequisits);
    this.subject.prerequisits = onTheFly;

  }

  public getPrerequisits(evt) {
    this.subject = evt.data;
    this.subject.prerequisits = [];
    this.error = '';
    this.msg = '';
    this.subjectService.getPrerequisits(this.subject.id)
      .subscribe(result => {
        this.subject.prerequisits = result;
        if (result.length === 0) {
          this.subject.prerequisits.push(new Prerequisit());
        }
      }),
      error => console.log(error),
      () => console.log('get prerequisits complete');
  }

  save() {
    try {
      this.error = '';
      this.subjectService.save(this.subject)
        .subscribe(result => {
          if (result.id > 0) {
            this.subject = result;
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
      this.subjectService.delete(this.subject)
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
    if (this.newSubject) {
      this.subjects.push(this.subject);
    }
    else {
      this.subjects[this.findSelectedIndex()] = this.subject;
    }

    let onTheFly: Subject[] = [];
    onTheFly.push(...this.subjects);
    this.subjects = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.subjects.splice(this.findSelectedIndex(), 1);
    let onTheFly: Subject[] = [];
    onTheFly.push(...this.subjects);
    this.subjects = onTheFly;
    this.resetData();
  }

  resetData() {
    this.subject = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newSubject = false;
    this.subject = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Subject): Subject {
    const aSubject = new Subject();
    for (const prop in e) {
      aSubject[prop] = e[prop];
    }
    return aSubject;

  }

  findSelectedIndex(): number {
    return this.subjects.indexOf(this.selectedSubject);
  }

  showDialogToUploadSyllabus(data) {
    //this.fileUploader.showDialogToUploadImage("subject", data);
    this.fileUploader.showDialogToUploadImage("syllabus", data);
  }
}
