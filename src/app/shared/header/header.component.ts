import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private us: UserService, private router: Router, public dialog: MatDialog) { }
  categories: any
  cartsize!: number
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions?: Observable<string[]>;
  userid = 21
  ngOnInit(): void {

    this.us.getAllCategory().subscribe((data) => {
      if (data != undefined && data != null) {
        this.categories = data;
        console.log("category")
        for (let category of this.categories) {
          console.log("sddddddddddddljknhefoijef")
          for (let course of category.courses) {
            this.options.push(course.courseName)

          }
        }
        /* this.categories.forEach(function (value: Category) {
          value.courses.forEach(function(course:Course){
           console.log("Courses " ,course.courseName)
           
          })
        }); */
      }
    }, (err) => {
      console.log(err);

    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    /* 
       
    for(let category of this.categories){
      console.log("sddddddddddddljknhefoijef")
      for(let course of category.courses){
        this.options.push(course.courseName)
        
      }
    } */
    console.log("OPTIONS", this.options)

    if (this.userid) {
      this.us.getCartCourses(this.userid).subscribe((data) => {
        this.cartsize = data.length
      })
    }

  }
  private _filter(value: string): string[] {
    console.log(value);
    if (value == '') {
      return [];
    }
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }




  AutocompleteArray = [];




  getCategory(categoryId: any, categoryName: any) {
    this.router.navigate(['/courselist'], { queryParams: { categoryId: categoryId, categoryName: categoryName } });
  }
  gotoHome() {
    this.router.navigate(['/home']);
  }

  gotoCart() {
    this.router.navigate(['/cart']);
  }
  gotoMycourse() {
    this.router.navigate(['/mycourse']);
  }

  gotoCourse(coursename: string) {

    for (let category of this.categories) {
      for (let course of category.courses) {
        if (course.courseName === coursename) {
          this.router.navigate(['/course'], { queryParams: { courseId: course.courseId } });
        }
      }
    }



    // let course
    //    for(let category of this.categories){
    //    course = category.courses.find((x:Course)=>{return x.courseName==coursename});


    // } 
    // this.router.navigate(['/course'],{ queryParams: { courseId: course.courseId}});


  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginComponent, {
      // width: '650px',
    })
  }







}
