import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { StudentTuition } from '../components/studentTuition';
import { StudentFeedback } from '../components/studentFeedback';
import { StudentMain } from '../components/studentMain';
import { StudentDemandFormation } from '../components/studentDemandFormation'; 
import { StudentProfile } from '../components/studentProfile';
import { StudentLibrary } from '../components/studentLibrary';
import { StudentMenu } from '../components/menu/studentMenu'; 
import { StudentCalendar } from '../components/studentCalendar';

const routes: Routes = [ 
  { path: 'studentTuition', component: StudentTuition },
  { path: 'studentCalendar', component: StudentCalendar },
  { path: 'studentFeedback', component: StudentFeedback },  
  { path: 'studentDemandFormation', component: StudentDemandFormation },
  { path: 'studentMain', component: StudentMain },    
  { path: 'studentProfile', component: StudentProfile },
  { path: 'studentLibrary', component: StudentLibrary }
];


@NgModule({
  imports: [ 
    RouterModule.forChild(routes), SharedModule
  ],
  
  exports: [],
  
  declarations: [StudentMenu, StudentProfile, StudentLibrary, StudentTuition, StudentFeedback,  StudentDemandFormation, 
    StudentMain, StudentCalendar ],
   
  providers: []
})

export class StudentModule { }