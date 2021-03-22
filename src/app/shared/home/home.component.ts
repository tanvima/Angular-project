import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  categories:any
  popularcourse:any
  slides: any;
  constructor(private us: UserService,public dialog: MatDialog) {
    // this.courses=this.us.getAllCourse();

    this.us.getAllCategory().subscribe((data)=>{
      this.categories=data;
      console.log(this.categories);
    },(err)=>{
      console.log(err);
      
    });

    // this.us.getAllCategory().toPromise().then((data)=>{
    //   this.categories=data;
    //   console.log(data);
    // })

    this.us.getPopularCourse().subscribe((data)=>{
      this.popularcourse=data;
      this.slides = this.chunk(this.popularcourse, 3);
    })
  }
   

  ngOnInit(): void {
  }
  
  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '650px',
    })
  }

}
