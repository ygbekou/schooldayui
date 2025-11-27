import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import { CardModule } from 'primeng/card';
import {SharedModule} from './shared/shared.module';
import { SecretaireMenu } from 'app/components/menu/secretaireMenu';
import { SecretaireInformation } from '../components/secretaire/secretaireInformation';
import { SecretaireCourse } from '../components/secretaire/secretaireCourse';
import { SecretaireSchedule } from '../components/secretaire/secretaireSchedule';
import { SecretaireStudentProject } from '../components/secretaire/secretaireStudentProject';
import { SecretaireApproval } from '../components/secretaire/secretaireApproval';
import { SecretaireProfile } from '../components/secretaire/secretaireProfile';

const routes: Routes = [
  {path: 'information', component: SecretaireInformation},
  {path: 'course', component: SecretaireCourse},
  {path: 'schedule', component: SecretaireSchedule},
  {path: 'studentProject', component: SecretaireStudentProject},
  {path: 'secretaireApproval', component: SecretaireApproval},
  {path: 'secretaireProfile', component: SecretaireProfile}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule,CardModule
  ],

  exports: [],

  declarations: [SecretaireMenu,  SecretaireInformation, SecretaireCourse, SecretaireSchedule, SecretaireStudentProject,
                  SecretaireApproval, SecretaireProfile],

  providers: []
})

export class SecretaireModule {}
