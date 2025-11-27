import { BaseService } from 'app/services';
import { User } from 'app/models/User';
import { Component, OnInit } from '@angular/core';
import { AiRegisterService } from 'app/services/airegistration.service';
import { AiRegister } from 'app/models/aiRegister';
import { Constants } from 'app/app.constants';
import { Message } from 'primeng/primeng';
import { Router } from '@angular/router';
import { Country } from 'app/models/country';

@Component({
  selector: 'app-ai-registration',
  templateUrl: '../pages/ai-registration.component.html'
})
export class AiRegistrationComponent implements OnInit {
  public error: String = '';
  public success: String = '';
  user: User;
  aiRegister: AiRegister;
  activeIndex;
  countries: Country[];
  filteredCountries: Country[];
  msgs: Message[] = [];
  constructor(private baseService: BaseService, private aiRegisterService: AiRegisterService, private router: Router) { 
    this.user = new User();
    this.aiRegister = new AiRegister();
    
  }

  ngOnInit() {
    this.getAllCountries();
  }

  private getAllCountries(): void {
    this.baseService.getAllCountries()
      .subscribe((data: Country[]) => this.countries = data,
      error => console.log(error),
      () => console.log('Get All Countries Complete'));
  }

  saveUser(){
    //this.msgs.push({ severity: 'success', summary: 'success', detail: 'Votre inscription a été prise en compte '});
    if (this.aiRegister.firstName == null || this.aiRegister.email == null ||
      this.aiRegister.lastName == null || this.aiRegister.phone == null || this.aiRegister.cityResidence == null
      || this.aiRegister.cityResidence == null) {
      this.error = Constants.REQUIRED_FIELD_MISSING;
      return;
    }
    try {
      this.error = '';
      this.success = '';
      console.log(this.aiRegister);
      this.aiRegisterService.save(this.aiRegister)
        .subscribe(result => {
          if (result.id > 0) {
            //this.aiRegister = result;
            this.aiRegister = new AiRegister();
            this.msgs.push({ severity: 'success', summary: 'success', detail: 'Votre inscription a été prise en compte '});
            //this.router.navigateByUrl('/')
            //this.router.navigate([''])
            //this.success = Constants.saveSuccess;
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

  filterCountry(event) {
    let query = event.query;
    this.filteredCountries = [];
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        this.filteredCountries.push(country);
      }
    }
  }

  handleDropdownClick(evt) {
    //this.filteredCountries = [];
    setTimeout(() => {
      this.filteredCountries = this.countries;
    }, 100)
  }

}
