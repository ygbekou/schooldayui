import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AdminEvent } from '../adminEvent';
import { AdminVideo } from '../adminVideo';
import { AdminNews } from '../adminNews';
import { AdminConfiguration } from '../adminConfiguration';
import { AdminCampusImage } from '../adminCampusImage';
import { AdminPosition } from '../adminPosition';
import { AdminFaq } from '../adminFaq';
import { User } from '../../models/User';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Constants } from '../../app.constants';
import { AdminAlbumPhotosJpope } from '../adminAlbumPhotosJpope';


@Component({
  selector: 'app-secretaire-information',
  templateUrl: '../../pages/secretaire/secretaireInformation.html'
})
export class SecretaireInformation implements OnInit {

  @ViewChild(AdminEvent) adminEvent: AdminEvent;
  @ViewChild(AdminVideo) adminVideo: AdminVideo;
  @ViewChild(AdminNews) adminNews: AdminNews;
  @ViewChild(AdminCampusImage) adminCampusImage: AdminCampusImage;
  @ViewChild(AdminAlbumPhotosJpope) adminAlbumPhotosJpope: AdminAlbumPhotosJpope; 
   @ViewChild(AdminFaq) adminFaq: AdminFaq;
  currentUser: User = JSON.parse(atob(Cookie.get('user'))); 

  NEWS: string = Constants.NEWS;
  EVENTS: string = Constants.EVENTS;
  VIDEOS: string = Constants.VIDEOS;
  CONFIGURATION: string = Constants.CONFIGURATION;
  CAMPUS_IMAGE: string = Constants.CAMPUS_IMAGE;
  POSITION: string = Constants.POSITION;
  FAQ: string = Constants.FAQ;
  EMAIL_SMS:string=Constants.EMAIL_SMS;
  PHOTO_JPOPE:string=Constants.PHOTO_JPOPE;

  constructor() {

  }
  ngOnInit() {
   if(this.currentUser==null){
    this.currentUser= new User();
   }
    this.adminNews.getAll();
  }

  onTabChange(evt) {
    if (evt.index === 1) {
      //load news
      this.adminNews.getAll();
    } else if (evt.index === 2) {
      //load all events
      this.adminEvent.getAll();
      //this.adminNews.ngOnDestroy();
    } else if (evt.index === 3) {
      //load videos
      this.adminVideo.getAll();
      //this.adminNews.ngOnDestroy();
    } else if (evt.index === 4) {
      //load configurations
      this.adminCampusImage.getAll();
      //this.adminNews.ngOnDestroy();
    }  else if (evt.index === 5) {
      //load configurations
      this.adminAlbumPhotosJpope.getAll();      
      //this.adminNews.ngOnDestroy();
    } else if (evt.index === 6) { 
      //load configurations
      this.adminFaq.getAll();
      //this.adminNews.ngOnDestroy();
    }
  }
}
