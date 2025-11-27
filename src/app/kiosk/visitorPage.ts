import { Constants } from '../../app/app.constants';
import { User } from '../../app/models/User';
import { Component } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { UserService } from '../../app/services/user.service'; 
import { Cico } from '../../app/models/cico';
import { CicoService } from 'app/services/cico.service';

@Component({
  selector: 'page-visitor',
  templateUrl: 'visitorPage.html'
})
export class VisitorPage {
  msg: string;
  cico: Cico = new Cico();
  user: User;
  error: string;
  aUser: User = new User();
  failed = new Audio();
  success = new Audio();
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
        this.cicoCleanupTime = data
      },
        error => console.log(error),
        () => console.log('Get cicoCleanupTime'));
    this.failed.src = "assets/audio/failed.mp3";
    this.success.src = "assets/audio/success.mp3";
  }

  checkRequiredFields(): boolean {
    let result = true;
    if (!this.cico.name) {
      this.error = 'Saisissez le nom';
      result = false;
    } else if (!this.cico.matricule) {
      this.error = 'Saisissez le numero de badge';
      result = false;
    } else if (!this.cico.reason) {
      this.error = 'Saisissez la raison de la visite';
      result = false;
    } else if (!this.cico.visitee) {
      this.error = 'Saisissez la personne visitee';
      result = false;
    }
    return result;
  }
  onSuccess() {

  }
  onError() {

  }
  public doCico() {
    this.msg = "";
    this.error = '';
    this.aUser = new User();
    this.cico.ci = new Date();

    if (this.checkRequiredFields()) {
      try {
        this.userService.cico(this.cico)
          .subscribe(result => {
            this.aUser = result;
            console.log(this.aUser);
            this.setMsg(this.aUser)
            if (this.aUser.cicoStatus === 1 || this.aUser.cicoStatus === 3 || this.aUser.cicoStatus === 4) {
              setTimeout(() => {
                console.log('after 3 sec');
                this.aUser = new User();
                this.cico = new Cico();
                this.cico.name = null;
                this.cico.phone = null;
                this.cico.reason = null;
                this.cico.visitee = null;
                this.cico.matricule = null;
                document.getElementById('name').focus(); 
              }, this.cicoCleanupTime*1000);

            }
          })
      }
      catch (e) {
        this.msg = Constants.ERROR_OCCURRED;
      }
    }
  }
  setMsg(aUser: User) {
    if (aUser.cicoStatus === 0) {//not found
      this.msg = 'Accès non autorisé. Badge invalide.';
      this.failed.play();
    } else if (aUser.cicoStatus === 1) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ", bienvenue à iPnet !";
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
    } else if (aUser.cicoStatus === 5) {
      this.msg = this.getSex(aUser) + ' ' + aUser.name + ", aurevoir !";
      this.failed.play();
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


}
