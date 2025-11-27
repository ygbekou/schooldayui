import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Parent } from '../models/parent';
import { User } from '../models/User';
import { ParentService } from '../services/parent.service';
import { Constants } from '../app.constants';
import { DataTableModule, DialogModule, InputTextareaModule } from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({ 
  selector: 'app-manage-parent',
  templateUrl: '../pages/manageParent.html',
  providers: []
})
export class ManageParent implements OnInit {

  public error: String = '';
  public success : String = '';

  @Input() user: User;
  public parent: Parent;
  
  ACTIF: string = Constants.ACTIF;
  INACTIF: string = Constants.INACTIF;
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;

  currentUser: User = JSON.parse(atob(Cookie.get('user')));

  constructor ( private parentService: ParentService,
  private changeDetectorRef : ChangeDetectorRef) 
  {
    this.parent = new Parent();
    this.parent.user = new User();
  }
  
  ngOnInit() {
  } 
  
  setParent(user : User) {
     this.parentService.getByUser(user)
      .subscribe((data: Parent) => {
        
        this.parent = data
        this.parent.user = user;
      },
      error => console.log(error),
      () => console.log('Get parent complete'));
     
  }
  
  save() {
    try {
        this.error = '';
        this.success = '';
        this.parentService.save(this.parent)
        .subscribe(result => {
          if (result.id > 0) {            
            this.parent = result;
            this.success = Constants.saveSuccess;
          }
          else {
            this.error = Constants.saveFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }


  }

  delete() {
   try {
          this.error = '';
          this.success = '';
          this.parentService.delete(this.parent).subscribe(result => {
          if (result) { 
            this.success = Constants.deleteSuccess;
          }
          else {
            this.error = Constants.deleteFailed;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
}
