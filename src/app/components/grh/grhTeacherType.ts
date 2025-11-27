import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TeacherTypeNew } from '../../models/grh/teacherTypeNew';
import { User } from '../../models/User';
import { TeacherTypeNewService } from '../../services/grh/teacherTypeNew.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
//import { LevelDropdown } from './dropdowns/dropdown.level';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-teacher-type',
  templateUrl: '../../pages/grh/grhTeacherType.html',
  providers: [TeacherTypeNewService, /*LevelDropdown,*/ Constants]
})

export class GrhTeacherType implements OnInit, OnDestroy {

  public teacherTypeNew: TeacherTypeNew;
  public teacherTypeNews: TeacherTypeNew[];
  public selectedTeacherTypeNew: TeacherTypeNew;

  public error: String = '';
  displayDialog: boolean;
  newTeacherTypeNew: boolean;
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
    private teacherTypeNewService: TeacherTypeNewService,
    //private sbjDropdon: SubjectDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    //this.subjectDropdown = sbjDropdon;
  }
  ngOnDestroy() {
    this.teacherTypeNews = null;
    this.error = null;
    this.selectedTeacherTypeNew = null;
    this.teacherTypeNew = null;
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
      this.newTeacherTypeNew = true;
      this.teacherTypeNew = new TeacherTypeNew();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.teacherTypeNews = [];
    this.teacherTypeNewService.getAll()
      .subscribe((data: TeacherTypeNew[]) => this.teacherTypeNews = data,
      error => console.log(error),
      () => console.log('Get all AvantageTypes complete'));
  }

  save() {
    try {
      this.error = '';
      this.teacherTypeNewService.save(this.teacherTypeNew)
        .subscribe(result => {
          if (result.id > 0) {
            this.teacherTypeNew = result;
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
      this.teacherTypeNewService.delete(this.teacherTypeNew)
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
    if (this.newTeacherTypeNew)
      this.teacherTypeNews.push(this.teacherTypeNew);
    else
      this.teacherTypeNews[this.findSelectedIndex()] = this.teacherTypeNew;

    var onTheFly: TeacherTypeNew[] = [];
    onTheFly.push(...this.teacherTypeNews);
    this.teacherTypeNews = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.teacherTypeNews.splice(this.findSelectedIndex(), 1);
    var onTheFly: TeacherTypeNew[] = [];
    onTheFly.push(...this.teacherTypeNews);
    this.teacherTypeNews = onTheFly;
    this.resetData();
  }

  resetData() {
    this.teacherTypeNew = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newTeacherTypeNew = false;
    this.teacherTypeNew = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: TeacherTypeNew): TeacherTypeNew {
    let aAvantageType = new TeacherTypeNew();
    for (let prop in e) {
      aAvantageType[prop] = e[prop];
    }
    return aAvantageType;
  }

  findSelectedIndex(): number {
    return this.teacherTypeNews.indexOf(this.selectedTeacherTypeNew);
  }

}
