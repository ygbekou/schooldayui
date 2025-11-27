import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module'; 
import {DepMain} from '../components/depMain';
//<<<<<<< HEAD
import {DepDemand} from '../components/depDemand';
import {DepCourse} from '../components/depCourse';
import {DepSchedule} from '../components/depSchedule';
import {DepExam} from '../components/depExam';
import {DepStudentProject} from '../components/depStudentProject';
import {DepTeacher} from '../components/depTeacher';
import {DepStudent} from '../components/depStudent';
import {DepParent} from '../components/depParent';
import {DepProfile} from '../components/depProfile';
import {DepReport} from '../components/depReport';
import {DepYearInfo} from '../components/depYearInfo';
import { DepMenu } from 'app/components/menu/depMenu'; 
import { CardModule } from 'primeng/card';
import { DepBourseOnline } from 'app/components/depBourseOnline';
import { DepRegistration } from 'app/components/depRegistration';
/*
=======
import { DepMenu } from 'app/components/menu/depMenu';  
import { CardModule } from 'primeng/card';
>>>>>>> ab89532a42e91ecce3abcc800db16662774509e1
*/
const routes: Routes = [ 
  {path: 'depMain', component: DepMain} ,
  {path: 'depDemand', component: DepDemand} ,
  {path: 'depCourse', component: DepCourse} ,
  {path: 'depSchedule', component: DepSchedule} ,
  {path: 'depExam', component: DepExam} ,
  {path: 'depStudentProject', component: DepStudentProject} ,
  {path: 'depTeacher', component: DepTeacher} ,
  {path: 'depStudent', component: DepStudent} ,
  {path: 'depParent', component: DepParent} ,
  {path: 'depProfile', component: DepProfile} ,
  {path: 'depReport', component: DepReport} ,
  {path: 'depYearInfo', component: DepYearInfo},
  {path: 'depBourseOnline', component: DepBourseOnline},
  {path: 'depRegistration', component: DepRegistration}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule,CardModule
  ],

  exports: [],

//<<<<<<< HEAD
  declarations: [ DepMenu,  DepMain, DepDemand, DepCourse, DepSchedule, DepExam, DepStudentProject, DepTeacher, DepStudent, 
    DepParent, DepProfile, DepReport, DepYearInfo, DepBourseOnline, DepRegistration],
    /*
=======
  declarations: [ DepMenu,  DepMain ],
>>>>>>> ab89532a42e91ecce3abcc800db16662774509e1
*/

  providers: []
})

export class DepModule {}