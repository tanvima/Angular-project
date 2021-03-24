import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-errormessage',
  templateUrl: './errormessage.component.html',
  styleUrls: ['./errormessage.component.scss']
})
export class ErrormessageComponent implements OnInit {
datamsg:any
  constructor(private dialogRef:MatDialogRef<ErrormessageComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private ngZone:NgZone) {
    this.datamsg=this.data.errorMessage
    console.log("edsfrsdf"+this.data.errorMessage) 
  }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    // alert("on no click")

    this.ngZone.run(()=>{
      this.dialogRef.close();
      console.log(">>>>>>>");
    })
    // this.dialog.closeAll()
  }
}
