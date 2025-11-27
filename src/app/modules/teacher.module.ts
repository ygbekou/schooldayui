import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {TeacherMain} from '../components/teacherMain';
import {TeacherProfile} from '../components/teacherProfile';
import {TeacherLibrary} from '../components/teacherLibrary';
import {SharedModule} from './shared/shared.module';
import {TeacherMenu} from '../components/menu/teacherMenu';
import {TeacherStudent} from '../components/teacherStudent';
import {TeacherGrade} from '../components/teacherGrade';
import {TeacherComm} from '../components/teacherComm';
import {TeacherCalendar} from '../components/teacherCalendar';

const routes: Routes = [
  {path: 'teacherProfile', component: TeacherProfile},
  {path: 'teacherComm', component: TeacherComm},
  {path: 'teacherCalendar', component: TeacherCalendar},
  {path: 'teacherStudent', component: TeacherStudent},
  {path: 'teacherMain', component: TeacherMain},
  {path: 'teacherGrade', component: TeacherGrade},
  {path: 'teacherLibrary', component: TeacherLibrary}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule
  ],

  exports: [],

  declarations: [TeacherMenu, TeacherMain, TeacherComm, TeacherProfile, 
    TeacherLibrary, TeacherStudent, TeacherGrade, TeacherCalendar],
  
  providers: []
})

export class TeacherModule {}