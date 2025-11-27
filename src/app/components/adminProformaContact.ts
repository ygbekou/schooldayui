import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../services/user.service';
import { Constants } from '../app.constants';
import { User } from '../models/User'; 
import { FileUploader } from './fileUploader';
import { InvoiceView } from 'app/models/invoiceView';
import { Proforma } from 'app/models/proforma';
import { ProformaService } from 'app/services/proforma.service';
import { InvoiceContact } from 'app/models/InvoiceContact';

@Component({ 
  selector: 'app-proforma-contact',
  templateUrl: '../pages/adminProformaContact.html', 
  providers: [UserService, ProformaService, Constants]
})

export class AdminProformaContact implements OnInit {
  error = '';
  success = '';
  roles: any[]= [];
  public loggedInUser: User;
  @Input('user') aUser: User = new User();
  @ViewChild(FileUploader) fileUploader:FileUploader;
  
  CHANGE_PROFIL_IMAGE:  string = Constants.CHANGE_PROFIL_IMAGE;
  MALE:  string = Constants.MALE;
  FEMALE:  string = Constants.FEMALE;
  SAVE_LABEL:  string = Constants.SAVE_LABEL;
  
	@Input('invoiceView') invoiceView: InvoiceView;
    @Input('proforma') proforma: Proforma = new Proforma();
	
  constructor( 
    private router: Router,
    private userService: UserService,
        private proformaService: ProformaService) { 
    
    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() { 
	//this.aUser = new User(); 
	this.proforma.invoiceContact = new InvoiceContact();
  }


  public saveInvoiceContact() {
    try {
      this.proformaService.saveInvoiceContact(this.proforma.invoiceContact)
        .subscribe(result => {
          if (!result.error) {
			  console.log(this.proforma.invoiceContact);
            this.success = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveNotSuccess +", "+ result;
          }
        })
    }
    catch (e) {
      this.error =Constants.ERROR_OCCURRED;
    }

  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("user", data);
  }

    public getProformaById(invoiceView: InvoiceView) {
        this.error = null;
        this.proformaService.getProformaById(invoiceView).subscribe((data: Proforma) => {
            this.proforma = data;
            console.log(data);
        },
            error => console.log(error),
            () => console.log('Find proforma by id ' + invoiceView.proformaId));
    }
  
}
