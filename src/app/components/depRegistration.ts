import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Invoice} from "../models/invoice";
import { ConcoursData } from './concoursData';
import { RegistrationRequestData } from './registrationRequestData';


@Component({
    selector: 'app-dep-registration',
    templateUrl: '../pages/depRegistration.html',
    providers: []
})
export class DepRegistration implements OnInit {

    @ViewChild(ConcoursData) concoursData: ConcoursData;
    @ViewChild(RegistrationRequestData) registrationRequestData: RegistrationRequestData;

    public activeTab = 0;
    currentUser: User;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }
    ngOnInit() {

        this.concoursData.getAll();
        this.registrationRequestData.getAll();
       

        this.currentUser= JSON.parse(atob(Cookie.get('user')));
        if (this.currentUser == null) {
            this.currentUser = new User();
        }
    }

    onTabChange(evt) {
        console.log(evt);
        if (evt.index == 0) {
          this.concoursData.getAll();
        } else if (evt.index == 1) {
          this.registrationRequestData.getAll();
        } 
    }


}
