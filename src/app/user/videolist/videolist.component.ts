import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/interface/course';
import { UserService } from '../user.service';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.scss']
})
export class VideolistComponent implements OnInit {

  courseid!:number
  course!: Course; 
  videostatus:any
  userid=21
  constructor(private us: UserService, private router: Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {


    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid = p['courseId']
      console.log("course Id ", this.courseid)
    }) 

    this.us.getCourseById(this.courseid).subscribe(
      (data)=>{
            this.course=data
            console.log(this.course)
      }
    )

      this.us.getVideoStatus(this.courseid,this.userid).subscribe(
        (data)=>{
          this.videostatus=data
        }
      )

  }

  gotoVideoPlayer(videoId:number,courseId:number){
    this.router.navigate(['/videoplayer'],{ queryParams: { courseId: courseId,videoId:videoId}});
  }

  
}
