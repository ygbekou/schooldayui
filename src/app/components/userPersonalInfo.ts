import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../services/user.service';
import { Constants } from '../app.constants';
import { User } from '../models/User';
import { FileUploader } from './fileUploader';
import { InputTextModule, CalendarModule, DropdownModule } from 'primeng/primeng';

@Component({
  selector: 'app-user-personalInfo',
  templateUrl: '../pages/userPersonalInfo.html',
  providers: [UserService, Constants]
})

export class UserPersonalInfo implements OnInit {
  error = '';
  success = '';
  roles: any[]= [];
  rolesGrh: any[] = [];

  public loggedInUser: User;
  @Input('user') aUser: User;
  @ViewChild(FileUploader) fileUploader:FileUploader;

  CHANGE_PROFIL_IMAGE:  string = Constants.CHANGE_PROFIL_IMAGE;
  MALE:  string = Constants.MALE;
  FEMALE:  string = Constants.FEMALE;
  SAVE_LABEL:  string = Constants.SAVE_LABEL;
  displayDialog : boolean;

  constructor(
    private router: Router,
    private userService: UserService) {
    this.roles = [];
    this.roles.push({label: 'Administrateur', value: 1});
    this.roles.push({label: 'Enseignant', value: 2});
    this.roles.push({label: 'Eleve', value: 3});
    this.roles.push({label: 'Parent', value: 4});
    this.roles.push({label: 'Personnel', value: 15});
    this.roles.push({label: 'Kiosk', value: 6});
    this.roles.push({label: 'Visiteur', value: 7});
    this.roles.push({ label: 'DEP', value: 8 });
    this.roles.push({ label: 'DCMC', value: 9 });
    this.roles.push({ label: 'GRH', value: 10 });
    this.roles.push({ label: 'Secretaire', value: 11 });
    this.roles.push({ label: 'CPE', value: 14 });
    
    this.rolesGrh = [];
    this.rolesGrh.push({label: 'Enseignant', value: 2});
    this.rolesGrh.push({label: 'Eleve', value: 3});
    this.rolesGrh.push({label: 'Parent', value: 4});
    this.rolesGrh.push({label: 'Personnel', value: 15});
    this.rolesGrh.push({ label: 'DEP', value: 8 });
    this.rolesGrh.push({ label: 'DCMC', value: 9 });
    this.rolesGrh.push({ label: 'GRH', value: 10 });
    this.rolesGrh.push({ label: 'Secretaire', value: 11 });

    this.loggedInUser = JSON.parse(atob(Cookie.get('user')));
  }

  ngOnInit() {
    //this.aUser = new User();
  }


  public saveUser() {
    try {
      this.userService.saveUser(this.aUser)
        .subscribe(result => {
          if (result == "Success") {
            this.success = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveNotSuccess +", "+ result;
          }
        })
        // console.log(this.aUser);
    }
    catch (e) {
      this.error =Constants.ERROR_OCCURRED;
    }

  }

  showDialogToUploadImage(data) {
    this.fileUploader.showDialogToUploadImage("user", data);
  }

   showDialogToAdd() {
 
        this.displayDialog = true;
  }
  
  closeDialog() {
          this.displayDialog = false;
    }
  

}
