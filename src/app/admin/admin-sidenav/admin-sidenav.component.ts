import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from 'src/app/utilities/authentication.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss']
})
export class AdminSidenavComponent implements OnInit {
  isVisible: boolean=false;
  
  constructor(private authservice:AuthenticationService, private router: Router) { }


// @ViewChild(RouterOutlet) outlet!:RouterOutlet;


  ngOnInit(): void {
  }
   showHide(){
     this.isVisible=!this.isVisible
   }

   logout(){
     alert("sdhgjskdh")
    //  this.outlet.deactivate();
     this.authservice.logout()

    //  this.authservice.updateUserRole(null)
    
    //this.router.navigate(['/app'])


   }
}
