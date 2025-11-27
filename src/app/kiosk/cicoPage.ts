import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/User';
import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../app/services/user.service';
import { Cico } from '../../app/models/cico';
import { CicoService } from 'app/services';

@Component({
  selector: 'page-cico',
  templateUrl: 'cicoPage.html'
})
export class CicoPage {
  msg: string;
  cico: Cico = new Cico();
  user: User;
  aUser: User = new User();
  failed = new Audio();
  success = new Audio();
  cicoTimeMessage = 5;
  cicoCleanupTime = 5;
  constructor(private ciciService: CicoService,
    private userService: UserService) {

    this.user = JSON.parse(Cookie.get('loggedInUser'));
    if (this.user != null) {
      this.userService.getById(this.user)
        .subscribe((data: User) => {
          this.user = data
          this.user.birthDate = new Date(this.user.birthDate);
        },
          error => console.log(error),
          () => console.log('Get user complete'));
    }

    this.ciciService.getCicoCleanupTime()
      .subscribe((data: number) => {
        console.log('Cico cleanup =' + data);
        this.cicoCleanupTime = data;
        this.cicoTimeMessage = data;
      },
        error => console.log(error),
        () => console.log('Get cicoCleanupTime'));

    this.failed.src = "assets/audio/failed.mp3";
    this.success.src = "assets/audio/success.mp3";
  }

  onSuccess() {

  }
  onError() {

  }
  public doCico() {
    this.msg = "";
    this.aUser = new User();
    this.cico.ci = new Date();
    if (this.cico.matricule) {
      try {
        //24082021
        //this.userService.cico(this.cico)
        this.userService.cicoWithEmployeeTableChecking(this.cico)
          .subscribe(result => {
            this.aUser = result;
            console.log(this.aUser,"................................");
            this.setMsg(this.aUser)
            setTimeout(() => {
              this.aUser = new User();
              this.cico = new Cico();
              this.cico.matricule = null;
              document.getElementById('matricule').focus();
            }, this.cicoCleanupTime * 1000);
          })
      }
      catch (e) {
        this.msg = Constants.ERROR_OCCURRED;
      }
    }
  }

  /* Adébayor 27052020 */
  public doCicoNew() {
    this.msg = "";
    this.aUser = new User();
    this.cico.ci = new Date();
    if (this.cico.kioskCardNumber) {
      try {
        this.userService.cicoNew(this.cico)
          .subscribe(result => {
            this.aUser = result;
            console.log("cico user");
            console.log(this.aUser);
            this.setMsg(this.aUser)
            setTimeout(() => {
              this.aUser = new User();
              this.cico = new Cico();
              this.cico.kioskCardNumber = null;
              document.getElementById('matricule').focus();
            }, this.cicoCleanupTime * 1000);
          })
      }
      catch (e) {
        this.msg = Constants.ERROR_OCCURRED;
      }
    }
  }
  setMsg(aUser: User) {
    this.cicoCleanupTime = this.cicoTimeMessage;
    if(aUser.message){
      this.cicoCleanupTime = this.cicoCleanupTime * 1.25;
    }
    console.log(this.cicoCleanupTime)
    if (aUser.cicoStatus === 0) {//not found
      //this.msg = 'Accès non autorisé. Badge invalide.';
      if(aUser.message){
        this.msg = aUser.message;
      }else{
        this.msg = 'Accès non autorisé. Badge invalide.';
      }
      this.failed.play();
    } else if (aUser.cicoStatus === 1 || aUser.cicoStatus === 10) {
      // this.msg = this.getSex(aUser) + ' ' + aUser.name + ", bienvenue à iPnet !";
      if(aUser.message){
        this.msg = this.getSex(aUser) + ' ' + aUser.name + ", " + aUser.message;
      }else{
        this.msg = this.getSex(aUser) + ' ' + aUser.name + ", bienvenue à iPnet !";
      }
      this.success.play();
    } else if (aUser.cicoStatus === 2) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ", faites-vous activer.";
      this.failed.play();
    } else if (aUser.cicoStatus === 3) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ", rendez-vous à l'administration. ";
      this.failed.play();
    } else if (aUser.cicoStatus === 4) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ", vous êtes déjà reçu.";
      this.failed.play();
    } else if (aUser.cicoStatus === 5 || aUser.cicoStatus === 11) {
      // this.msg = this.getSex(aUser) + ' ' + aUser.name + ", aurevoir !";
      if(aUser.message){
        this.msg = this.getSex(aUser) + ' ' + aUser.name + ", " + aUser.message;
      }else{
        this.msg = this.getSex(aUser) + ' ' + aUser.name + ", aurevoir !";
      }
      this.success.play();
    } else if (aUser.cicoStatus === 6) {
      this.msg = 'Utilisez le kiosk visiteur pour enregistrer les visiteurs!';
      this.failed.play();
    } else if (aUser.cicoStatus === 7) {
      this.msg = 'Veillez utiliser un badge visiteur!';
      this.failed.play();
    }
  }

  getSex(user: User): string {
    if (user.sex === 'M') {
      return 'Monsieur';
    } else if (user.sex === 'I') {
      return '';
    } else {
      return 'Madame';
    }
  }

  format(date): string {
    return date.getFullYear()
      + '-' + this.leftpad(date.getMonth() + 1, 2)
      + '-' + this.leftpad(date.getDate(), 2)
      + ' ' + this.leftpad(date.getHours(), 2)
      + ':' + this.leftpad(date.getMinutes(), 2)
      + ':' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
      + String(val)).slice(String(val).length);
  }

}
