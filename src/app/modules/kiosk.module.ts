import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SharedModule} from './shared/shared.module'; 
import {KioskMain} from '../components/kioskMain';
import { KioskMenu } from 'app/components/menu/kioskMenu'; 
import { CicoPage } from 'app/kiosk/cicoPage';
import { VisitorPage } from 'app/kiosk/visitorPage';
import { CardModule } from 'primeng/card';
import { coursePage } from 'app/kiosk/coursePage';
const routes: Routes = [ 
  {path: 'kioskMain', component: KioskMain} 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), SharedModule,CardModule
  ],

  exports: [],

  declarations: [ KioskMenu,  KioskMain, CicoPage, VisitorPage, coursePage ],

  providers: []
})

export class KioskModule {}