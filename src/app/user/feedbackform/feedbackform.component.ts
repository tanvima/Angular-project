import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';


@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.scss']
})
export class FeedbackformComponent implements OnInit {
  // dialogRef: any;
  form=new FormGroup({
    rating: new FormControl(''),
    feedback: new FormControl(''),
  });

  constructor(private dialogRef:MatDialogRef<FeedbackformComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private us: UserService) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addFeedback() {
    if(this.form.value.rating != null && this.form.value.rating != undefined )
    {

      console.log(this.form.value)
      console.log(",,,,,,,,,,",this.data.userid)
      this.us.addFeedback(this.data.userid,this.data.courseid,this.form.value).subscribe(
        (data)=>{
          console.log("*******");
          console.log(data)
          this.dialogRef.close();
        },(err)=>{
          console.log("sdfadsfd");
          console.log(err);
          
        }
      )

    }
  }
}
