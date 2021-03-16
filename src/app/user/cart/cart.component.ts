import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private us: UserService) { }

  userid:any=21
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
      this.ngOnInit()
      
    })
  }

  enrollAll(){
    this.us.enrollCourse(this.userid).subscribe((data)=>{
      console.log("All added")
      this.ngOnInit()
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