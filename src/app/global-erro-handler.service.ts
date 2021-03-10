import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErroHandlerService implements ErrorHandler{

  constructor() { }
  handleError(error: Error): void {
    alert("not able to process rquest : "+error.message)
  }
}
