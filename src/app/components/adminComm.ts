import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {Constants} from '../app.constants';
import {User} from '../models/User';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Class} from '../models/class';
import {Item} from '../models/item';
import {Mail} from '../models/mail';
import {ClassDropdown} from './dropdowns/dropdown.class';
import {Message} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {BaseService} from '../services/base.service';

import {SchoolYearDropdown} from './dropdowns/dropdown.schoolYear';


@Component({
  selector: 'app-admin-comm',
  templateUrl: '../pages/adminComm.html',
  providers: [Constants, ClassDropdown, BaseService, SchoolYearDropdown]
})
export class AdminComm implements OnInit {
  user: User = new User();
  mail: Mail;
  CLASS: string = Constants.CLASSE;
  SEND_TO_EVERYONE: string = Constants.SEND_TO_EVERYONE;
  SEND_TO_CLASS: string = Constants.SEND_TO_CLASS;
  types: Item[];
  sms: boolean = false;
  selectedTypes: string[] = [];
  currentUser: User;
  SEND: string = Constants.SEND;
  SCHOOLYEAR: string = Constants.SCHOOLYEAR;
  classSelected: boolean = false;
  public disabled: boolean = false;
  msgs: Message[] = [];
  public classDropdown: ClassDropdown;
  public schoolYearDropdown: SchoolYearDropdown;
  constructor(private clsDropdown: ClassDropdown,
    private syDropdown: SchoolYearDropdown, private baseService: BaseService) {
    this.classDropdown = clsDropdown;
    this.schoolYearDropdown = syDropdown;
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));
    if (this.currentUser == null) {
      this.currentUser = new User();
    }

    this.mail = new Mail();
    this.user = JSON.parse(atob(Cookie.get('user')));
    this.types = [];
    this.types.push({label: 'Eleves', value: '1'});
    this.types.push({label: 'Parents', value: '2'});
    this.types.push({label: 'Enseignants', value: '3'});
    this.types.push({label: 'Alumni', value: '4'});
    this.types.push({label: 'Classe', value: '5'});
  }

  onTabChange(evt) {
    if (evt.index == 0) {
    }
  }

  sendMail() {
    this.SEND = "Envoi en cours...";
    this.disabled = true;    
    this.msgs = [];
    if (this.selectedTypes.length <= 0) {
      this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Choisissez au moins un groupe de destinataire'});
    } if (this.classSelected && (this.mail.classe == null || this.mail.schoolYear == null)) {
      this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Choisissez une classe et une annee'});
    } else if (this.mail.subject == null && !this.sms) {
      this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Mettez un sujet'});
    } else if (this.mail.body == null) {
      this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Composer un message'});
    } else {

      this.mail.sender = this.user;
      this.mail.modifiedBy = this.currentUser.id;
      this.mail.mailGrps = this.selectedTypes;
      this.baseService.sendMassMail(this.mail).subscribe((result: boolean) => {
        if (result) {
          this.msgs.push({severity: 'success', summary: 'Success', detail: 'Message envoye'});
          this.mail = new Mail();
          this.selectedTypes = [];
        } else {
          this.msgs.push({severity: 'error', summary: 'Erreur', detail: 'Echec d\'envois'});
        }
        this.disabled = false;
        this.SEND = Constants.SEND;
      },
        error => console.log(error),
        () => {
          console.log('send mail')
          this.disabled = false;
          this.SEND = Constants.SEND;
        });
    }
    this.disabled = false;
    this.SEND = Constants.SEND;
  }

  validate() {
    if (this.selectedTypes.indexOf('5') >= 0) {
      this.classSelected = true;
      this.selectedTypes = ['5'];
    } else {
      this.classSelected = false;
    }
  }
}
