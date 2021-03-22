import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/utilities/authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private us: UserService, private authservice: AuthenticationService,private route:Router) { 
    this.authservice.useridupdate.subscribe((data)=>{
      this.userid=data
    })
  }

  userid!:Observable<any>
  course:any
  ngOnInit(): void {
    this.us.getCartCourses(this.userid).subscribe(
      (data)=>{
        this.course = data
        console.log("course",this.course)
      }
    )
  }

  removeFromCart(courseid:any){
    this.us.removeFromCart(courseid,this.userid).subscribe((data)=>{
      console.log("removed succesfully");
      this.authservice.updateCartSizeData()
      this.ngOnInit()
      
    })
  }

  enrollAll(){
    this.us.enrollCourse(this.userid).subscribe((data)=>{
      console.log("All added")
      this.authservice.updateCartSizeData()
      this.route.navigate(['/mycourse'])
    })
  }

 /*  course:any[]=[
    {
      imageSrc:'assets/ai.png',
      title:'Artificial intelligence',
      description:'Artificial intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions.',
      duration:'30 minutes'
    },
    {
      imageSrc:'assets/java.png',
      title:'Java',
      description:'Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
      duration:'30 minutes'
    }
  ] */

}
