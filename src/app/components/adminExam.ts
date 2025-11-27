import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Teacher } from '../models/teacher';
import { ExamService } from '../services/exam.service';
import { Exam } from '../models/exam';
import { AdminExamList } from './adminExamList';
import { AdminExamCloseSemestreGroup } from './adminExamCloseSemestreGroup';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-admin-exam',
  templateUrl: '../pages/adminExam.html',
  providers: []
})
export class AdminExam implements OnInit {

  public exam: Exam;
  public activeTab = 0;
  @ViewChild(AdminExamList) adminUserList: AdminExamList;
  @ViewChild(AdminExamCloseSemestreGroup) adminExamCloseSemestreGroup: AdminExamCloseSemestreGroup;
  currentUser: User;

  ENTER_NOTES:  string = Constants.ENTER_NOTES;
  CALCULATIONS:  string = Constants.CALCULATIONS;
  MONTHLY_QUATERLY:  string = Constants.MONTHLY_QUATERLY;
  SEMESTER:  string = Constants.SEMESTER;
  ANNUAL:  string = Constants.ANNUAL;
  CLOSE_SEMESTRE_GROUP:  string = "Délibérer un groupe de semestre";

  constructor(privateexamService: ExamService,
    private changeDetectorRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.currentUser= JSON.parse(atob(Cookie.get('user')));
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
  }

  onExamSelected(exam: Exam) {
    this.exam = exam;
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1;
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index === 0) {

    } else if (evt.index === 1) {
      this.adminExamCloseSemestreGroup.getAll();
    } else if (evt.index === 2) {

    }
  }


}
