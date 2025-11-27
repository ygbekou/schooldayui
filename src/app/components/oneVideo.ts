import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideoService } from '../services/video.service';
import { Constants } from '../app.constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({ 
  selector: 'app-one-video',
  templateUrl: '../pages/oneVideo.html',
  providers: [VideoService, Constants]
})
export class OneVideo implements OnInit {

  activeVideo: Video = new Video();
  constructor
    (private domSanitizer: DomSanitizer,
    private videoService: VideoService,
    private Constants: Constants,private changeDetectorRef : ChangeDetectorRef
    ) {
    this.videoService.getFirstVideo()
      .subscribe((data: Video) => this.activeVideo = data,
      error => console.log(error),
      () => console.log('Get First Videos complete'));
    if(this.activeVideo==null||this.activeVideo.link ==null){
      this.activeVideo=new Video();
      this.activeVideo.link='hMXaOML3s74';
    } 
  }

  ngOnInit() {

      this.changeDetectorRef.detectChanges();
  }

  

  public sanitize(url): SafeResourceUrl {
    if (url != null) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+url);
    } else {
      return null;
    }
  }

}
