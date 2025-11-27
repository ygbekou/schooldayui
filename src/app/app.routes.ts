import { Effectif } from './components/effectif';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Courses } from './components/courses';
import { ContactComponent } from './components/contact';
import { ConditionStages } from './components/conditionStage';
import { Home } from './components/home';
import { Login } from './components/login';
import { Events } from './components/events';
import { Newss } from './components/news';
import { OnlineRegistration } from './components/onlineRegistration';
import { NewsSingle } from './components/newsSingle';
import { CollegeSingle } from './components/collegeSingle';
import { CollegeSinglePro } from './components/collegeSinglePro';
import { SubjectDetails } from './components/subjectDetails';
import { Faq } from './components/faq';
import { FaqPage } from './components/faqs';
import { Privacy } from './components/privacy';
import { Team } from './components/team';
import { Hotel } from './components/hotel';
import { VisiteGuide } from './components/visiteGuide';
import { HowToRegister } from './components/howToRegister';
import { Audit } from './components/audit';
import { Training } from './components/training';
import { RegisterCourse } from './components/registerCourse';
import { Videos } from './components/videos';
import { Conseil } from './components/conseil';
import { Solutions } from './components/solutions';
import { DemandeStages } from './components/demandeStage';
import { DocumentsTelecharge } from './components/documentsTelecharge';
import { ProjetsProfesionnels } from './components/projetsProfesionnels';
//import { CoursEnLigne } from './components/coursEnLigne';
import { Tarif } from './components/tarif';
import { AuthGuard } from './services/auth.guard';
import {SystemeEnseignementInnovant} from "./components/systemeEnseignementInnovant";
import {NosDepartements} from "./components/nosDepartements";
import {InstallationPointe} from "./components/installationPointe";
import { ListeDesLaureatsBAC1 } from './components/listeDesLaureatsBAC1';
import {ResultatConcours} from './components/resultatConcours';
import {BourseAidePret} from './components/bourseAidePret';
import {UserJpopeRegistration} from './components/userJpopeRegistration';
import { AlbumPhotosJpope2020 } from './components/albumPhotosJpope2020';
// import {OnlineRegistrationLicence} from './components/onlineRegistrationLicence';

import {CoursMGT411} from "./components/coursMGT411";
import { DecoupageAnneeAcademique } from './components/decoupageAnneeAcademique';
import { NosFilieresDeFormation } from './components/nosFilieresDeFormation';
import { NosFilieresIngenieriesDeLogiciels } from './components/nosFilieresIngenieriesDeLogiciels';
import { EtudiantTalentComponent } from './components/etudiant-talent.component';
import {ConditionConcours} from './components/conditionConcours';

 import { AiRegistrationComponent } from './components/ai-registration.component';
import { BourseOnline } from './components/bourseOnline';
import { DiplomaAuthenticity } from './components/diplomaAuthenticity';
import { ProjetsProfesionnelsNew } from './components/projetsProfesionnelsNew';
import { ProjetsProfesionnelsInterFiliere } from './components/projetsProfessionnelsInterFiliere';
import { ProjetsProMarketingDigital } from './components/projetsProMarketingDigital';
import { ProjetProSupportITDigitalisation } from './components/projetProSupportITDigitalisation';
import { JpopeProjects } from './components/jpopeProjects';
import { AddSchool } from './components/addSchool';
// Adébayor 03/08/2022 import { AdminAiRegisterListComponent } from './components/admin-ai-register-list.component';

//import { HowToRegisterElearning } from './components/howToRegisterElearning';
//import { TarifElearning } from './components/tarifElearning';
export const routes: Routes = [
  { path: ':schoolName/courses', component: Courses },
  { path: ':schoolName/newsSingle', component: NewsSingle },
  { path: ':schoolName/demandeStage', component: DemandeStages },
  { path: ':schoolName/howToRegister', component: HowToRegister },
  { path: ':schoolName/faq', component: Faq },
  { path: ':schoolName/audit', component: Audit },
  { path: ':schoolName/training', component: Training },
  { path: ':schoolName/installationsDePointe', component: InstallationPointe},
  { path: ':schoolName/hotel', component: Hotel },
  { path: ':schoolName/privacy', component: Privacy },
  { path: ':schoolName/visiteGuide', component: VisiteGuide },
  { path: ':schoolName/team', component: Team },
  { path: ':schoolName/collegeSingle', component: CollegeSingle },
  { path: ':schoolName/collegeSinglePro', component: CollegeSinglePro },
  { path: ':schoolName/subjectDetails', component: SubjectDetails },
  { path: ':schoolName/events', component: Events },
  { path: ':schoolName/news', component: Newss },
  { path: ':schoolName/videos', component: Videos },
  { path: ':schoolName/contact', component: ContactComponent },
  { path: ':schoolName/conditionStage', component: ConditionStages },
  { path: ':schoolName/documentsTelecharge', component: DocumentsTelecharge },
  //{ path: 'coursEnLigne', component: CoursEnLigne },
  //{path:   'projetsProfesionnels', component: ProjetsProfesionnels, canActivate:[AuthGuard]},
  {path:   ':schoolName/projets', component: ProjetsProfesionnels},
  {path:   ':schoolName/Projets_new', component: ProjetsProfesionnelsNew},
  {path:   ':schoolName/Projets_interFilieres', component: ProjetsProfesionnelsInterFiliere},
  {path:   ':schoolName/Projets_Marketing_Digital', component: ProjetsProMarketingDigital},
  {path:   ':schoolName/Projets_Support_IT_Dig', component: ProjetProSupportITDigitalisation},
  {path: ':schoolName/resultatConcour', component: ResultatConcours},
  {path: ':schoolName/Bourses', component: BourseAidePret},
  {path: ':schoolName/bourseOnline', component: BourseOnline},
  //{path:   'howToRegisterElearning', component: HowToRegisterElearning},
 // {path:   'tarifElearning', component: TarifElearning},
  { path: ':schoolName/home', component: Home },
  { path: ':schoolName/conseil', component: Conseil },
  { path: ':schoolName/solutions', component: Solutions },
  { path: ':schoolName/admin', loadChildren: './modules/admin.module#AdminModule' },
  { path: ':schoolName/teacher', loadChildren: './modules/teacher.module#TeacherModule' },
  { path: ':schoolName/student', loadChildren: './modules/student.module#StudentModule' },
  { path: ':schoolName/parent', loadChildren: './modules/parent.module#ParentModule' },
  { path: ':schoolName/dep', loadChildren: './modules/dep.module#DepModule' },
  { path: ':schoolName/dcmc', loadChildren: './modules/dcmc.module#DcmcModule' },
  { path: ':schoolName/kiosk', loadChildren: './modules/kiosk.module#KioskModule' },
  { path: ':schoolName/grh', loadChildren: './modules/grh.module#GrhModule' },
  { path: ':schoolName/secretaire', loadChildren: './modules/secretaire.module#SecretaireModule' },
  { path: ':schoolName/stagiaire', loadChildren: './modules/stagiaire.module#StagiaireModule' },
  { path: ':schoolName/cpe', loadChildren: './modules/cpe.module#CpeModule' },
  { path: ':schoolName/login', component: Login },
  { path: ':schoolName/faqs', component: FaqPage },
  { path: ':schoolName/onlineRegistration', component: OnlineRegistration },
  { path: ':schoolName/conditionConcours', component: ConditionConcours },
  { path: ':schoolName/concours', component: OnlineRegistration },
  { path: ':schoolName/registerCourse', component: RegisterCourse },
  { path: ':schoolName/tarif', component: Tarif },
  { path: ':schoolName/effectif', component: Effectif },
  {path:   'vinnovant', component: SystemeEnseignementInnovant},
  {path:   ':schoolName/nosProgrammes', component: NosDepartements},
  {path:   ':schoolName/installationsDePointe', component: InstallationPointe},
  {path:   ':schoolName/listeDesLaureatsPrixIpnetBAC1', component: ListeDesLaureatsBAC1},
  {path:   ':schoolName/coursMGT411', component: CoursMGT411},
  {path:   ':schoolName/jpope', component: UserJpopeRegistration},
  {path:   ':schoolName/albumPhotosJpope', component: AlbumPhotosJpope2020},
  {path:   ':schoolName/CertifiedStudents', component: EtudiantTalentComponent},
  //{path:   'AI', component: AiRegistrationComponent},
  {path:   ':schoolName/rdvOrientation', component: AiRegistrationComponent},
  // {path:   'inscription', component: OnlineRegistrationLicence},
  { path: ':schoolName/decoupageAnneeAcademique', component: DecoupageAnneeAcademique },
  { path: ':schoolName/nosFilieresDeFormation', component: NosFilieresDeFormation },
  { path: ':schoolName/nosFilieresIngenieriesDeLogiciels', component: NosFilieresIngenieriesDeLogiciels },
  { path: ':schoolName', component: Home, pathMatch: 'full' },// redirect to home page
  { path: ':schoolName/diplomaAuthenticity', component: DiplomaAuthenticity },
  { path: ':schoolName/jpopeProjects', component: JpopeProjects },
  { path: ':schoolName/addSchool', component: AddSchool }
];
