import { Component, OnInit, OnDestroy } from '@angular/core';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { User } from '../models/User';
import { CourseService } from '../services/course.service';
import { BaseService } from '../services/base.service';
import { School } from '../models/school';


@Component({
  selector: 'app-admin-demand',
  templateUrl: '../pages/adminDemand.html',
  providers: [CourseService, BaseService]
})
export class AdminDemand implements OnInit, OnDestroy {
  currentUser: User;
  roles: any[] = [];
  schools: School[] = [];
  filteredSchools: School[];
  REGISTRATION_REQUEST: string = Constants.REGISTRATION_REQUEST;
  ADD_USER: string = Constants.ADD_USER;
  SUBJECTS_INFORMATION: string = Constants.SUBJECTS_INFORMATION;
  selectedSchool: School;


  constructor
    (
      private schoolService: BaseService
    ) {
  }

  ngOnDestroy() {
  }
  ngOnInit() {
    this.currentUser = JSON.parse(atob(Cookie.get('user')));

    if (this.currentUser == null) {
      this.currentUser = new User();
    }
    

    let selectedSchool: School = JSON.parse(atob(Cookie.get('school'))) as School; 
    this.selectedSchool = new School()
    this.selectedSchool.id = selectedSchool.id
    console.log('school', this.selectedSchool)

    this.loadSchools();

  }

  loadSchools() {
  this.schoolService.getAllSchools().subscribe(
    data => {
      this.schools = data;
      console.log("Liste des écoles :", this.schools);
      for (let i = 0; i < this.schools.length; i++) {
      const school = this.schools[i];
      if (school.id=this.selectedSchool.id){
        console.log('schoolId', school.id)
        this.selectedSchool=school;
      }
    }
    },
    error => {
      console.error("Erreur lors du chargement des écoles", error);
    }
  );
}

//Cookie.set("school", btoa(JSON.stringify(JSON.stringify(data))));

schoolSelected(event) {
    console.log('event',  event)
    Cookie.set("school", btoa(JSON.stringify(JSON.stringify(event))));

  }
filterSchool(event) {
    const query = event.query;
    this.filteredSchools = [];
    for (let i = 0; i < this.schools.length; i++) {
      const school = this.schools[i];
      if (school.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        this.filteredSchools.push(school);
      }
    }
  }

  handleDropdownClick() {
    // this.filteredCountries = [];
    setTimeout(() => {
      this.filteredSchools = this.schools;
    }, 100);
  }

}
