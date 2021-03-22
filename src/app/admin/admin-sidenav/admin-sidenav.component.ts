import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {
  isVisible: boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }
   showHide(){
     this.isVisible=!this.isVisible
   }
}
