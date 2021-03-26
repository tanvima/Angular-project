import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.scss']
})
export class AddvideoComponent implements OnInit {
  cId:any;
  catId:any;
  data:any ;
  category:any;
  course:any;
 videoForm!: FormGroup
  path!: string;
  constructor(private as:AdminService,private route:ActivatedRoute,
    private router:Router) {
     // this.cId = this.route.snapshot.paramMap.get("v"); 
    }
ngOnInit(){
  this.as.getCategoryList().subscribe(res=>{
    this.category=res;
    console.log(this.category)
  }) 
  // this.as.getCourseList().subscribe(res=>{
  //   this.course=res;
  //   console.log(this.course)
  // }) 
  this.videoForm = new FormGroup({
  videoName: new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(15)]),
 
   videoDesc: new FormControl('', [
       Validators.required, 
       Validators.minLength(10), 
       Validators.maxLength(100),
       
     ]),
     videoPath: new FormControl('',[Validators.required])
   })
 }
 getCategoryId(catId:any){
  let c= this.category.find((cat:any)=>(cat.categoryId==catId))
  console.log(c)  
  this.course = c.courses
  console.log("ccourse ",c.courses)
  this.catId=catId;
  console.log(this.catId);
}
getCourseId(cId:any){
  this.cId=cId;
  console.log(this.cId);
}
  onSubmit()
  { 
    this.path = this. videoForm.value.videoPath
    this. videoForm.value.videoPath = this.path.replace(/^.*\\/, "../../../assets/")
    console.log("ADD VIDEO"+this.videoForm.value)
    this.data=this.videoForm.value;
    console.log(this.data)
    this.as.addVideo(this.cId,this.data)
    .subscribe({next:() => 
    {
      console.log('');
    }})
  }
}

