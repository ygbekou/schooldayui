import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Video } from '../models/video';
import { VideoService } from '../services/video.service';
import { Constants } from '../app.constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-video-list',
  templateUrl: '../pages/videoList.html',
  providers: [VideoService, Constants]
})
export class VideoList implements OnInit {

  videos: Video[] = [];
  activeVideo: Video = new Video();
  constructor
    (private domSanitizer: DomSanitizer,
    private videoService: VideoService,
    private Constants: Constants, private changeDetectorRef: ChangeDetectorRef
    ) {
    console.log("Video constructor called: " + this.videos);
    this.videoService.getFirstVideo()
      .subscribe((data: Video) => this.activeVideo = data,
      error => console.log(error),
      () => console.log('Get all First Videos complete'));
  /**  if (this.activeVideo == null || this.activeVideo.link == null) {
      this.activeVideo = new Video();
      this.activeVideo.description="Jan 4, 2017, 3:00:00 AM : Vous souhaitez faire carrière en informatique, étudier l'informatique à l’université ou dans un centre de formation professionnelle ? Cette vidéo est alors faite pour vous.";
      this.activeVideo.link = 'hMXaOML3s74';
    }
*/
  }

  ngOnInit() {
     this.videos = [];
  }

  public getActiveVideos() {
    
    if (this.videos.length <= 0) {
      this.videoService.getActiveVideos()
        .subscribe((data: Video[]) => this.videos = data,
        error => console.log(error),
        () => console.log('Get all Active Videos complete'));
      
      console.log("Video Init called: " + this.videos);
      this.changeDetectorRef.detectChanges();
    }
  }


  public sanitize(url): SafeResourceUrl {
    if (url != null) { 
      return this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+url+"?autoplay=0");
    } else {
      return null;
    }
  }
}
