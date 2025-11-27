
import {Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {OnlineRegistration} from '../models/onlineRegistration';
import {Constants} from '../app.constants';
import {DataTableModule, DialogModule, InputTextareaModule, SelectItem} from 'primeng/primeng';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/User';
import {Level} from '../models/level';
import {Payment} from '../models/payment';
import {Cycle} from '../models/cycle';
import {Doc} from '../models/doc';
import {UIChart} from 'primeng/primeng';
import {FileUploader} from './fileUploader';
import {StudentService} from '../services/student.service';
import {CycleService} from '../services/cycle.service';
import { SubjectService } from 'app/services';
import { SubjectInvoiceView } from 'app/models/SubjectInvoiceView';
import {SuiviInscrit} from './suiviInscrit';
import {SuiviInscritParClasse} from './suiviInscritParClasse';

@Component({
  selector: 'app-admin-suivi-inscrit',
  templateUrl: '../pages/adminSuiviInscrit.html',
  providers: [StudentService, CycleService]
})
export class AdminSuiviInscrit implements OnInit, OnDestroy {
   currentUser: User;
   public activeTab = 0;
   @ViewChild(SuiviInscrit) suiviInscrit: SuiviInscrit;
   @ViewChild(SuiviInscritParClasse) suiviInscritParClasse: SuiviInscritParClasse;
	data: any;
	dataSubjectsInvoiceView: any;
	subjectsInvoiceView : SubjectInvoiceView[];
  
  constructor
    (
    private studentService: StudentService,
    private cycleService: CycleService,
        private subjectService: SubjectService,
    private changeDetectorRef: ChangeDetectorRef
    ) {

  }

  ngOnDestroy() {
    
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }

  }
onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 0) {
    } else if (evt.index == 1) {
    } else if (evt.index == 2) {
    }
  
  }
}
