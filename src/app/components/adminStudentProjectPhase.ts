import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {StudentProjectService} from '../services/studentProject.service';
import {LevelService} from '../services/level.service';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {StudentProjectPhase} from "../models/studentProjectPhase";

@Component({
  selector: 'app-admin-student-project-phase',
  templateUrl: '../pages/adminStudentProjectPhase.html',
  providers: [StudentProjectService]
})
export class AdminStudentProjectPhase implements OnInit, OnDestroy {

  public studentsProjectsPhases: StudentProjectPhase[];
  public error: String = '';
  public selectedStudentProjectPhase: StudentProjectPhase;
  displayDialog: boolean;
  studentProjectPhase: StudentProjectPhase = new StudentProjectPhase();
  newStudentProjectPhase: boolean;
  cols: any[];
  @ViewChild(FileUploader) fileUploader: FileUploader;

  DETAIL: string = Constants.DETAIL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  FILIERE: string = Constants.FILIERE;
  constructor
    (
    private studentProjectService: StudentProjectService,
    private levelService: LevelService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
  }

  ngOnDestroy() {
    this.studentsProjectsPhases = null;
    this.error = null;
    this.selectedStudentProjectPhase = null;
    this.studentProjectPhase = null;
    this.cols = null;
  }
  ngOnInit() {
    this.cols = [
      {field: 'name', header: Constants.NAME, sortable: 'true', filter: 'true', style: {'width': '70%', 'overflow': 'visible'}},
      {field: 'percentage', header: 'Pourcentage', sortable: 'true', filter: 'true', style: {'width': '20%', 'overflow': 'visible'}},
      {field: 'ordreExecution', header: 'Ordre d\'exécution', sortable: 'true', filter: 'true', style: {'width': '10%', 'overflow': 'visible'}},
    ];

  }

  public getAll(): void {
    this.studentsProjectsPhases = [];
    this.studentProjectService.getAllPhase()
      .subscribe((data: StudentProjectPhase[]) => this.studentsProjectsPhases = data,
      error => console.log(error),
      () => console.log('Get all students projects phases complete'));
  }


  showDialogToAdd() {
    this.newStudentProjectPhase = true;
    this.studentProjectPhase = new StudentProjectPhase();
    this.displayDialog = true;
  }

  save() {
    try {
      this.error = '';
      this.studentProjectService.savePhase(this.studentProjectPhase)
        .subscribe(result => {
          if (result.id > 0) {
            this.studentProjectPhase = result;
            this.putInTable();
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
       console.log(this.studentProjectPhase);
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
    try {
      this.error = '';
      this.studentProjectService.deletePhase(this.studentProjectPhase)
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
    if (this.newStudentProjectPhase)
      this.studentsProjectsPhases.push(this.studentProjectPhase);
    else
      this.studentsProjectsPhases[this.findSelectedIndex()] = this.studentProjectPhase;

    var onTheFly: StudentProjectPhase[] = [];
    onTheFly.push(...this.studentsProjectsPhases);
    this.studentsProjectsPhases = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.studentsProjectsPhases.splice(this.findSelectedIndex(), 1);
    var onTheFly: StudentProjectPhase[] = [];
    onTheFly.push(...this.studentsProjectsPhases);
    this.studentsProjectsPhases = onTheFly;
    this.resetData();
  }

  resetData() {
    this.studentProjectPhase = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newStudentProjectPhase = false;
    this.studentProjectPhase = this.clone(evt.data);
    console.log(this.studentProjectPhase);
    this.displayDialog = true;
  }

  clone(e: StudentProjectPhase): StudentProjectPhase {
    let aStudentProjectPhase = new StudentProjectPhase();
    for (let prop in e) {
        aStudentProjectPhase[prop] = e[prop];
    }
    return aStudentProjectPhase;
  }

  findSelectedIndex(): number {
    return this.studentsProjectsPhases.indexOf(this.selectedStudentProjectPhase);
  }
  
}
