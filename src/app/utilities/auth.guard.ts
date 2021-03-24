import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../shared/login/login.component';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userrole!:String
  constructor(private router:Router,private auths :AuthenticationService,public dialog: MatDialog){
    this.auths.userrole.subscribe(ur =>{
      this.userrole=ur
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.auths.isLoggedIn()){
        console.log("IN AUTH LOGGED IN")
        if(route.data.role && route.data.role!=(this.userrole)){
          console.log("IN AUTH LOGGED IN ADN ROLE NOT MATCH")
          this.router.navigate(['/home'])
          return false
        }
        return true
      }else{
        console.log("NOT LOGGED IN ")
          const dialogRef = this.dialog.open(LoginComponent, {
            // width: '650px',
          })
        return false
      }
    
  }
  
}
