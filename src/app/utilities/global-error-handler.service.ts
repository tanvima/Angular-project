import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrormessageComponent } from '../shared/errormessage/errormessage.component';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(public dialog: MatDialog) { }
  handleError(error: Error): void {
    //throw new Error('Method not implemented.');

    // alert("message "+error.message)
    this.dialog.open(ErrormessageComponent, {
      width: '550px',
      data: { errorMessage:"Message "+error.message}
    })
  }
}
