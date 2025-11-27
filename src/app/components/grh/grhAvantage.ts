import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Avantage } from '../../models/grh/avantage';
import { User } from '../../models/User';
import { AvantageService } from '../../services/grh/avantage.service';
import { Constants } from '../../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AvantageTypeDropdown } from '../dropdowns/dropdown.avantageType';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-grh-avantage',
  templateUrl: '../../pages/grh/grhAvantage.html',
  providers: [AvantageService, AvantageTypeDropdown, Constants]
})

export class GrhAvantage implements OnInit, OnDestroy {

  public avantage: Avantage;
  public avantages: Avantage[];
  public selectedAvantage: Avantage;

  public error: String = '';
  displayDialog: boolean;
  newAvantage: boolean;
  cols: any[];
  public user: User;
  public avantageTypeDropdown: AvantageTypeDropdown;

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
    private avantageService: AvantageService,
    private atDropdown: AvantageTypeDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.avantageTypeDropdown = atDropdown;
  }
  ngOnDestroy() {
    this.avantages = null;
    this.error = null;
    this.selectedAvantage = null;
    this.avantage = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    //this.selectedSubjectLevel = new SubjectLevelView();
    if (this.user == null) {
      this.user = new User();
    }
      this.cols = [
        { field: 'avantageType.wording', header: 'Type', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'key', header: 'Code', sortable: 'true', filter: 'true', style:  {'width':'20%'}  },
        { field: 'wording', header: 'Libellé', sortable: 'false', filter: 'true',  style:  {'width':'40%'}  }
      ];
  }

  showDialogToAdd() {
    if (this.user != null && this.user.role == 10) {
      this.newAvantage = true;
      this.avantage = new Avantage();
      this.displayDialog = true;
    }
  }

  public getAll(): void {
    this.avantages = [];
    this.avantageService.getAll()
      .subscribe((data: Avantage[]) => this.avantages = data,
      error => console.log(error),
      () => console.log('Get all Avantages complete'));
  }

  save() {
    try {
      this.error = '';
      this.avantageService.save(this.avantage)
        .subscribe(result => {
          if (result.id > 0) {
            this.avantage = result;
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
      this.avantageService.delete(this.avantage)
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
    if (this.newAvantage)
      this.avantages.push(this.avantage);
    else
      this.avantages[this.findSelectedIndex()] = this.avantage;

    var onTheFly: Avantage[] = [];
    onTheFly.push(...this.avantages);
    this.avantages = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    this.avantages.splice(this.findSelectedIndex(), 1);
    var onTheFly: Avantage[] = [];
    onTheFly.push(...this.avantages);
    this.avantages = onTheFly;
    this.resetData();
  }

  resetData() {
    this.avantage = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    this.newAvantage = false;
    this.avantage = this.clone(evt.data);
    this.displayDialog = true;
  }

  clone(e: Avantage): Avantage {
    let aAvantage = new Avantage();
    for (let prop in e) {
      aAvantage[prop] = e[prop];
    }
    return aAvantage;
  }

  findSelectedIndex(): number {
    return this.avantages.indexOf(this.selectedAvantage);
  }

  /*
  public getCourseTopics(evt) {

    this.selectedSubjectLevel = evt.data;

    this.courseTopicService.getCourseTopics(
      this.selectedSubjectLevel.subjectId + '',
      this.selectedSubjectLevel.levelId + '')
            .subscribe((data: CourseTopic[]) => {
                evt.data.courseTopics = data
      },
      error => console.log(error),
      () => console.log('Get course topics complete'));
  }


  public getAll(): void {
    this.courseTopics = [];
    this.courseTopicService.getAll()
      .subscribe((data: CourseTopic[]) => {
        this.courseTopics = data
      },
      error => console.log(error),
      () => console.log('Get all CourseTopics complete'));
  }

  save() {
    try {
      this.error = '';
      this.courseTopic.level.id = this.selectedSubjectLevel.levelId;
      this.courseTopic.subject.id = this.selectedSubjectLevel.subjectId;
      this.courseTopicService.save(this.courseTopic)
        .subscribe(result => {
          if (result.id > 0) {
            this.courseTopic = result;
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
      this.courseTopicService.delete(this.courseTopic)
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
    let index = this.findSelectedIndex();
    this.selectedSubjectLevel = this.subjectLevels.find(x => x == this.selectedSubjectLevel);
    if (this.newCourseTopic)
      this.selectedSubjectLevel.courseTopics.push(this.courseTopic);
    else
      this.selectedSubjectLevel.courseTopics[this.findSelectedIndex()] = this.courseTopic;

    var onTheFly : CourseTopic [] = [];
    onTheFly.push(...this.selectedSubjectLevel.courseTopics);
    this.selectedSubjectLevel.courseTopics = onTheFly;

    this.resetData();
  }

  removeFromTable() {
    let index = this.findSelectedIndex();
    this.selectedSubjectLevel = this.subjectLevels.find(x => x == this.selectedSubjectLevel);
    this.selectedSubjectLevel.courseTopics.splice(this.findChildSelectedIndex(), 1);

    var onTheFly : CourseTopic [] = [];
    onTheFly.push(...this.selectedSubjectLevel.courseTopics);
    this.selectedSubjectLevel.courseTopics = onTheFly;

    this.resetData();
  }

  resetData() {
    this.courseTopic = null;
    this.displayDialog = false;
    this.changeDetectorRef.detectChanges();
  }

  onRowSelect(evt) {
    if (this.user != null && (this.user.role == 1 || this.user.role == 8)) {
      this.newCourseTopic = false;
      this.courseTopic = this.clone(evt.data);
      this.displayDialog = true;
    }
  }

   clone(e: CourseTopic): CourseTopic {
    let aCourseTopic = new CourseTopic();
    for (let prop in e) {
      aCourseTopic[prop] = e[prop];
    }
    return aCourseTopic;
  }


  cloneSubjectLevel(e: SubjectLevelView): SubjectLevelView {
    let aSubjectLevel = new SubjectLevelView();
    for (let prop in e) {
      aSubjectLevel[prop] = e[prop];
    }
    return aSubjectLevel;
  }

  findSelectedIndex(): number {
    return this.subjectLevels.indexOf(this.selectedSubjectLevel);
  }

   findChildSelectedIndex(): number {
    return this.selectedSubjectLevel.courseTopics.indexOf(this.selectedCourseTopic);
  }
  */

}
