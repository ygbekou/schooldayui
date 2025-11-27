import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { Constants } from './app.constants';
import { CommonSharedModule } from './modules/shared/common.shared.module';
import { AppComponent } from './app.component';
import { Courses } from './components/courses';
import { ContactComponent } from './components/contact';
import { ConditionStages } from './components/conditionStage';
import { ContactShort } from './components/contactShort';
import { DemandeStages } from './components/demandeStage';
import { Home } from './components/home';
import { routes } from './app.routes';
import { AdminCourseTopic } from './components/adminCourseTopic';
import { AdminSyllabus } from './components/adminSyllabus';
import { eventShortList } from './components/eventShortList';
import { NewsShortList } from './components/newsShortList';
import { NewsSingle } from './components/newsSingle';
import { SearchCourse } from './components/searchCourse';
import { TestimonialList } from './components/testimonialList';
import { VideoList } from './components/videoList';
import { Login } from './components/login';
import { DropdownUtil } from './components/dropdowns/dropdown.util';
import { OnlineRegistration } from './components/onlineRegistration';
import { Events } from './components/events';
import { Newss } from './components/news';
import { OneVideo } from './components/oneVideo';
import { NewsShortVertical } from './components/newsShortVertical';
import { EventShortVertical } from './components/eventShortVertical';
import { CollegeSingle } from './components/collegeSingle';
import { CollegeSinglePro } from './components/collegeSinglePro';
import { SubjectDetails } from './components/subjectDetails';
import { Prospectus } from './components/prospectus';
//mport { Syllabus }                     from './components/syllabus';
import { Suscribe } from './components/suscribe';
import { Faq } from './components/faq';
import { FaqPage } from './components/faqs';
import { Privacy } from './components/privacy';
import { Team } from './components/team';
import { Audit } from './components/audit';
import { Training } from './components/training';
import { Hotel } from './components/hotel';
import { VisiteGuide } from './components/visiteGuide';
import { HowToRegister } from './components/howToRegister';
import { RegisterCourse } from './components/registerCourse';
import { Videos } from './components/videos';
import { Conseil } from './components/conseil';
import { Solutions } from './components/solutions';
import { FaireunStage } from './components/faireunStage';
import { DocumentsTelecharge } from './components/documentsTelecharge';
import { ProjetsProfesionnels } from './components/projetsProfesionnels';
import { ResultatConcours } from './components/resultatConcours';
import { BourseAidePret } from './components/bourseAidePret';
import { UserJpopeRegistration } from './components/userJpopeRegistration';
import { AlbumPhotosJpope2020 } from './components/albumPhotosJpope2020';
import { DecoupageAnneeAcademique } from './components/decoupageAnneeAcademique';
import { NosFilieresDeFormation } from './components/nosFilieresDeFormation';
import { NosFilieresIngenieriesDeLogiciels } from './components/nosFilieresIngenieriesDeLogiciels';


// import {OnlineRegistrationCertificat} from './components/onlineRegistrationCertificat';
// import {OnlineRegistrationConcours} from './components/onlineRegistrationConcours';
// import {OnlineRegistrationBourse} from './components/onlineRegistrationBours';
//import {OnlineRegistrationLicence} from './components/onlineRegistrationLicence';
// import {OnlineRegistrationMaster} from './components/onlineRegistrationMaster';



//import { CoursEnLigne }                   from './components/coursEnLigne';
//import { TarifElearning }                   from './components/tarifElearning';
//import { HowToRegisterElearning }                   from './components/howToRegisterElearning';
import { Tarif } from './components/tarif';
import { Effectif } from './components/effectif';
import { SystemeEnseignementInnovant } from './components/systemeEnseignementInnovant';
import { NosDepartements } from './components/nosDepartements';
import { InstallationPointe } from './components/installationPointe';
import { CoursMGT411 } from './components/coursMGT411';
import { ListeDesLaureatsBAC1 } from './components/listeDesLaureatsBAC1';
import { AnnonceElearning } from './components/annonceElearning';
import { ConditionConcours } from './components/conditionConcours';
import localeFr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { FacebookModule } from 'ngx-facebook';
registerLocaleData(localeFr);

import {
  BaseService, ClassService, CourseService,
  CollegeService, EventService, GlobalEventsManager,
  LevelService, NewsService, StudentService,
  SubjectService, TeacherService, UserService,
  VideoService, ConfigurationService, ParentService,
  CampusImageService, PositionService, ExamService,
  TestimonyService, CourseRegistrationService, ProductCopyUserService, ProductService, AuthorService, ProductCopyService,
  SchoolingService, SchoolYearService, TermService, RelationTableService, CourseTopicService, SyllabusService, CicoService
} from './services/';
import { registerLocaleData } from '@angular/common';
import { AuthGuard } from './services/auth.guard';
import { StudentProjectService } from "./services/studentProject.service";
import { AvantageTypeService } from "./services/grh/avantageType.service";
import { AvantageService } from "./services/grh/avantage.service";
import { ContractTypeService } from "./services/grh/contractType.service";
import { FiscalYearService } from "./services/grh/fiscalYear.service";
import { PayParameterTypeService } from "./services/grh/payParameterType.service";
import { PayParameterService } from "./services/grh/payParameter.service";
import { PaiementModeService } from "./services/grh/paiementMode.service";
import { BankService } from "./services/grh/bank.service";
import { SemestreGroupService } from "./services/semestreGroup.service";
import { LetterService } from "./services/grh/letter.service";
import { PaySlipHistoryService } from "./services/grh/paySlipHistory.service";
import { InvoicePayService } from "./services/invoicePay.service";
import { LevelSubjectProService } from "./services/levelSubjectPro.service";
import { ConfirmationService } from 'primeng/api';
//import { NatureService } from './services/immo/nature.service';
import { EvaluationService } from './services/grh/evaluation.service';
import { SurveillanceService } from './services/grh/surveillance.service';
import { PhotoJpopeService } from './services/photoJpope.service';
import { EtudiantTalentComponent } from './components/etudiant-talent.component';
import { AiRegistrationComponent } from './components/ai-registration.component';
import { AiRegisterService } from './services/airegistration.service';
// Adébayor 03/08/2022 import { AdminAiRegisterListComponent } from './components/admin-ai-register-list.component';
import { NatureService } from './services/immo/nature.service';
import { SalaryTypeService } from './services/grh/salaryType.service';
import { PersonnelTypeService } from './services/grh/personnelType.service';
import { TeacherTypeNewService } from './services/grh/teacherTypeNew.service';
import { TeacherLevelNewService } from './services/grh/teacherLevelNew.service';
import { BourseOnline } from './components/bourseOnline';
import { DiplomaAuthenticity } from './components/diplomaAuthenticity';
import { ProjetsProfesionnelsNew } from './components/projetsProfesionnelsNew';
import { ProjetsProfesionnelsInterFiliere } from './components/projetsProfessionnelsInterFiliere';
import { ProjetsProMarketingDigital } from './components/projetsProMarketingDigital';
import { ProjetProSupportITDigitalisation } from './components/projetProSupportITDigitalisation';
import { CoursAIT100 } from './components/coursAIT100';
import { CoursAIT110 } from './components/coursAIT110';
import { JpopeProjects } from './components/jpopeProjects';
import { AddSchool } from './components/addSchool';
import { SchoolService } from './services/school.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SchoolInterceptor } from './app.interceptor';

@NgModule({
  declarations: [
    AppComponent, Login, Events, Newss, Courses, NewsSingle, FaireunStage, UserJpopeRegistration,
    Prospectus, ContactComponent, ConditionStages, OnlineRegistration,
    CollegeSingle, CollegeSinglePro, SubjectDetails, ContactShort, Home, eventShortList,
    NewsShortList, SearchCourse, TestimonialList, VideoList, FaqPage,
    OneVideo, NewsShortVertical, EventShortVertical, Suscribe, Tarif,
    Privacy, Faq, Privacy, VisiteGuide, Team, HowToRegister, DemandeStages,
    Audit, Training, Hotel, RegisterCourse, Videos, Conseil, Solutions, DocumentsTelecharge, ProjetsProfesionnels,
    ProjetsProfesionnelsNew, ProjetsProfesionnelsInterFiliere, ProjetsProMarketingDigital, ProjetProSupportITDigitalisation,
    NosDepartements, SystemeEnseignementInnovant, ResultatConcours, BourseAidePret, BourseOnline, AnnonceElearning, InstallationPointe,
    ListeDesLaureatsBAC1, CoursMGT411/*, FacebookModule*/, AlbumPhotosJpope2020, DecoupageAnneeAcademique, ConditionConcours,
    NosFilieresDeFormation, NosFilieresIngenieriesDeLogiciels, Effectif, EtudiantTalentComponent, AiRegistrationComponent, DiplomaAuthenticity,
    CoursAIT100, CoursAIT110, JpopeProjects, AddSchool


    //,CoursEnLigne
  ],

  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, CommonSharedModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],


  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SchoolInterceptor,
      multi: true },
    CourseRegistrationService, BaseService, UserService,
    CollegeService, LevelService, TeacherService, StudentService,
    ClassService, SubjectService, Constants, GlobalEventsManager,
    ProductCopyUserService, ProductService, AuthorService, ProductCopyService,
    ConfigurationService, ParentService, CampusImageService, ExamService,
    PositionService, TestimonyService, SchoolingService, SchoolYearService,
    TermService, RelationTableService, CourseTopicService, SyllabusService, AuthGuard,
    StudentProjectService, CicoService, FiscalYearService, AvantageTypeService, ContractTypeService, AvantageService,
    PayParameterTypeService, PayParameterService, PaiementModeService, BankService,
    SemestreGroupService, LetterService, InvoicePayService, ConfirmationService,
    PaySlipHistoryService, NatureService, EvaluationService, SurveillanceService, LevelSubjectProService, PhotoJpopeService, AiRegisterService,
    SalaryTypeService, PersonnelTypeService, TeacherTypeNewService, TeacherLevelNewService, SchoolService, 
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    
  ],

  bootstrap: [AppComponent]
})


export class AppModule { }
