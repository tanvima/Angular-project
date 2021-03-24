import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-unblockuser',
  templateUrl: './unblockuser.component.html',
  styleUrls: ['./unblockuser.component.scss']
})
export class UnblockuserComponent implements OnInit {

  blockedUsers:any;
  headers=["Sr. No","Name", "Email"];
  no_of_attempts:number=0;
  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.as.getAllBlockUser().subscribe(res => {
      this.blockedUsers = res;
      console.log(this.blockedUsers)
    })

  }
  getAllBlockUser(){
    this.as.getAllBlockUser().subscribe(res => {
      this.blockedUsers = res;
      //console.log(this.blockedUsers);
      //console.log(this.blockedUsers[0]["id"]);
    })

  }

  onUnblock(id:number)
  {
    console.log(id);
   
    this.as.unblockUser(id)
    .subscribe({
      next: () => {
        console.log('update');
        this.blockedUsers=this.no_of_attempts     
       
      }
    })
  //  window.location.reload();
  }


}
