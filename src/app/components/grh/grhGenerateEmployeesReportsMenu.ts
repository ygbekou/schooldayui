import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { GrhGenerateReportHonorairesAllTeachers } from './grhGenerateReportHonorairesAllTeachers';
import { GrhGenerateReportHonoraireTeacherTypes } from './grhGenerateReportHonoraireTeacherTypes';
import { GrhGenerateReportHonorairesRecapitulatifAllTeachers } from './grhGenerateReportHonorairesRecapitulatifAllTeachers';
import { GrhGenerateReportHonoraireRecapitulatifTeacherTypes } from './grhGenerateReportHonoraireRecapitulatifTeacherTypes';
import { GrhGenerateReportHonorairesOneTeacher } from './grhGenerateReportHonorairesOneTeacher';
import { GrhGenerateReportEmployeePaySlip } from './grhGenerateReportEmployeePaySlip';
import { GrhGenerateReportAllEmployeesPaySlips } from './grhGenerateReportAllEmployeesPaySlips';
import { GrhGenerateReportGlobalVirSalaireParBanque } from './grhGenerateReportGlobalVirSalaireParBanque';
import { GrhGenerateReportRecapitulatifVirSalaireParBanque } from './grhGenerateReportRecapitulatifVirSalaireParBanque';
import { GrhGenerateReportRecapitulatifVirSalaireEmployes } from './grhGenerateReportRecapitulatifVirSalaireEmployes';
import {AdminGenerateAllEmployeeCongeStatus} from './adminGenerateAllEmployeeCongeStatus';
import {Constants} from '../../app.constants';

@Component({
  selector: 'app-grh-generate-employees-reports-menu',
  templateUrl: '../../pages/grh/grhGenerateEmployeesReportsMenu.html',
  providers: []
})
export class GrhGenerateEmployeesReportsMenu implements OnInit {
    @ViewChild(GrhGenerateReportGlobalVirSalaireParBanque) grhGenerateReportGlobalVirSalaireParBanque: GrhGenerateReportGlobalVirSalaireParBanque;
    @ViewChild(GrhGenerateReportRecapitulatifVirSalaireParBanque) grhGenerateReportRecapitulatifVirSalaireParBanque: GrhGenerateReportRecapitulatifVirSalaireParBanque;
    @ViewChild(GrhGenerateReportRecapitulatifVirSalaireEmployes) grhGenerateReportRecapitulatifVirSalaireEmployes: GrhGenerateReportRecapitulatifVirSalaireEmployes;

    @ViewChild(GrhGenerateReportHonorairesAllTeachers) grhGenerateReportHonorairesAllTeachers: GrhGenerateReportHonorairesAllTeachers;
    @ViewChild(GrhGenerateReportHonoraireTeacherTypes) grhGenerateReportHonoraireTeacherTypes: GrhGenerateReportHonoraireTeacherTypes;
    @ViewChild(GrhGenerateReportHonorairesRecapitulatifAllTeachers) grhGenerateReportHonorairesRecapitulatifAllTeachers: GrhGenerateReportHonorairesRecapitulatifAllTeachers;
    @ViewChild(GrhGenerateReportHonoraireRecapitulatifTeacherTypes) grhGenerateReportHonoraireRecapitulatifTeacherTypes: GrhGenerateReportHonoraireRecapitulatifTeacherTypes;
    @ViewChild(GrhGenerateReportHonorairesOneTeacher) grhGenerateReportHonorairesOneTeacher: GrhGenerateReportHonorairesOneTeacher;

    @ViewChild(GrhGenerateReportEmployeePaySlip) grhGenerateReportEmployeePaySlip: GrhGenerateReportEmployeePaySlip;
    @ViewChild(GrhGenerateReportAllEmployeesPaySlips) grhGenerateReportAllEmployeesPaySlips: GrhGenerateReportAllEmployeesPaySlips;
    @ViewChild(AdminGenerateAllEmployeeCongeStatus) adminGenerateAllEmployeeCongeStatus: AdminGenerateAllEmployeeCongeStatus

    currentUser: User = JSON.parse(atob(Cookie.get('user')));

    PAY_MANAGEMENT: string = Constants.PAY_MANAGEMENT;
    BANK_REPORTS: string = Constants.BANK_REPORTS;
    PAY_EMPLOYEES_REPORTS: string = Constants.PAY_EMPLOYEES_REPORTS;
    PAY_TEACHERS_REPORTS: string = Constants.PAY_TEACHERS_REPORTS;

    GENERATE_PAY_SLIP: string = Constants.GENERATE_PAY_SLIP;

    GLOBAL_ALL_BANK_REPORTS: string = Constants.GLOBAL_ALL_BANK_REPORTS;
    RECAP_BY_BANK_REPORTS: string = Constants.RECAP_BY_BANK_REPORTS;
    GLOBAL_ALL_EMPLOYEES_REPORTS: string = Constants.GLOBAL_ALL_EMPLOYEES_REPORTS;

    PAY_SLIP_EMPLOYEE_REPORT: string = Constants.PAY_SLIP_EMPLOYEE_REPORT;
    PAY_SLIPS_EMPLOYEES_REPORT: string = Constants.PAY_SLIPS_EMPLOYEES_REPORT;

    HONORAIRE_TEACHER_REPORT: string = Constants.HONORAIRE_TEACHER_REPORT;
    HONORAIRE_ALL_TEACHERS_REPORT: string = Constants.HONORAIRE_ALL_TEACHERS_REPORT;
    HONORAIRE_TYPE_TEACHERS_REPORT: string = Constants.HONORAIRE_TYPE_TEACHERS_REPORT;

    etatPayeMensuel="etatPayeMensuel"
    etatIndividuelPaieHonoraireEnseignant="etatIndividuelPaieHonoraireEnseignant"
    etatGlobalPaie="etatGlobalPaie"

    constructor() {

    }
    ngOnInit() {
      if (this.currentUser == null) {
        this.currentUser = new User();
      }
      //this.grhGenerateReportHonorairesOneTeacher.getAll();
    }

    onTabChange(evt) {
      console.log(evt.index);
      if (evt.index == 0) {

      }
      if (evt.index == 1) {

      }
      if (evt.index == 2) {

      }  if (evt.index == 3) {

      }
    }

    onSubBankTabChange(evt) {
      if (evt.index == 0) {
         this.grhGenerateReportGlobalVirSalaireParBanque.initParameters();
      }
      if (evt.index == 1) {
        this.grhGenerateReportRecapitulatifVirSalaireParBanque.initParameters();
      }
      if (evt.index == 2) {
        this.grhGenerateReportRecapitulatifVirSalaireEmployes.initParameters();
      }
    }

    onSubEmployeeTabChange(evt) {
      if (evt.index == 0) {
         this.grhGenerateReportAllEmployeesPaySlips.initParameters();
      }
      if (evt.index == 1) {
        this.grhGenerateReportEmployeePaySlip.initParameters();
      }
    }

    onSubTeacherTabChange(evt) {
      if (evt.index == 0) {
         this.grhGenerateReportHonorairesAllTeachers.initParameters();
      }
      if (evt.index == 1) {
        this.grhGenerateReportHonoraireTeacherTypes.initParameters();
      }
      if (evt.index == 2) {
        this.grhGenerateReportHonorairesOneTeacher.initParameters();
      }
    }

}
