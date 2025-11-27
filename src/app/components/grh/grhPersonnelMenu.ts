import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { Teacher } from '../../models/teacher';
import { TeacherService } from '../../services/teacher.service';
import { AdminUserList } from '../adminUserList';
import { ManageTeacher } from '../teacher';
import { Constants } from '../../app.constants';
import { ManageCourse } from '../manageCourse';
import { ManageTimeSheet } from '../manageTimeSheet';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AdminPresence } from '../adminPresence';
import { AdminTestimony } from '../adminTestimony';

import { ManageTeacherContract } from './teacherContract';
import { GrhManageEmployee } from './grhManageEmployee';
import { GrhPayDetail } from './grhPayDetail';
import { GRHAvantageValue } from './grhAvantageValue';
import { GrhEmployeeDocuments } from './grhEmployeeDocuments';
import { GrhGeneratePaySlip } from './grhGeneratePaySlip';
import { GrhContractBank } from './grhContractBank';
import { GrhManageEmployeeTeacher } from './grhManageEmployeeTeacher';
import { GrhManagePersonnelKioskCard } from './grhManagePersonnelKioskCard';
import {GrhEmployeeAnotherDocumentType} from './grhEmployeeAnotherDocumentType';
import {GrhEmployeeAnotherDocuments} from './grhEmployeeAnotherDocuments';
import {AdminGetConge} from './adminGetConge';
import {AdminCongeHistory} from './adminCongeHistory';

@Component({
  selector: 'app-grh-personnel',
  templateUrl: '../../pages/grh/grhPersonnelMenu.html',
  providers: []
})
export class GrhPersonnelMenu implements OnInit {

  @ViewChild(AdminUserList) adminUserList: AdminUserList;
  @ViewChild(ManageTeacher) manageTeacher: ManageTeacher;
  @ViewChild(AdminPresence) adminPresence: AdminPresence;
  @ViewChild(ManageTimeSheet) manageTimeSheet: ManageTimeSheet;
  @ViewChild(AdminTestimony) adminTestimony: AdminTestimony;

  @ViewChild(ManageTeacherContract) manageTeacherContract: ManageTeacherContract;
  @ViewChild(GrhManageEmployee) grhManageEmployee: GrhManageEmployee;
  @ViewChild(GrhPayDetail) grhPayDetail: GrhPayDetail;
  @ViewChild(GRHAvantageValue) grhAvantageValue: GRHAvantageValue;
  @ViewChild(GrhEmployeeDocuments) grhEmployeeDocuments: GrhEmployeeDocuments;
  @ViewChild(GrhGeneratePaySlip) grhGeneratePaySlip: GrhGeneratePaySlip;
  @ViewChild(GrhContractBank) grhContractBank: GrhContractBank;
  @ViewChild(GrhManageEmployeeTeacher) grhManageEmployeeTeacher: GrhManageEmployeeTeacher;
  @ViewChild(GrhManagePersonnelKioskCard) grhManagePersonnelKioskCard: GrhManagePersonnelKioskCard;
  @ViewChild(GrhEmployeeAnotherDocumentType) grhEmployeeAnotherDocumentType: GrhEmployeeAnotherDocumentType;

  @ViewChild(ManageCourse) manageCourse: ManageCourse;
  @ViewChild(GrhEmployeeAnotherDocuments) grhEmployeeAnotherDocuments: GrhEmployeeAnotherDocuments;
  @ViewChild(AdminGetConge) adminGetConge: AdminGetConge;
  @ViewChild(AdminCongeHistory) adminCongeHistory: AdminCongeHistory;

  public user: User;
  public teacher: Teacher;
  public activeTab = 0;
  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  SEARCH: string = Constants.SEARCH;
  PROFILE: string = Constants.PROFILE;
  PERSONAL: string = Constants.PERSONAL;
  CONTACT: string = Constants.CONTACT;
  PROFESSIONAL: string = Constants.PROFESSIONAL;
  CONTRACT: string = Constants.CONTRACT;
  AVANTAGE_VALUE: string = Constants.AVANTAGE_VALUE;
  CONTRACT_DETAILS: string = Constants.CONTRACT_DETAILS;
  CONTRACT_DOCUMENTS: string = Constants.CONTRACT_DOCUMENTS;
  PAY_DETAILS: string = Constants.PAY_DETAILS;
  AVANTAGE_DETAILS: string = Constants.AVANTAGE_DETAILS;
  GENERATE_PAY_SLIP: string = Constants.GENERATE_PAY_SLIP;
  EMPLOYEE_CONTRACT_BANK: string = Constants.EMPLOYEE_CONTRACT_BANK;
  TEACHER_PROFESSIONAL: string = Constants.TEACHER_PROFESSIONAL;
  CARD: string = Constants.CARD;
  AUTRE_DOCUMENTS_EMPLOYEE: string = Constants.AUTRE_DOCUMENTS_EMPLOYEE;
  AUTRES_TYPE_DOCUMENTS: string = Constants.AUTRES_TYPE_DOCUMENTS;
  DOCUMENT: string = Constants.DOCUMENT;
  

  constructor(private teacherService: TeacherService,
    private changeDetectorRef: ChangeDetectorRef) {
    this.user = new User();
    this.teacher = new Teacher();
  }
  ngOnInit() {
    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    this.adminUserList.getAll(2);
    this.adminUserList.PAGE_ROLE = '2';
  }

  onUserSelected(user: User) {
    this.user = user;
    this.user.birthDate = new Date(this.user.birthDate);
    this.changeDetectorRef.detectChanges();
    this.activeTab = 1;

    //this.manageTeacher.setTeacher(this.user);
    console.log(this.user);
    //this.manageTeacherContract.setEmployee(this.user);
    this.grhManageEmployee.setEmployee(this.user);
    this.manageTeacherContract.setTeacher(this.user);
    //this.grhManageEmployeeTeacher.setTeacher(this.user);

  }

  onTabChange(evt) {
      this.activeTab = evt.index;
      console.log("this.activeTab= " + this.activeTab +' -- role ='+this.user.role);

      if (evt.index === 0) {//search
        //load users
        this.adminUserList.getAll(2);
        this.adminUserList.PAGE_ROLE = '2';
      } else if (evt.index === 1) {//profile

      } else if (evt.index === 2) {//Contrat
        this.manageTeacherContract.setEmployee(this.user);
        this.grhContractBank.setEmployee(this.user);
        this.grhContractBank.setTeacher(this.user);
        this.grhEmployeeDocuments.setEmployee(this.user);
      } else if (evt.index === 3) { //PayDetail
        this.grhPayDetail.setEmployee(this.user);
        //this.grhPayDetail.getAll();
        this.grhAvantageValue.setEmployee(this.user);
      } else if (evt.index === 4) {
        this.grhGeneratePaySlip.setEmployee(this.user);
      }else if (evt.index === 5) {
        console.log(this.user);
        this.grhEmployeeAnotherDocumentType.setEmployee(this.user);
        this.grhEmployeeAnotherDocuments.setEmployee(this.user);
      }else if (evt.index === 6) {
        console.log(this.user);
        this.adminGetConge.setEmployee(this.user);
        this.adminCongeHistory.setEmployee(this.user);
      }
      // else if (evt.index === 7) {
      //   console.log(this.user);
      //   this.adminCongeHistory.setEmployee(this.user);
      // }

  }

  onSubProfileTabChange(evt) {
    if (evt.index === 0) {

    } else if (evt.index === 1) {

    } else if (evt.index === 2) {

    }else if (evt.index === 3) {
      this.grhManagePersonnelKioskCard.setEmployee(this.user);
    }
  }
}
