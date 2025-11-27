import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CommonSharedModule} from './common.shared.module';
import {UserPersonalInfo} from '../../components/userPersonalInfo';
import {UserContactInfo} from '../../components/userContactInfo';
import {FileUploader} from '../../components/fileUploader';
import {AdminTestimony} from '../../components/adminTestimony';
import {DemandFormation} from '../../components/demandFormation';
import {AdminUserList} from '../../components/adminUserList';
import {AdminUserList2} from '../../components/adminUserList2';
import {AdminExamList} from '../../components/adminExamList';
import {ManageTeacher} from '../../components/teacher';

import {AdminCycle} from '../../components/adminCycle';
import {AdminCollege} from '../../components/adminCollege';
import {AdminLevel} from '../../components/adminLevel';
import {AdminLevelGlobal} from '../../components/adminLevelGlobal';
import {AdminSubject} from '../../components/adminSubject';
import {AdminLevelSubject} from '../../components/adminLevelSubject';
import {AdminLevelSubjectPro} from '../../components/adminLevelSubjectPro';
import {AdminClass} from '../../components/adminClass';
import {AdminTuition} from '../../components/adminTuition';
import {AdminLookUpTable} from '../../components/adminLookUpTable';
import {AdminCalcMonth} from '../../components/adminCalcMonth';
import {AdminCalcSemester} from '../../components/adminCalcSemester';
import {AdminCalcYear} from '../../components/adminCalcYear';
import {StudentDocs} from '../../components/studentDocs';
import {AdminVideo} from '../../components/adminVideo';
import {AdminEvent} from '../../components/adminEvent';
import {AdminNews} from '../../components/adminNews';
import {AdminCampusImage} from '../../components/adminCampusImage';
import {AdminAlbumPhotosJpope} from '../../components/adminAlbumPhotosJpope';
import {AdminFaq} from '../../components/adminFaq';

import {ManageCourse} from '../../components/manageCourse';
import {ManageTimeSheet} from '../../components/manageTimeSheet';
import {AdminCourseTopic} from '../../components/adminCourseTopic';
import {AdminSyllabus} from '../../components/adminSyllabus';
import {AdminTimeTable} from '../../components/adminTimeTable';
import {CoursePayment} from '../../components/coursePayment';
import {CourseResults} from '../../components/courseResults';
import {AdminSchooling} from '../../components/adminSchooling';
import {AdminAssignment} from '../../components/adminAssignment';
import {ManageStudent} from '../../components/manageStudent';
import {ManageParent} from '../../components/manageParent';
import {RunReport} from '../../components/runReport';
import {AdminProduct} from '../../components/adminProduct';
import {AdminProductUser} from '../../components/adminProductUser';
import {StudentResults} from '../../components/studentResults';
import {AdminRegistration} from '../../components/adminRegistration';
import {DemandRegistration} from '../../components/demandRegistration';
import {AdminSchoolYear} from '../../components/adminSchoolYear';
import {AdminTerm} from '../../components/adminTerm';
import {StudentCharts} from '../../components/studentCharts';
import {AdminComm} from '../../components/adminComm';
import {SearchComponent} from '../../components/includes/search';
import {StudentRegistration} from '../../components/studentRegistration';
import {FicheRenseignement} from '../../components/ficheRenseignement';
import {ListeDesLaureatsBAC1} from '../../components/listeDesLaureatsBAC1';
import {AdminStudentCourse} from '../../components/adminStudentCourse';
import {AdminUserSubject} from '../../components/adminUserSubject';
import {AdminPrerequisitWaiver} from '../../components/adminPrerequisitWaiver';
import {AdminAssignResp} from '../../components/adminAssignResp';
import {AdminInvoice} from '../../components/adminInvoice';
import {AdminInvoicePay} from '../../components/adminInvoicePay';
import {AdminFacturation} from '../../components/adminFacturation';
import {AdminInvoiceSearch} from '../../components/adminInvoiceSearch';
import {AdminInvoiceInfo} from '../../components/adminInvoiceInfo';
import {AdminInvoiceInfoOnly} from '../../components/adminInvoiceInfoOnly';
import {AdminInvoiceDetails} from '../../components/adminInvoiceDetails';
import {AdminProforma} from '../../components/adminProforma';
import {AdminProformaInfoDetails} from '../../components/adminProformaInfoDetails';
import {AdminProformaSearch} from '../../components/adminProformaSearch';
import {AdminProformaInfoOnly} from '../../components/adminProformaInfoOnly';
import {AdminProformaInfo} from '../../components/adminProformaInfo';
import {AdminProformaDetails} from '../../components/adminProformaDetails';
import {AdminProformaContact} from '../../components/adminProformaContact';
import {AdminStudentProjectTopic} from '../../components/adminStudentProjectTopic';
import {AdminStudentProjectPhase} from '../../components/adminStudentProjectPhase';
import {AdminStudentProjectProject} from '../../components/adminStudentProjectProject';
import {AdminStudentProjectCategory} from '../../components/adminStudentProjectCategory';
import {AdminSuiviInscrit} from '../../components/adminSuiviInscrit';
import { AdminPresence } from 'app/components/adminPresence';
import {ManageAttendance} from '../../components/manageAttendance';
import { ManageAdminAttendance } from '../../components/manageAdminAttendance';

import {ManageStudentKioskCard} from '../../components/manageStudentKioskCard';
import {ManageStudentParent} from '../../components/manageStudentParent';

import { ManageTeacherContract } from 'app/components/grh/teacherContract';
import { AvantageTypeGRH } from 'app/components/grh/avantageType';
import { GRHAvantageValue } from 'app/components/grh/grhAvantageValue';
import { GrhAvantage } from 'app/components/grh/grhAvantage';
import { GrhContractType } from 'app/components/grh/grhContractType';
import { GrhFiscalYear } from 'app/components/grh/grhFiscalYear';
import { GrhPayParameterType } from 'app/components/grh/grhPayParameterType';
import { GrhPayParameter } from 'app/components/grh/grhPayParameter';
import { GrhFiscalYearPayParameter } from 'app/components/grh/grhFiscalYearPayParameter';
import { GrhManageEmployee } from 'app/components/grh/grhManageEmployee';
import {GrhLetterNumeroRef} from 'app/components/grh/grhLetterNumeroReft';
import {GrhLetterObject} from 'app/components/grh/grhLetterObject';
import {GrhCivility} from 'app/components/grh/grhCivility';
import {GrhSocietyBank} from 'app/components/grh/grhSocietyBank';
import {GrhAccountNumber} from 'app/components/grh/grhAccountNumber';
import {GrhLetterContent} from 'app/components/grh/grhLetterContent';
import {FicheRenseignementDashbord} from '../../components/ficheRenseignementDashbord';
import {SuiviInscrit} from '../../components/suiviInscrit';
import {SuiviInscritParClasse} from '../../components/suiviInscritParClasse';
import {PresenceEtudiant} from '../../components/presenceEtudiant';
import {PresenceEnseignant} from '../../components/presenceEnseignant';
import {AdminKiosk} from '../../components/adminKiosk';
import { AdminExamCloseSemestreGroup } from '../../components/adminExamCloseSemestreGroup';
// import {OnlineRegistrationCertificat} from '../../components/onlineRegistrationCertificat';
// import {OnlineRegistrationConcours} from '../../components/onlineRegistrationConcours';
// import {OnlineRegistrationBourse} from '../../components/onlineRegistrationBours';
// import {OnlineRegistrationLicence} from '../../components/onlineRegistrationLicence';
// import {OnlineRegistrationMaster} from '../../components/onlineRegistrationMaster';
import { AdminStudentsCourseClass } from '../../components/adminStudentsCourseClass';
import { AdminStudentsCourseClassToStudentsList } from 'app/components/adminStudentsCourseClassToStudentsList';
import {CpeCoursEtudiant} from '../../components/cpe/cpeCoursEtudiant';

import { AdminStudentPaymentGraph } from '../../components/adminStudentPaymentGraph';
import { AdminStudentLatePayment } from '../../components/adminStudentLatePayment';
import { AdminStudentCorrectPayment } from '../../components/adminStudentCorrectPayment';

import { GrhSalaryType } from 'app/components/grh/grhSalaryType';
import { GrhPersonnelType } from 'app/components/grh/grhPersonnelType';
import { GrhTeacherType } from 'app/components/grh/grhTeacherType';
import { GrhTeacherLevel } from 'app/components/grh/grhTeacherLevel';
import { AiRegistrationComponent } from 'app/components/ai-registration.component';
import { AdminAiRegisterListComponent } from 'app/components/admin-ai-register-list.component';
import { AdminSifa } from 'app/components/adminSifa';
import { AdminSifa1 } from 'app/components/adminSifa1';
import { AdminSifa2 } from 'app/components/adminSifa2';
import { AdminAttendance } from 'app/components/adminAttendance';
import { SearchAdminAttendance } from 'app/components/searchAdminAttendance';
import { StudentAttendance } from 'app/components/studentAttendance';
import { SearchStudentAttendance } from 'app/components/searchStudentAttendance';
import { ManageCourseHours } from 'app/components/manageCourseHours';
import { AdminExamConfig } from 'app/components/adminExamConfig';
import { CalculCourseHours } from 'app/components/calculCourseHours';
import { AdminNewsLetter } from 'app/components/adminNewsLetter';
import { CpeBulletinEtudiant } from 'app/components/cpe/cpeBulletinEtudiant';
import { ConcoursData } from 'app/components/concoursData';
import { UserLoginInfo } from 'app/components/userLoginInfo';
import { RegistrationRequestData } from 'app/components/registrationRequestData';
import { AdminStudentCourseGlobalResult } from 'app/components/adminStudentCourseGlobalResult';
import { AdminFiliereStats } from 'app/components/adminFiliereStats';
import { AdminCountryStats } from 'app/components/adminCountryStats';

//import {CpeTeacher} from '../../components/cpe/cpeTeacher';


@NgModule({
  declarations: [FileUploader, UserPersonalInfo, StudentCharts, UserContactInfo, UserLoginInfo,
    ManageStudent, StudentResults, AdminRegistration, DemandRegistration, AdminComm, AdminStudentCourse,AdminUserSubject,
    AdminPrerequisitWaiver,AdminPresence,
    AdminTestimony, DemandFormation, AdminUserList, AdminUserList2, AdminExamList, StudentRegistration,FicheRenseignement,
    CoursePayment, CourseResults, ManageTeacher, AdminCourseTopic, AdminSyllabus, AdminTimeTable,
    AdminCycle, AdminCollege, AdminLevel, AdminLevelGlobal, AdminSubject, AdminLevelSubject, AdminClass, AdminCalcMonth, AdminCalcSemester,
    AdminCalcYear, StudentDocs, AdminNews,AdminSifa,AdminSifa1,AdminSifa2, AdminEvent, AdminVideo, AdminCampusImage, AdminFaq,
    AdminTuition, AdminLookUpTable,ManageCourseHours,
    ManageCourse, AdminSchooling, AdminAssignment, AdminAssignResp, ManageParent, RunReport, AdminSchoolYear, AdminTerm, AdminProduct,
    ManageCourse, ManageTimeSheet, AdminSchooling, AdminAssignment, ManageParent, RunReport, AdminSchoolYear, AdminTerm, AdminProduct
    , AdminProductUser, SearchComponent, AdminFacturation, AdminInvoice, AdminInvoiceSearch, AdminInvoiceInfo, AdminInvoiceInfoOnly,
      AdminInvoiceDetails, AdminProforma, AdminProformaInfoDetails, AdminProformaSearch, AdminProformaInfoOnly,
      AdminProformaInfo, AdminProformaDetails, AdminProformaContact, AdminStudentProjectTopic, AdminStudentProjectPhase, AdminStudentProjectProject,
      AdminStudentProjectCategory, AdminSuiviInscrit,ManageAttendance,ManageAdminAttendance,AdminAttendance,SearchAdminAttendance,StudentAttendance,SearchStudentAttendance,
      ManageTeacherContract, AvantageTypeGRH, GRHAvantageValue, GrhAvantage, GrhContractType,
      GrhFiscalYear, GrhPayParameterType, GrhPayParameter, GrhFiscalYearPayParameter, GrhManageEmployee,
      ManageStudentKioskCard, AdminExamCloseSemestreGroup, ManageStudentParent, GrhLetterNumeroRef, GrhLetterObject, GrhCivility, GrhSocietyBank,
      GrhAccountNumber, GrhLetterContent, AdminInvoicePay, FicheRenseignementDashbord, SuiviInscrit, SuiviInscritParClasse, AdminKiosk
      ,AdminStudentsCourseClass, AdminStudentsCourseClassToStudentsList, AdminStudentPaymentGraph, AdminStudentLatePayment, AdminLevelSubjectPro
      , AdminStudentCorrectPayment, AdminAlbumPhotosJpope
      // OnlineRegistrationLicence, OnlineRegistrationMaster, OnlineRegistrationCertificat, OnlineRegistrationConcours, OnlineRegistrationBourse

      ,  AdminAiRegisterListComponent,PresenceEtudiant,PresenceEnseignant,CpeCoursEtudiant,CpeBulletinEtudiant
      , GrhSalaryType, GrhPersonnelType, GrhTeacherType, GrhTeacherLevel,AdminExamConfig,CalculCourseHours, AdminNewsLetter, ConcoursData, RegistrationRequestData,
      AdminStudentCourseGlobalResult, AdminFiliereStats, AdminCountryStats

  ],

  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule,

    CommonSharedModule
  ],

  exports: [
    // angular exports
    CommonModule, FormsModule, ReactiveFormsModule, HttpModule, CommonSharedModule, AdminStudentCourse, AdminPrerequisitWaiver,
    // our components exports
    FileUploader, UserPersonalInfo, UserContactInfo, UserLoginInfo, AdminTestimony, ManageStudent, ManageParent, RunReport, AdminTimeTable,AdminUserSubject,
    StudentResults, AdminRegistration, DemandRegistration, StudentCharts, AdminSchoolYear, AdminCourseTopic, AdminComm,
    AdminCycle, AdminCollege, AdminLevel, AdminLevelGlobal, AdminSubject, AdminLevelSubject, AdminClass, AdminCalcMonth, AdminCalcSemester,
    AdminCalcYear, StudentDocs, AdminNews,AdminSifa,AdminSifa1,AdminSifa2, AdminEvent, AdminVideo, AdminCampusImage, AdminFaq,
    AdminTuition, AdminLookUpTable,
    AdminSyllabus, DemandFormation, AdminUserList, AdminUserList2, AdminExamList, ManageTeacher, ManageCourse, StudentRegistration,
    AdminSyllabus, DemandFormation, AdminUserList, AdminUserList2, AdminExamList, ManageTeacher, ManageCourse, StudentRegistration,
    FicheRenseignement, CoursePayment, CourseResults, AdminSchooling, AdminAssignment,  AdminTerm, AdminProduct, AdminProductUser, SearchComponent,
    AdminSyllabus, DemandFormation, AdminUserList, AdminUserList2, AdminExamList, ManageTeacher, ManageCourse, ManageCourseHours, ManageTimeSheet,
    StudentRegistration, CoursePayment, CourseResults, AdminSchooling, AdminAssignment,AdminPresence,
    AdminTerm, AdminProduct, AdminProductUser, SearchComponent, AdminFacturation, AdminInvoice, AdminInvoiceSearch, AdminInvoiceInfo,
      AdminInvoiceInfoOnly, AdminInvoiceDetails, AdminProforma, AdminProformaInfoDetails, AdminProformaSearch, AdminProformaInfoOnly,
      AdminProformaInfo, AdminProformaDetails, AdminProformaContact, AdminStudentProjectTopic, AdminStudentProjectPhase, AdminStudentProjectProject,
      AdminStudentProjectCategory, AdminSuiviInscrit,ManageAttendance,ManageAdminAttendance,AdminAttendance,SearchAdminAttendance,StudentAttendance,SearchStudentAttendance,
      ManageTeacherContract, AvantageTypeGRH, GRHAvantageValue, GrhAvantage, GrhContractType,
      GrhFiscalYear, GrhPayParameterType, GrhPayParameter, GrhFiscalYearPayParameter, GrhManageEmployee,
    ManageStudentKioskCard, AdminExamCloseSemestreGroup, ManageStudentParent, GrhLetterNumeroRef, GrhLetterObject, GrhCivility, GrhSocietyBank,
    GrhLetterContent, GrhAccountNumber, AdminInvoicePay, FicheRenseignementDashbord, SuiviInscrit, SuiviInscritParClasse, AdminKiosk,
    AdminStudentsCourseClass, AdminStudentsCourseClassToStudentsList, AdminStudentPaymentGraph, AdminStudentLatePayment, AdminLevelSubjectPro,
    AdminStudentCorrectPayment, AdminAlbumPhotosJpope
    
    , GrhSalaryType, GrhPersonnelType, GrhTeacherType, GrhTeacherLevel,CpeBulletinEtudiant

    , AdminAiRegisterListComponent,PresenceEtudiant,PresenceEnseignant,CpeCoursEtudiant,AdminExamConfig,CalculCourseHours, AdminNewsLetter,ConcoursData, RegistrationRequestData,
    AdminStudentCourseGlobalResult, AdminFiliereStats, AdminCountryStats
  ],
})

export class SharedModule {

}
