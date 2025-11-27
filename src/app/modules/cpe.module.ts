import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { CardModule } from 'primeng/card';
import {SharedModule} from './shared/shared.module';

import { CpeDashboard } from 'app/components/cpe/cpeDashboard';
import { CpeMenu } from 'app/components/menu/cpeMenu';
import { CpeProfil } from 'app/components/cpe/cpeProfil';
import { CpeTeacher } from 'app/components/cpe/cpeTeacher';
import { CpeAdminSchedule } from 'app/components/cpe/cpeAdminSchedule';
import { CpeBulletinEtudiant } from 'app/components/cpe/cpeBulletinEtudiant';

const routes: Routes = [
  {path: 'cpeDashboard', component: CpeDashboard} ,
  {path: 'cpeProfile', component: CpeProfil},
  {path: 'cpeTeacher', component: CpeTeacher},
  {path: 'cpeAdminSchedule', component: CpeAdminSchedule}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule,CardModule
  ],

  exports: [],

  declarations: [CpeMenu,  CpeDashboard, CpeProfil,CpeTeacher,CpeAdminSchedule],

  providers: []
})

export class CpeModule {}
