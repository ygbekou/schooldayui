import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { ParentMain } from '../components/parentMain';
import { ParentMenu } from '../components/menu/parentMenu'; 
import { ParentProfile } from '../components/parentProfile'; 
import { ParentFeedback } from '../components/parentFeedback'; 

const routes: Routes = [
  { path: 'parentMain', component: ParentMain },
  { path: 'parentProfile', component: ParentProfile },
  { path: 'parentFeedback', component: ParentFeedback } 
];

@NgModule({
  imports: [ 
    RouterModule.forChild(routes), SharedModule
  ],
  
  exports: [],
  
  declarations: [ParentMenu, ParentMain, ParentProfile, ParentFeedback],
  
  providers: []
})

export class ParentModule { }