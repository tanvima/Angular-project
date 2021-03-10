import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  categories:any
  popularcourse:any
  constructor(private us: UserService) {
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
    })
   }

  ngOnInit(): void {
  }
  



}
