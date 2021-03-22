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
      console.log(this.blockedUsers)
    })

  }

}
