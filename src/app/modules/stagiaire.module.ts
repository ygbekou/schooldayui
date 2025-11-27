import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { CardModule } from 'primeng/card';
import {SharedModule} from './shared/shared.module';

import { StagiaireDemand } from 'app/components/stagiaire/stagiaireDemand';
import { StagiaireMenu } from 'app/components/menu/stagiaireMenu';
import { StagiaireProfile } from 'app/components/stagiaire/stagiaireProfile';

const routes: Routes = [
  {path: 'stagiaireDemand', component: StagiaireDemand} ,
  {path: 'stagiaireProfile', component: StagiaireProfile}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule,CardModule
  ],

  exports: [],

  declarations: [StagiaireMenu,  StagiaireDemand, StagiaireProfile],

  providers: []
})

export class StagiaireModule {}
