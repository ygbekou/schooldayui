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
  { path: 'courses', component: Courses },
  { path: 'newsSingle', component: NewsSingle },
  { path: 'demandeStage', component: DemandeStages },
  { path: 'howToRegister', component: HowToRegister },
  { path: 'faq', component: Faq },
  { path: 'audit', component: Audit },
  { path: 'training', component: Training },
  { path: 'installationsDePointe', component: InstallationPointe},
  { path: 'hotel', component: Hotel },
  { path: 'privacy', component: Privacy },
  { path: 'visiteGuide', component: VisiteGuide },
  { path: 'team', component: Team },
  { path: 'collegeSingle', component: CollegeSingle },
  { path: 'collegeSinglePro', component: CollegeSinglePro },
  { path: 'subjectDetails', component: SubjectDetails },
  { path: 'events', component: Events },
  { path: 'news', component: Newss },
  { path: 'videos', component: Videos },
  { path: 'contact', component: ContactComponent },
  { path: 'conditionStage', component: ConditionStages },
  { path: 'documentsTelecharge', component: DocumentsTelecharge },
  //{ path: 'coursEnLigne', component: CoursEnLigne },
  //{path:   'projetsProfesionnels', component: ProjetsProfesionnels, canActivate:[AuthGuard]},
  {path:   'projets', component: ProjetsProfesionnels},
  {path:   'Projets_new', component: ProjetsProfesionnelsNew},
  {path:   'Projets_interFilieres', component: ProjetsProfesionnelsInterFiliere},
  {path:   'Projets_Marketing_Digital', component: ProjetsProMarketingDigital},
  {path:   'Projets_Support_IT_Dig', component: ProjetProSupportITDigitalisation},
  {path: 'resultatConcour', component: ResultatConcours},
  {path: 'Bourses', component: BourseAidePret},
  {path: 'bourseOnline', component: BourseOnline},
  //{path:   'howToRegisterElearning', component: HowToRegisterElearning},
 // {path:   'tarifElearning', component: TarifElearning},
  { path: 'home', component: Home },
  { path: 'conseil', component: Conseil },
  { path: 'solutions', component: Solutions },
  { path: 'admin', loadChildren: './modules/admin.module#AdminModule' },
  { path: 'teacher', loadChildren: './modules/teacher.module#TeacherModule' },
  { path: 'student', loadChildren: './modules/student.module#StudentModule' },
  { path: 'parent', loadChildren: './modules/parent.module#ParentModule' },
  { path: 'dep', loadChildren: './modules/dep.module#DepModule' },
  { path: 'dcmc', loadChildren: './modules/dcmc.module#DcmcModule' },
  { path: 'kiosk', loadChildren: './modules/kiosk.module#KioskModule' },
  { path: 'grh', loadChildren: './modules/grh.module#GrhModule' },
  { path: 'secretaire', loadChildren: './modules/secretaire.module#SecretaireModule' },
  { path: 'stagiaire', loadChildren: './modules/stagiaire.module#StagiaireModule' },
  { path: 'cpe', loadChildren: './modules/cpe.module#CpeModule' },
  { path: 'login', component: Login },
  { path: 'faqs', component: FaqPage },
  { path: 'onlineRegistration', component: OnlineRegistration },
  { path: 'conditionConcours', component: ConditionConcours },
  { path: 'concours', component: OnlineRegistration },
  { path: 'registerCourse', component: RegisterCourse },
  { path: 'tarif', component: Tarif },
  { path: 'effectif', component: Effectif },
  {path:   'vinnovant', component: SystemeEnseignementInnovant},
  {path:   'nosProgrammes', component: NosDepartements},
  {path:   'installationsDePointe', component: InstallationPointe},
  {path:   'listeDesLaureatsPrixIpnetBAC1', component: ListeDesLaureatsBAC1},
  {path:   'coursMGT411', component: CoursMGT411},
  {path:   'jpope', component: UserJpopeRegistration},
  {path:   'albumPhotosJpope', component: AlbumPhotosJpope2020},
  {path:   'CertifiedStudents', component: EtudiantTalentComponent},
  //{path:   'AI', component: AiRegistrationComponent},
  {path:   'rdvOrientation', component: AiRegistrationComponent},
  // {path:   'inscription', component: OnlineRegistrationLicence},
  { path: 'decoupageAnneeAcademique', component: DecoupageAnneeAcademique },
  { path: 'nosFilieresDeFormation', component: NosFilieresDeFormation },
  { path: 'nosFilieresIngenieriesDeLogiciels', component: NosFilieresIngenieriesDeLogiciels },
  { path: '', component: Home, pathMatch: 'full' },// redirect to home page
  { path: 'diplomaAuthenticity', component: DiplomaAuthenticity },
  { path: 'jpopeProjects', component: JpopeProjects },
  { path: 'addSchool', component: AddSchool }
];
