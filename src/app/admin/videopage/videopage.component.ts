import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

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

  constructor(private as: AdminService,
    private router: Router) {
    this.video = this.as.getVideoList()
    console.log(this.video)

  }
  
  videoUpdateForm = new FormGroup({
    videoName: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    videoPath: new FormControl('', [Validators.required]),
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
        videoName: new FormControl(res.videoName, [Validators.required, Validators.maxLength(3)]),
        videoPath: new FormControl(res.videoPath, [Validators.required]),
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
  deleteVideo(id: number) {
    let ob = this.as.deleteVideo(id);
    ob.subscribe({
      next: () => { console.log('delete') }
    })
    window.location.reload();
    alert('Video Deleted Sucessfully!!')
  }
  updateVideo(id: number) {
    this.path = this.videoUpdateForm.value.videoPath
    this.videoUpdateForm.value.videoPath = this.path.replace(/^.*\\/, "../../../assets/")
    this.as.updateVideo(this.updateId, this.videoUpdateForm.value)
      .subscribe({
        next: () => {
          console.log('update');
          this.video = this.videoUpdateForm.value
        }
      })
      window.location.reload();
    alert('Video Updated Sucessfully!!')
  }
  getCourseId(cId: any) {
    this.cId = cId;
    console.log(this.cId);
    console.log(cId)
    this.video=this.as.getVideoByCourseId(this.cId);
  }
}

