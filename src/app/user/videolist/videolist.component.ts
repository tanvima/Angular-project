import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interface/course';
import { AuthenticationService } from 'src/app/utilities/authentication.service';
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
  userid!:Observable<any>
  constructor(private us: UserService, private router: Router, private activatedRoute : ActivatedRoute, private authservice:AuthenticationService) {  
    this.authservice.useridupdate.subscribe((data)=>{
    this.userid=data
  })}

  ngOnInit(): void {


    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid =Number( atob(p['courseId']))
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

  gotoVideoPlayer(videoId:any,courseId:any){
    console.log("--------",this.course.courseName)
    this.router.navigate(['/videoplayer'],{ queryParams: { courseId: btoa(courseId),videoId:btoa(videoId),courseName:btoa(this.course.courseName)}});
  }

  
}
