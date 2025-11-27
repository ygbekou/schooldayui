import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TeacherLevelNew } from '../../models/grh/teacherLevelNew';
import { User } from '../../models/User';
import { TeacherLevelNewService } from '../../services/grh/teacherLevelNew.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-teacher-level',
  templateUrl: '../../pages/grh/grhTeacherLevel.html',
  providers: [TeacherLevelNewService, /*LevelDropdown,*/ Constants]
})

export class GrhTeacherLevel implements OnInit, OnDestroy {

  public teacherLevelNew: TeacherLevelNew;
  public teacherLevelNews: TeacherLevelNew[];
  public selectedTeacherLevelNew: TeacherLevelNew;

  public error: String = '';
  displayDialog: boolean;
  newTeacherLevelNew: boolean;
  cols: any[];
  public user: User;
  //public subjectDropdown: SubjectDropdown;

  DETAIL: string = Constants.DETAIL;
  LEVELS:  string = Constants.LEVELS;
  SUBJECT:  string = Constants.SUBJECT;
  NAME:  string = Constants.NAME;
  DESCRIPTION:  string = Constants.DESCRIPTION;
  DELETE_LABEL: string = Constants.DELETE_LABEL;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  ADD_LABEL: string = Constants.ADD_LABEL;

  constructor
    (
    private teacherLevelNewService: TeacherLevelNewService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.teacherLevelNews = null;
    this.error = null;
    this.selectedTeacherLevelNew = null;
    this.teacherLevelNew = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'30%'}  },
        { field: 'wording', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newTeacherLevelNew = true;
      this.teacherLevelNew = new TeacherLevelNew();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.teacherLevelNews = [];
    this.teacherLevelNewService.getAll()
      .subscribe((data: TeacherLevelNew[]) => this.teacherLevelNews = data,
      error => console.log(error),
      () => console.log('Get all AvantageTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.teacherLevelNewService.save(this.teacherLevelNew)
        .subscribe(result => {
          if (result.id > 0) {
            this.teacherLevelNew = result;
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
      this.teacherLevelNewService.delete(this.teacherLevelNew)
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
    if (this.newTeacherLevelNew)
      this.teacherLevelNews.push(this.teacherLevelNew);
    else
      this.teacherLevelNews[this.findSelectedIndex()] = this.teacherLevelNew;

    var onTheFly: TeacherLevelNew[] = [];
    onTheFly.push(...this.teacherLevelNews);
    this.teacherLevelNews = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.teacherLevelNews.splice(this.findSelectedIndex(), 1);
    var onTheFly: TeacherLevelNew[] = [];
    onTheFly.push(...this.teacherLevelNews);
    this.teacherLevelNews = onTheFly;
    this.resetData();
  }

  resetData() {
    this.teacherLevelNew = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newTeacherLevelNew = false;
    this.teacherLevelNew = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: TeacherLevelNew): TeacherLevelNew {
    let aAvantageType = new TeacherLevelNew();
    for (let prop in e) {
      aAvantageType[prop] = e[prop];
    }
    return aAvantageType;
  }

  findSelectedIndex(): number {
    return this.teacherLevelNews.indexOf(this.selectedTeacherLevelNew);
  }

}
