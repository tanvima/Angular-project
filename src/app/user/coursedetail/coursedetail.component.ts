import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute, private us: UserService,private authservice: AuthenticationService,public dialog: MatDialog) { 
    this.authservice.useridupdate.subscribe((data)=>{
      this.userid=data
    })
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((p) => {
      this.courseid = atob(p['courseId'])
      console.log("course Id ", this.courseid)
      this.us.getCourseById(this.courseid).subscribe((data) => {
        this.course = data
        console.log("COURSE NAME ", this.course.courseName);
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
      name:'Nirav Verma',
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam mollitia at hic nihil ratione excepturi cum maxime id autem veritatis!',
    },
    {
      id: 1,
      nameCredentials: 'DA',
      name:'Darshan Ajudiya',
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam mollitia at hic nihil ratione excepturi cum maxime id autem veritatis!',
    },
    {
      id: 1,
      nameCredentials: 'UG',
      name:'Urvashi Gajjar',
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam mollitia at hic nihil ratione excepturi cum maxime id autem veritatis!',
    },
    {
      id: 1,
      nameCredentials: 'VS',
      name:"Venktesh Soma",
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, temporibus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam mollitia at hic nihil ratione excepturi cum maxime id autem veritatis!',
    },
  ];

  likes: number = 13521


}
