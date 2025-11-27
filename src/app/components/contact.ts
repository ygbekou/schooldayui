import { Component } from '@angular/core';
import { EditorModule, SharedModule, AutoCompleteModule, InputTextModule, DropdownModule, } from 'primeng/primeng';
import { Contact } from '../models/contact';
import { BaseService } from '../services/base.service';
import { Constants } from '../app.constants';

@Component({ 
  moduleId: 'module.id',
  selector: 'app-contact',
  templateUrl: '../pages/contact.html',
  providers: [Constants, BaseService]
})

export class ContactComponent {
  contact: Contact = new Contact();
  error: string = '';
  success: string = '';
  button: number=0;

  constructor(private baseService: BaseService) {

  }

  sendMessage() {
    try {
      
      this.error='';
      this.success='';
      
      if(this.contact.message!=null){
      this.baseService.sendMail(this.contact)
        .subscribe(result => {
          if (result == true) {
            this.success = "Merci de votre message. Nous vous contacterons au besoins";
          }else{ 
              this.error = "Une erreur s'est produite lors de l'envois. Revoyez votre e-mail et Reessayez";
          }
        })
      }else{
         this.error = "Saisissez votre message";
      }
    }
    catch (e) {
      this.error = "Une erreur systeme s'est produite. Reessayez";
    }


  }
}
