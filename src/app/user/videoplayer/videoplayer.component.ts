import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/utilities/authentication.service';
import { FeedbackformComponent } from '../feedbackform/feedbackform.component';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {

  constructor(private us: UserService, private activatedRoute: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog, private authservice: AuthenticationService) {
    this.authservice.useridupdate.subscribe((data) => {
      this.userid = data
    })
  }

  userid!: Observable<any>
  courseid!: any
  videoid!: number;
  src = ""
  videolist!: Array<any>;
  status!: string
  nextButton: any = "Next"
  durationInSeconds = 5;
  videotitle!: string
  flagfornext!: boolean

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid = p['courseId']
      this.videoid = p['videoId']


    })


    this.us.getVideoList(this.courseid).subscribe(
      (data) => {
        this.videolist = data
        console.log("Video",this.videolist)
        this.videolist.forEach((video, index) => {

          if ((video.videoId) == this.videoid) {
            this.src = video.videoPath
            console.log("SRc "+ this.src)
            this.videotitle = video.videoName

          }

        })

      }
    )



  }

  // @ViewChild('videoplayer') private videoplayer: any;
  // toggleVideo() {
  //     this.videoplayer.nativeElement.play();
  //     // this.videoplayer.nativeElement.pause();
  //   }
  onNext(vid: number) {

    this.us.updateVideoStatus(this.courseid, this.userid, vid).subscribe(
      (data) => {
        this.status = data.msg
        console.log("STATUS", this.status)
        console.log(typeof (this.status))

        this.videolist.forEach((video, index) => {


          //api call
          //complete---videolist
          //just complete----certificarte
          //incomplete
          //if---last video--->  videolist
          //else ---> next video


          if ((video.videoId) == vid) {

            //api call [next vadi]
            //if status complete----certificate
            //else      

            if (this.status == "complete") {
              this.nextButton = "Back to Video List";
              this.flagfornext = false

              this.router.navigate(['/videolist'], { queryParams: { courseId: this.courseid } });

            }
            else if (this.status == "certificate") {

              this.dialog.open(FeedbackformComponent, {
                width: '650px',
                data: { courseid: this.courseid, userid: this.userid }
              })

             
              this.nextButton = null
             


               this._snackBar.open("Course completed!","Dismiss", {
                duration: 7000,
              });
            }
            else if (this.status == "incomplete") {


              console.log("in incomplete")
              if (index + 1 == this.videolist.length) {
                //LAST VIDEO REDIRECT TO VIDEOLIST
                this.nextButton = "Back to Video List"
                this.flagfornext = false
                alert("last video...videolist")
                this.router.navigate(['/videolist'],{ queryParams: { courseId: this.courseid}});

                console.log("last video")
              }

              console.log("Video id: ", this.videolist[index + 1].videoId)
              this.nextButton = "Next Video"
              this.flagfornext = true
             
              this.src = (this.videolist[index + 1].videoPath);
              this.videotitle = video.videoName
              this.videoid = this.videolist[index + 1].videoId
              console.log("Next path " + this.src)

            }
            else {
              console.log("here2");
           
            }
          }
        })

      }
    )
  }

  onBack() {
    this.router.navigate(['/videolist'], { queryParams: { courseId: this.courseid } });
  }

  gotoCertificate() {

    //certificate pdf generation api
    this.router.navigate(['/certificate'], { queryParams: { courseId: this.courseid } });

  }



}
