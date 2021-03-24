import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent  {
cId:any;
data:any=null;
category:any;
courseForm!: FormGroup
  path!: string;
   constructor(private as:AdminService,private route:ActivatedRoute,
     private router:Router,) {
   }
   

 ngOnInit(){
   
  this.as.getCategoryList().subscribe(res=>{
          this.category=res;
          console.log(this.category)
        })
        //render through html 
   this.courseForm = new FormGroup({
    courseName: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
    courseLogo: new FormControl('',[Validators.required]),
    courseDesc: new FormControl('', [
        Validators.required, 
        Validators.minLength(10), 
        Validators.maxLength(100)]),
        coursePrice: new FormControl('', [Validators.required]),
        authorName: new FormControl('',[Validators.required])
     
    })
   
  }
  getCategoryId(cId:any){
    this.cId=cId;
    console.log(this.cId);
  }
  addCourse()
  {  
    this.path = this.courseForm.value.courseLogo
    this.courseForm.value.courseLogo = this.path.replace(/^.*\\/, "../../../assets/")
   this.data=this.courseForm.value;
   console.log(this.data)
   console.log(this.cId)
    this.as.addCourse(this.cId,this.data)
    .subscribe({next:() => 
    {
     
    }})
  }
}
