import {Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild} from '@angular/core';
import {School} from '../models/school';
import {BaseService} from '../services/base.service';
import {Constants} from '../app.constants';
import {CountryDropdown} from './dropdowns/dropdown.country';
import {DataTableModule, DialogModule, InputTextareaModule} from 'primeng/primeng';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin-school',
  templateUrl: '../pages/adminSchool.html',
  providers: [BaseService, CountryDropdown]
})
export class AdminSchool implements OnInit, OnDestroy {
 
  public error: String = ''; 
  public msg: String = ''; 
  school: School = new School(); 

  countryDropdown: CountryDropdown; 
  SAVE_LABEL: string = Constants.SAVE_LABEL;  
  COUNTRY: string = Constants.COUNTRY;
  constructor
    (
    private baseService: BaseService,
    private clgDropdown: CountryDropdown,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    this.countryDropdown = clgDropdown;
  }

  ngOnDestroy() {
  }
  ngOnInit() {

  }

  public getAll(): void { 
    this.baseService.getSchool()
      .subscribe((data: School) => this.school = data,
      error => console.log(error),
      () => console.log('Get all Schools complete'));
    console.log(this.school);
  }

  save() {
    try {
      this.error = '';
      this.baseService.saveSchool(this.school)
        .subscribe(result => {
          if (result) {
            this.msg = Constants.saveSuccess; 
            Cookie.set('lmd', this.school.lmdUsed ? '1' : '0');
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

}
