import { Component, OnInit, ViewChild } from '@angular/core';
import { Video } from 'src/app/interface/video';
import { UserService } from '../user.service';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.scss']
})
export class VideoplayerComponent implements OnInit {

  constructor(private us: UserService) { }

  userid=21
  courseid=3
  videoid=8
  src=""
  videolist!: Array<any>;
  status:any
  ngOnInit(): void {

// this.us.getVideoList(this.courseid).subscribe(
//   (data)=>{
//     this.videolist=data
//     console.log("list ",this.videolist)

//     this.videolist.forEach((video,index)=>{

//       if((video.videoId)==this.videoid){
//         this.src="../../../assets/"+video.videoPath
//         console.log(this.src)
//       }

//     })

//   }
// )
console.log("hellllllo")
this.us.getString().subscribe((data)=>{
  this.status=data;
  console.log(data)
  console.log("HAHAHA ",this.status)
})

  }

  @ViewChild('videoplayer') private videoplayer: any;
  toggleVideo() {
      this.videoplayer.nativeElement.play();
      // this.videoplayer.nativeElement.pause();
    }
    onNext(vid:number)
    {
      this.videolist.forEach((video,index)=>{

        //api call
        //complete---videolist
        //just complete----certificarte
        //incomplete
        //if---last video--->  videolist
        //else ---> next video


        if((video.videoId)==vid){

          //api call [next vadi]
          //if status complete----certificate
          //else

          if(index+1==this.videolist.length){
            //LAST VIDEO REDIRECT TO VIDEOLIST


              console.log("last video")
          }

          console.log("Video id: ",this.videolist[index+1].videoId)

          this.src="../../../assets/"+(this.videolist[index+1].videoPath);
          console.log("Next path "+this.src)
        }

      })
      
    }
}
