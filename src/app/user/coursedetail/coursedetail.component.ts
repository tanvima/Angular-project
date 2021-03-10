import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss']
})
export class CoursedetailComponent implements OnInit {
  courseid: any
  course: any
  constructor(private activatedRoute: ActivatedRoute, private us: UserService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid = p['courseId']
      console.log("course Id ", this.courseid)
      this.us.getCourseById(this.courseid).subscribe((data) => {
        this.course = data
        console.log("COURSE NAME ", this.course.courseName);
      })

    })

  }



  
  comments: any[] = [
    {
      comment: 'this course is helpful!'
    },
    {
      comment: 'gained knowledge from this course!'
    },
    {
      comment: 'skills improved!'
    }
  ]
  likes: number = 13521


}
