import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ui';
  userrole!:any
constructor(){
  this.userrole = sessionStorage.getItem("userrole");
}

}
