import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module';
import {DcmcMain} from '../components/dcmcMain';
import { DcmcMenu } from '../components/menu/dcmcMenu'; 
import {DcmcDemand} from '../components/dcmcDemand';
import {DcmcProformaFacturation} from '../components/dcmcProformaFacturation';
import {DcmcCourse} from '../components/dcmcCourse';
import {DcmcStudent} from '../components/dcmcStudent';
import {DcmcProfile} from '../components/dcmcProfile';
import {DcmcReport} from '../components/dcmcReport';
import {DcmcYearInfo} from '../components/dcmcYearInfo';
import { DcmcBourseOnline } from 'app/components/dcmcBourseOnline';

const routes: Routes = [ 
  {path: 'dcmcMain', component: DcmcMain},
  {path: 'dcmcDemand', component: DcmcDemand},
  {path: 'dcmcProformaFacturation', component: DcmcProformaFacturation},
  {path: 'dcmcProformaFacturation', component: DcmcProformaFacturation},
  {path: 'dcmcCourse', component: DcmcCourse},
  {path: 'dcmcStudent', component: DcmcStudent},
  {path: 'dcmcProfile', component: DcmcProfile},
  {path: 'dcmcReport', component: DcmcReport},
  {path: 'dcmcYearInfo', component: DcmcYearInfo},
  {path: 'dcmcBourseOnline', component: DcmcBourseOnline}
];


@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule
  ],

  exports: [],

  declarations: [DcmcMenu, DcmcMain, DcmcDemand, DcmcProformaFacturation, DcmcCourse, DcmcStudent, DcmcProfile, DcmcReport,
  DcmcYearInfo,DcmcBourseOnline],

  providers: []
})

export class DcmcModule {}