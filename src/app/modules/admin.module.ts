import { ManageTeacherBankComponent } from './../components/manage-teacher-bank.component';
import {Routes, RouterModule} from '@angular/router';
import { NgModule, Component } from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {AdminMain} from '../components/adminMain';
import {AdminAcademic} from '../components/adminAcademic';
import {AdminCourse} from '../components/adminCourse';
import {AdminSchedule} from '../components/adminSchedule';
import {AdminApproval} from '../components/adminApproval';
import {AdminTeacher} from '../components/adminTeacher';
import {AdminStudent} from '../components/adminStudent';
import {AdminProfile} from '../components/adminProfile';
//import {AdminEvent} from '../components/adminEvent';
//import {AdminTuition} from '../components/adminTuition';
//import {AdminCollege} from '../components/adminCollege';
//import {AdminLevel} from '../components/adminLevel';
//import {AdminLevelSubject} from '../components/adminLevelSubject';
//import {AdminClass} from '../components/adminClass';
//import {AdminSubject} from '../components/adminSubject';
import {AdminAuthor} from '../components/adminAuthor';
//import {AdminLookUpTable} from '../components/adminLookUpTable';
import {AdminRelationTable} from '../components/adminRelationTable';
//import {AdminFaq} from '../components/adminFaq';
import {AdminExam} from '../components/adminExam';
import {AdminDemand} from '../components/adminDemand';
import {AdminParent} from '../components/adminParent';
import {AdminConfiguration} from '../components/adminConfiguration';
//import {AdminCampusImage} from '../components/adminCampusImage';
//import {AdminNews} from '../components/adminNews';
//import {AdminVideo} from '../components/adminVideo';
import {AdminPosition} from '../components/adminPosition';
import {AdminReport} from '../components/adminReport';
//import {AdminCalcMonth} from '../components/adminCalcMonth';
//import {AdminCalcSemester} from '../components/adminCalcSemester';
//import {AdminCalcYear} from '../components/adminCalcYear';
import {AdminMenu} from '../components/menu/adminMenu';
import {Information} from '../components/information';
//import {AdminCycle} from '../components/adminCycle';
import {AdminYearInfo} from '../components/adminYearInfo';
import {AdminSchool} from '../components/adminSchool';
//import {StudentDocs} from '../components/studentDocs';
import {AdminComm} from '../components/adminComm';
import {AdminLibrary} from '../components/adminLibrary';
import {AdminProformaFacturation} from "../components/adminProformaFacturation";
import {AdminStudentProject} from "../components/adminStudentProject";

import {AdminImmobilization} from '../components/adminImmobilization';
/* import { AdminImmoReception } from '../components/adminImmoReception'; */
//import { ImmoNature } from 'app/components/immo/ImmoNature';
//import { ImmoLocation } from 'app/components/immo/ImmoLocation';
import { ImmoState } from 'app/components/immo/ImmoState';
import { ImmoAccount } from 'app/components/immo/ImmoAccount';
import { ImmoReception } from 'app/components/immo/ImmoReception';
//import { ImmoFolder } from 'app/components/immo/ImmoFolder';
import { FiscalYearDropdown } from 'app/components/dropdowns/grh/dropdown.fiscalYear';
import { AccountDropdown } from 'app/components/dropdowns/immo/dropdown.account';
//import { NatureDropdown } from 'app/components/dropdowns/immo/dropdown.nature';
import { ReceptionDropdown } from 'app/components/dropdowns/immo/dropdown.reception';
import { ReceptionService } from 'app/services/immo/reception.service';
//import { NatureService } from 'app/services/immo/nature.service';
//import { AccountingAccountService } from 'app/services/immo/accountAccounting.service';
//import { FolderDropdown } from 'app/components/dropdowns/immo/dropdown.folder';
//import { FileTypeDropdown } from 'app/components/dropdowns/immo/dropdown.fileType';
import { EmployeeDropdown } from 'app/components/dropdowns/grh/dropdown.employee';
import { LevelGlobalDropdown } from 'app/components/dropdowns/dropdown.levelGlobal';
//import { ImmoFileType } from 'app/components/immo/ImmoFileType';
//import { ImmoFile } from 'app/components/immo/ImmoFile';
//import { FolderService } from 'app/services/immo/folder.service';
//import { FileTypeService } from 'app/services/immo/fileType.service';
//import { ImmoAssignement } from 'app/components/immo/ImmoAssignement';
//import { AssignementService } from 'app/services/immo/assignement.service';
//import { FileDropdown } from 'app/components/dropdowns/immo/dropdown.file';
//import { LocationDropdown } from 'app/components/dropdowns/immo/dropdown.location';
//import { LocationService } from 'app/services/immo/location.service';
//import { FileService } from 'app/services/immo/file.service';
import { EmployeeService } from 'app/services/grh/employee.service';
// Adébayor 03/08/2022 import { AdminAiRegisterListComponent } from 'app/components/admin-ai-register-list.component';
import { CategoryMaterialDropdown } from 'app/components/dropdowns/immo/dropdown.category-material';
import { FeaturesDropdown } from 'app/components/dropdowns/immo/dropdown.features';
import { MaterialAcquiredDropdown } from 'app/components/dropdowns/immo/dropdown.material-acquired';
import { MaterialBrandDropdown } from 'app/components/dropdowns/immo/dropdown.material-brand';
import { MaterialDropdown } from 'app/components/dropdowns/immo/dropdown.material';
import { MaterialsAcquiredDropdown } from 'app/components/dropdowns/immo/dropdown.materials-acquired';
import { PlaceDropdown } from 'app/components/dropdowns/immo/dropdown.place';
import { StateDropdown } from 'app/components/dropdowns/immo/dropdown.state';
import { VendorDropdown } from 'app/components/dropdowns/immo/dropdown.vendor';
import { YearDropdown } from 'app/components/dropdowns/immo/dropdown.year';
import { AccountingAccountService } from 'app/services/immo/accounting-account.service';
import { AmortizationService } from 'app/services/immo/amortization.service';
import { AssignmentService } from 'app/services/immo/assignment.service';
import { CategoryMaterialService } from 'app/services/immo/category-material.service';
import { FeaturesService } from 'app/services/immo/features.service';
import { MaterialAcquiredService } from 'app/services/immo/material-acquired.service';
import { MaterialBrandService } from 'app/services/immo/material-brand.service';
import { MaterialService } from 'app/services/immo/material.service';
import { MaterialsAcquiredService } from 'app/services/immo/materials-acquired.service';
import { MaterialsFeatureService } from 'app/services/immo/materials-feature.service';
import { PlaceService } from 'app/services/immo/place.service';
import { StateMaterialService } from 'app/services/immo/state-material.service';
import { StateService } from 'app/services/immo/state.service';
import { VendorService } from 'app/services/immo/vendor.service';
import { YearService } from 'app/services/immo/year.service';
import { immoCategoryMaterial } from 'app/components/immo/immoCategoryMaterial';
import { immoFeatures } from 'app/components/immo/immoFeatures';
import { immoMaterial } from 'app/components/immo/immoMaterial';
import { immoMaterialBrand } from 'app/components/immo/immoMaterialBrand';
import { immoPlace } from 'app/components/immo/immoPlace';
import { ImmoVendor } from 'app/components/immo/ImmoVendor';
import { ImmoYear } from 'app/components/immo/ImmoYear';
import { ImmoAssignment } from 'app/components/immo/ImmoAssignment';
import { NatureService } from 'app/services/immo/nature.service';
import { NatureDropdown } from 'app/components/dropdowns/immo/dropdown.nature';

import { ImmoNature } from 'app/components/immo/ImmoNature';
import { AdminBourseOnline } from 'app/components/adminBourseOnline';
import { AdminConcours } from 'app/components/adminConcours';

const routes: Routes = [
  {path: 'adminMain', component: AdminMain},
  {path: 'adminAcademic', component: AdminAcademic},
  {path: 'adminAcademicSchedule', component: AdminCourse},
  {path: 'adminApproval', component: AdminApproval},
  {path: 'adminTeacher', component: AdminTeacher},
  {path: 'adminStudent', component: AdminStudent},
  {path: 'adminProfile', component: AdminProfile},
  {path: 'adminParent', component: AdminParent},
  //{path: 'adminFaq', component: AdminFaq},
  {path: 'adminCourse', component: AdminCourse},
  {path: 'adminSchedule', component: AdminSchedule},
  {path: 'adminDemand', component: AdminDemand},
  {path: 'adminExam', component: AdminExam},
  {path: 'information', component: Information},
  {path: 'adminYearInfo', component: AdminYearInfo},
  //{path: 'adminLookUpTable', component: AdminLookUpTable},
  {path: 'adminRelationTable', component: AdminRelationTable},
  {path: 'adminComm', component: AdminComm},
  {path: 'adminLibrary', component: AdminLibrary},
  {path: 'adminProformaFacturation', component: AdminProformaFacturation},
  {path: 'adminStudentProject', component: AdminStudentProject},
  {path: 'adminReport', component: AdminReport},
  {path: 'adminImmobilization', component: AdminImmobilization},
  {path: 'adminBourseOnline', component: AdminBourseOnline},
  {path: 'adminConcours', component: AdminConcours}
  // Adébayor 03/08/2022 {path: 'listInscritsAI', component: AdminAiRegisterListComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule
  ],

  exports: [],

  declarations: [AdminMenu, AdminReport, /*AdminCalcMonth, AdminCalcSemester, AdminCalcYear, StudentDocs, */
    AdminTeacher, AdminAcademic, AdminCourse, /*AdminNews, AdminVideo, AdminEvent,*/ AdminSchool, AdminProformaFacturation,
    /*AdminCollege, AdminLevel, AdminLevelSubject, AdminClass, AdminSubject,*/ AdminAuthor, AdminMain, AdminStudent, AdminProfile,
    /*AdminCycle,*/
    AdminParent, AdminConfiguration,AdminBourseOnline, AdminApproval, AdminDemand/*, AdminFaq*/, AdminExam, Information, AdminLibrary,
    /*AdminCampusImage,*/ AdminPosition, AdminYearInfo/*, AdminLookUpTable*/, AdminRelationTable/*, AdminTuition*/, AdminSchedule,
    AdminStudentProject, AdminImmobilization/*  AdminImmoReception */,

    /* ImmoNature, ImmoLocation, */
    /* ImmoState, ImmoAccount, ImmoReception, */
    /* ImmoFolder,ImmoFolder,ImmoFileType,ImmoFile,ImmoAssignement, */
    ManageTeacherBankComponent,
    ImmoAccount, immoCategoryMaterial, immoFeatures, immoMaterial, immoMaterialBrand, immoPlace, ImmoReception, ImmoState, 
    ImmoVendor, ImmoYear, ImmoAssignment, ImmoNature/*,AdminAiRegisterListComponent*/,
    AdminConcours
  ],

  providers: [FiscalYearDropdown, 
    AccountDropdown, ReceptionDropdown, 
    /*NatureDropdown, FolderDropdown,FileTypeDropdown,LocationDropdown,FileDropdown,*/
    EmployeeDropdown,
    /* ReceptionService, */
    LevelGlobalDropdown, 
    AccountDropdown, CategoryMaterialDropdown, FeaturesDropdown, MaterialAcquiredDropdown, MaterialBrandDropdown, MaterialDropdown,
    MaterialsAcquiredDropdown, PlaceDropdown, ReceptionDropdown, StateDropdown, VendorDropdown, YearDropdown, NatureDropdown,
    /*NatureService, AccountingAccountService, FolderService, FileTypeService, LocationService, FileService, */
    EmployeeService, 
    /*AssignementService*/
    AccountingAccountService, AmortizationService, AssignmentService, CategoryMaterialService, FeaturesService, MaterialAcquiredService,
    MaterialBrandService, MaterialService, MaterialsAcquiredService, MaterialsFeatureService, PlaceService, ReceptionService,
    StateMaterialService, StateService, VendorService, YearService, NatureService


  ]
})

export class AdminModule {}
