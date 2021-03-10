import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/interface/course';

@Component({
  selector: 'app-coursecard',
  templateUrl: './coursecard.component.html',
  styleUrls: ['./coursecard.component.scss']
})
export class CoursecardComponent implements OnInit {

  constructor(private router:Router) { }

@Input() mycourse:Course | undefined;

  ngOnInit(): void {
    console.log(this.mycourse);

   console.log("Helllo", this.mycourse?.rating)
    
  }

  gotoCourse(courseId:number){
    this.router.navigate(['/course'],{ queryParams: { courseId: courseId}});
  }

}
