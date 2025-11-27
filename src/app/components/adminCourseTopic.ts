import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Course } from '../models/course';
import { User } from '../models/User';
import { CourseService } from '../services/course.service';
import { Constants } from '../app.constants';
import { CourseTopic } from '../models/courseTopic';
import { Level } from '../models/level';
import { Subject } from '../models/subject';
import { SubjectLevelView } from '../models/subjectLevelView';
import { CourseTopicService } from '../services/courseTopic.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { LevelDropdown } from './dropdowns/dropdown.level';
import { SubjectDropdown } from './dropdowns/dropdown.subject';
import { DataTableModule, DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-admin-course-topic',
  templateUrl: '../pages/adminCourseTopic.html',
  providers: [CourseService, Constants, LevelDropdown, SubjectDropdown]
})

export class AdminCourseTopic implements OnInit, OnDestroy {

  public courseTopics: CourseTopic[];
  public subjectLevels: SubjectLevelView[];
  public error: String = '';
  public selectedCourseTopic: CourseTopic;
  public selectedSubjectLevel: SubjectLevelView;
  displayDialog: boolean;
  courseTopic: CourseTopic = new CourseTopic();
  newCourseTopic: boolean;
  cols: any[];
  public user: User;
  public subjectDropdown: SubjectDropdown;
  public levelDropdown: LevelDropdown;

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
    private courseTopicService: CourseTopicService,
    private sbjDropdon: SubjectDropdown,
    private lvlDropdown: LevelDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.subjectDropdown = sbjDropdon;
    this.levelDropdown = lvlDropdown;
  }
  ngOnDestroy() {
    this.courseTopics = null;
    this.error = null;
    this.selectedCourseTopic = null;
    this.courseTopic = null;
    this.cols = null;
  }
  ngOnInit() {
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.selectedSubjectLevel = new SubjectLevelView();
    if (this.user == null) {
      this.user = new User();
    }
    //if (this.user != null && this.user.role == 1) {
      this.cols = [
        { field: 'levelName', header: Constants.LEVELS, sortable: 'true', filter: 'true', style:  {'width':'40%'}  },
        { field: 'subjectName', header: Constants.SUBJECT, sortable: 'false', filter: 'true',  style:  {'width':'30%'}  }
      ];
    //}
  }

 public getSubjectLevels(): void {
    this.subjectLevels = [];
    this.courseTopicService.getSubjectLevels()
      .subscribe((data: SubjectLevelView[]) => {
        this.subjectLevels = data
      },
      error => console.log(error),
      () => console.log('Get all subjectLevels complete'));
  }

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

  showDialogToAdd() {
    if (this.user != null && (this.user.role == 1 || this.user.role == 8 || this.user.role == 11)) {
      this.newCourseTopic = true;
      this.courseTopic = new CourseTopic();
      this.courseTopic.level = new Level();
      this.courseTopic.subject = new Subject();
      this.courseTopic.status = true;
      this.displayDialog = true;
    }
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
    if (this.user != null && (this.user.role == 1 || this.user.role == 8 || this.user.role == 11)) {
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


}
