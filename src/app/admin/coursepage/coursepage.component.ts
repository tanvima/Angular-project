import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.scss']
})
export class CoursepageComponent implements OnInit {
  category: any;
  updateId: any;
  course: Observable<any>
  courseList:any
  courseBYId: any;
  path!: string;
  cId: any;
  particularCat:any;
  selectedCourse: any;
  enroll=0
  @ViewChild('categorynotnull')
  categorynotnull!: ElementRef;

  @ViewChild('confirmation')
  confirmation!: ElementRef;

  @ViewChild('notification')
  notification!:ElementRef;

  constructor(private as: AdminService, private router: Router) {
    this.course = this.as.getCourseList()
    this.course.subscribe(
      (data)=>{
        this.courseList=data
      }
    )
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

    this.selectedCourse=this.courseList.find((c: any) => c.courseId == id)
    if(this.selectedCourse.enrollment.length == 0){
      //confirmation
      this.confirmation.nativeElement.click()
    }
    else{
      //can not delete course
      console.log("enrollment size ",this.selectedCourse.enrollment.length)
      this.enroll = this.selectedCourse.enrollment.length
      this.categorynotnull.nativeElement.click()
    }

    
    // window.location.reload();
    // alert('Course Deleted Sucessfully!!')
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

  confirmDelete(){
    let ob = this.as.deleteCourse(this.selectedCourse.courseId)
    ob.subscribe({
      next: () => {
        console.log('delete');  
        this.notification.nativeElement.click()
        window.location.reload();
        alert('Course Updated Sucessfully!!')
      }
    })
  }
}