import { Component, OnInit } from '@angular/core';
import { PhotoJpope } from 'app/models/photoJpope';
import { PhotoJpopeService } from 'app/services/photoJpope.service';
import { GalleriaModule } from 'primeng/primeng';
import { CampusImage } from '../models/campusImage';
import { CampusImageService } from '../services/campusImage.service';
@Component({
  moduleId: 'module.id',
  selector: 'app-album-photos-jpope2020',
  templateUrl: '../pages/albumPhotosJpope2020.html'
})

export class AlbumPhotosJpope2020 implements OnInit {

  //images: CampusImage[];
  images: PhotoJpope[];

  constructor
    (
    private campusImageService: CampusImageService,
    private photoJpopeService: PhotoJpopeService
    ) {

  }
  ngOnInit() { 
    /*
    this.campusImageService.getActiveImages()
      .subscribe((data: CampusImage[]) => { 
        this.images=data;
       },
      error => console.log(error),
      () => console.log('Get Active CampusImages complete'));
      */
     this.getBySchoolYear('2021');
  }

  public getBySchoolYear(codeSchoolYear: string) {
    this.images=[];
    this.photoJpopeService.getBySchoolYear(codeSchoolYear)
      .subscribe((data: PhotoJpope[]) => { 
        this.images=data;
       },
      error => console.log(error),
      () => console.log('Get PhotoJpopes complete'));
  }
}
