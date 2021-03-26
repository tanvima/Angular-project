import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-videopage',
  templateUrl: './videopage.component.html',
  styleUrls: ['./videopage.component.scss']
})
export class VideopageComponent implements OnInit {

  video: Observable<any>
  updateId: any;
  videoById: any;
  path!: string;
  cId: any;
  course:any;
  deleteId:any;

  @ViewChild('confirmation')
  confirmation!: ElementRef;

  @ViewChild('notification')
  notification!:ElementRef;

  constructor(private as: AdminService,private router: Router, private _snackBar: MatSnackBar) {
    this.video = this.as.getVideoList()
    console.log(this.video)

  }
  
  videoUpdateForm = new FormGroup({
    videoName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(50)]),
    videoPath: new FormControl(''),
    videoDesc: new FormControl('', [
      Validators.required,
      Validators.minLength(25),
      Validators.maxLength(3000)
    ])
  })

  ngOnInit() {
    this.as.getCourseList().subscribe(res => {
      this.course = res;
      console.log(this.course)
    })

  }
  dataForUpdateVideo(v: any) {
    this.updateId = v;
    this.videoById = this.as.getVideoById(this.updateId).subscribe(res => {
      this.videoById = res;
      this.videoUpdateForm = new FormGroup({
        videoName: new FormControl(res.videoName, [Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
        videoPath: new FormControl(''),
        videoDesc: new FormControl(res.videoDesc, [
          Validators.required,
          Validators.minLength(25),
          Validators.maxLength(3000)
        ])
      })
      console.log(this.videoById);
    })
    console.log(this.updateId)
  }
  deleteVideos(id: number) {
    this.deleteId=id
    this.confirmation.nativeElement.click()
  }
  updateVideo(id: number) {
    
    this.path = this.videoUpdateForm.value.videoPath
    
    if(this.path==''){
      this.videoUpdateForm.value.videoPath=this.videoById.videoPath
    }else{
      this.videoUpdateForm.value.videoPath = this.path.replace(/^.*\\/, "../../../assets/") 
    }
    this.as.updateVideo(this.updateId, this.videoUpdateForm.value)
      .subscribe({
        next: () => {
          
          this._snackBar.open("Video updated","Dismiss", {
            duration: 7000,
            verticalPosition: 'top'
          });
          this.video = this.as.getVideoList()
        }
      })
     
  }
  getCourseId(cId: any) {
    this.cId = cId;
    console.log(this.cId);
    console.log(cId)
    if(cId=="null"||cId==null||cId=="undefined"){
      console.log("helllo")
      this.video = this.as.getVideoList()
    }else{
      this.video=this.as.getVideoByCourseId(this.cId);
    }
    
  }

  confirmDelete(){
    let ob = this.as.deleteVideo(this.deleteId);
    ob.subscribe({
      next: () => { console.log('delete') 
      this.notification.nativeElement.click()
      this.video=this.as.getVideoList();
    }
    })
    
  }
}

