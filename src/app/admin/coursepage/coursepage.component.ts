import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.scss']
})
export class CoursepageComponent implements OnInit {
  category: any;
  updateId: any;
  course: Observable<any>
  courseBYId: any;
  path!: string;
  cId: any;
  particularCat:any;
  constructor(private as: AdminService, private router: Router) {
    this.course = this.as.getCourseList()
  }
  courseUpdateForm!: FormGroup
  ngOnInit() {
    this.as.getCategoryList().subscribe(res => {
      this.category = res;
      console.log(this.category)
    })
    this.courseUpdateForm = new FormGroup({
      courseName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
      courseLogo: new FormControl('', [Validators.required]),
      courseDesc: new FormControl('', [
        Validators.required,
        Validators.minLength(25),
        Validators.maxLength(3000)
      ]),
      coursePrice: new FormControl('', [Validators.required]),
      noOfVideo: new FormControl('', [Validators.required]),
    })
  }
  updateCourseId(upId: any) {
    this.updateId = upId;
    this.courseBYId = this.as.getCourseBYId(this.updateId).subscribe(res => {
      this.courseBYId = res;
      console.log(this.courseBYId);
      this.courseUpdateForm = new FormGroup({
        courseName: new FormControl(res.courseName, [Validators.required, Validators.maxLength(3)]),
        courseLogo: new FormControl(res.courseLogo, [Validators.required]),
        courseDesc: new FormControl(res.courseDesc, [
          Validators.required,
          Validators.minLength(25),
          Validators.maxLength(3000)
        ]),
        coursePrice: new FormControl(res.coursePrice, [Validators.required]),
        noOfVideo: new FormControl(res.noOfVideo, [Validators.required]),
      })

    })
    console.log(this.updateId)
  }
  deleteCourse(id: number) {
    let ob = this.as.deleteCourse(id)
    ob.subscribe({
      next: () => {
        console.log('delete');  
      }
    })
    window.location.reload();
    alert('Course Deleted Sucessfully!!')
  }
  updateCourse(id: number) {
    this.path = this.courseUpdateForm.value.courseLogo
    this.courseUpdateForm.value.courseLogo = this.path.replace(/^.*\\/, "../../../assets/")
    this.as.updateCourse(this.updateId, this.courseUpdateForm.value)
      .subscribe({
        next: () => {
          console.log('update');
          this.course = this.courseUpdateForm.value
         
        }
      })
      window.location.reload();
    alert('Course Updated Sucessfully!!')
  }
  addVideo() {
    this.router.navigate(['add-video']);
  }
  getCategoryId(cId: any) {
    this.cId = cId;
    console.log(this.cId);
    console.log(cId)
    this.course=this.as.getCourseByCatId(this.cId);
  }
}