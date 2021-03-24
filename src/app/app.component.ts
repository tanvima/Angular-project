import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './utilities/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ui';
  userrole!:Observable<any>
  userroleString:any
constructor(private authservice: AuthenticationService){
  //this.userroleString = sessionStorage.getItem("userrole");
 
  // this.authservice.userroleupdate.subscribe((data)=>{
  //   this.userrole=data
  //   console.log("ROLE ",this.userrole)
  //   this.userroleString=data.value
  //   console.log("ROLES ",this.userroleString)
  // })
}
ngOnInit(){
this.authservice.userroleupdate.subscribe((data)=>{
    this.userrole=data
    // if(data=="ROLE_admin"){
    //   this.userroleString=true;
    // }
    //console.log("ROLE ",this.userrole)

    this.userroleString=data
    console.log("ROLES............. ",this.userroleString)
  })
}

}
