import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/shared/login/login.component';
import { AuthenticationService } from 'src/app/utilities/authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-coursedetail',
  templateUrl: './coursedetail.component.html',
  styleUrls: ['./coursedetail.component.scss']
})
export class CoursedetailComponent implements OnInit {
  courseid: any
  course: any
  userid!:Observable<any>
  noOfLike=0
  noOfComment=0
  src="../../../assets/"
  constructor(private activatedRoute: ActivatedRoute, private us: UserService,private authservice: AuthenticationService,public dialog: MatDialog,private router:Router) { 
    this.authservice.useridupdate.subscribe((data)=>{
      this.userid=data
    })
  }

  inCart=false
  isEnrolled=false

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid = atob(p['courseId'])
      console.log("course Id ", this.courseid)
      this.us.getCourseById(this.courseid).subscribe((data) => {
        this.course = data
        if(this.authservice.isLoggedIn()){
          if(this.course.cart.find((cart: any) => cart.userId == this.userid)){
            this.inCart=true
          }else if (this.course.enrollment.find((enroll: any) => enroll.user == this.userid)){
            this.isEnrolled=true
          }
        }
        console.log("COURSE NAME ", this.course);
        this.course.like.forEach((likes:any) => {
          if(likes.status=='like'){
            this.noOfLike++
          }
        });
        this.noOfComment=this.course.comment.length
      })

    })

    

  }

  addtoCart(){

    if(this.authservice.isLoggedIn()){

      console.log(this.userid)
      this.us.addToCart(this.courseid, this.userid).subscribe((data)=>{
        this.authservice.updateCartSizeData()
        console.log("item added")
        this.ngOnInit()
      })
    }else{
      const dialogRef = this.dialog.open(LoginComponent, {
        // width: '650px',
      })
    }

   
    }
  
    gotoMyCourse(){
      this.router.navigate(['/mycourse'])
    }

  Dummylist = [
    {
      id: 1,
      imgSrc:
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 2,
      imgSrc:
        'https://images.unsplash.com/photo-1606765962208-62a3c676bf38?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjN8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 3,
      imgSrc:
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 4,
      imgSrc:
        'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGElMjBzY2llbmNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];


  
  DummyCommentList = [
    {
      id: 1,
      nameCredentials: 'NV',
    },
    {
      id: 1,
      nameCredentials: 'DA',
    },
    {
      id: 1,
      nameCredentials: 'UG',
     },
    {
      id: 1,
      nameCredentials: 'VS',
      },
      {
        id: 1,
        nameCredentials: 'NV',
      },
      {
        id: 1,
        nameCredentials: 'DA',
      },
      {
        id: 1,
        nameCredentials: 'UG',
       },
      {
        id: 1,
        nameCredentials: 'VS',
        },
  ];

 


}
