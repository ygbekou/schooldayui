import { Subscriber } from "app/models/subscriber";
import { Component, OnInit } from "@angular/core";
import { UserService } from "app/services";
import { Cookie } from "ng2-cookies/ng2-cookies";
@Component({
  moduleId: "module.id",
  selector: "app-prospectus",
  templateUrl: "../pages/prospectus.html",
})
export class Prospectus implements OnInit {
  displayDialog: boolean = false;
  subscriber: Subscriber = new Subscriber();
  public flyer: string = "prospectus";
  zIndexDialog: number = 1000;
  isSubscribed: boolean = false;
  error: string;


  isAuthorized : boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.isAuthorized = ((Cookie.get("user") != null || Cookie.get("sub") != null));

      
  }

  showDialogToAdd() {
    this.displayDialog = true;
  }

  changerContenu() {
    this.error="";
    this.isSubscribed = !this.isSubscribed;
  }

  save() {
    this.error = "";
    if(!this.isSubscribed){

    try {
      if (
          !this.subscriber.firstName ||
          !this.subscriber.lastName ||
          !this.subscriber.email ||
          !this.subscriber.phone
      ) {
        this.error = "🛑 Veuillez remplir tous les champs";
      } else if(!(/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/.test(this.subscriber.email))){
        this.error = "❌ Adresse email invalide !";
      } else {
        // this.error = "aucun n'est null";
          this.userService.saveSubscriber(this.subscriber)
          .subscribe(result => {
            if (result == 0) {
            
                this.displayDialog = true;
                this.error = "❌ Cet email existe déjà !";
             
            }else if(result == 1){
               this.displayDialog = false;
              Cookie.set("sub",result.toString());
               this.isAuthorized = true;
            }
            else {
              this.error = "";
              this.displayDialog = true;
            }
          })
        }
        // console.log(this.subscriber);
      
    } catch (e) {
      console.log(e);
    }

    }else{
      try {
      if (
         
          !this.subscriber.email
        
      ) {
        this.error = "🛑 Veuillez renseigner l'email";
      } else if(!(/^[a-z0-9.-]+@[a-z0-9.-]+\.[a-z]+$/.test(this.subscriber.email))){
        this.error = "❌ Adresse email invalide !";
      } else {
        // this.error = "aucun n'est null";
          this.userService.tchekSubscriber(this.subscriber)
          .subscribe(result => {
            if (result == 0) {
            
                this.displayDialog = true;
                this.error = "❌ Cet email ne correspond pas à aucune inscription !";
             
            }else if(result == 1){
               this.displayDialog = false;
              this.error="";
              Cookie.set("sub",result.toString());
               this.isAuthorized = true;
            }
            else {
              this.error = "";
              this.displayDialog = true;
            }
          })

        }
    } catch (e) {
      console.log(e);
    }


    }

   
  }
}
