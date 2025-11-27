import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Class} from '../models/class';
import {ClassService} from '../services/class.service';
import {TimeTableService} from '../services/timeTable.service';
import {Constants} from '../app.constants';
import {ScheduleEvent} from '../models/scheduleEvent';
import {LevelDropdown} from './dropdowns/dropdown.level';
import {TeacherDropdown} from './dropdowns/dropdown.teacher';
import {ConfirmationService, DataTableModule, DialogModule} from 'primeng/primeng';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-admin-class',
  templateUrl: '../pages/adminClass.html',
  providers: [ClassService, Constants, TimeTableService, LevelDropdown, TeacherDropdown,ConfirmationService]
})

export class AdminClass implements OnInit, OnDestroy {

  public classes: Class[];
  public error: String = '';
  public selectedClass: Class;
  displayDialog: boolean;
  classe: Class = new Class();
  newClass: boolean;
  cols: any[];
  events: any[] = [];
  headerConfig: any;

  public levelDropdown: LevelDropdown;
  public teacherDropdown: TeacherDropdown;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  LEVEL: string = Constants.NIVEAU;
  PROF: string = Constants.PROF;
  CALENDAR_LOCALE: string = Constants.CALENDAR_LOCALE;

  constructor
    (
    private classService: ClassService,
    private timeTableService: TimeTableService,
    private lvlDropdown: LevelDropdown,
    private tchDropdown: TeacherDropdown,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService
    ) {
    this.levelDropdown = lvlDropdown;
    this.teacherDropdown = tchDropdown;
  }
  ngOnDestroy() {
    this.classes = null;
    this.error = null;
    this.selectedClass = null;
    this.classe = null;
    this.cols = null;
  }
  ngOnInit() {
    // setting the header configuration
    this.headerConfig = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };

    this.cols = [
      {field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: {'width': '25%'}},
      {field: 'level.name', header: Constants.NIVEAU, sortable: 'false', filter: 'true', style: {'width': '25%'}},
      {field: 'responsibleTeacher.name', header: Constants.PROF_TITULAIRE, sortable: 'false', filter: 'true', type: 'string[]', style: {'width': '25%'}},

      {field: 'nbrStudents', header: Constants.NBR_ETUDIANT, sortable: 'true', filter: 'true'},
      {field: 'capacity', header: Constants.CAPACITE, sortable: 'true', filter: 'true'}
    ];
  }

  public getAll(): void {
    this.classes = [];
    this.classService.getAll()
      .subscribe((data: Class[]) => {
        this.classes = data;
        //console.info("Classes: " + this.classes);
      },
      error => console.log(error),
      () => console.log('Get all Classes complete'));
  }


  showDialogToAdd() {
    this.newClass = true;
    this.classe = new Class();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.classService.save(this.classe)
        .subscribe(result => {
          if (result.id > 0) {
            this.classe = result;
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
      this.classService.delete(this.classe)
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
    if (!this.classes) {
      this.classes = [];
    }
    var onTheFly: Class[] = [];
    onTheFly.push(...this.classes);
    if (this.newClass)
      onTheFly.push(this.classe);
    else
      this.classes[this.findSelectedIndex()] = this.classe;
    
    this.classes = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.classes.splice(this.findSelectedIndex(), 1);
    var onTheFly: Class[] = [];
    onTheFly.push(...this.classes);
    this.classes = onTheFly;
    this.resetData();
  }

  resetData() {
    this.classe = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newClass = false;
    this.classe = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Class): Class {
    let aClass = new Class();
    for (let prop in e) {
      aClass[prop] = e[prop];
    }
    return aClass;
  }

  findSelectedIndex(): number {
    return this.classes.indexOf(this.selectedClass);
  }


  showDialogToViewClassTimeTable(evt) {
    this.selectedClass = evt.data;

    this.timeTableService.getFullClassScheduleEvents(
      this.selectedClass.id + '')
      .subscribe((data: ScheduleEvent[]) => {
        this.events = data
      },
      error => console.log(error),
      () => console.log('Get schedule events complete'));

    this.changeDetectorRef.detectChanges();

  }
}
