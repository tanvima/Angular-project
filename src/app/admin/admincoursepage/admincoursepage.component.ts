import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admincoursepage',
  templateUrl: './admincoursepage.component.html',
  styleUrls: ['./admincoursepage.component.scss']
})
export class AdmincoursepageComponent implements OnInit {
  categoryById: any;
  cId: any;
  updateId: any;
  category: any;
  path!: string;
  course: any;
  selectedCategory:any
  @ViewChild('categorynotnull')
  categorynotnull!: ElementRef;

  @ViewChild('confirmation')
  confirmation!: ElementRef;

  @ViewChild('notification')
  notification!:ElementRef;
  storingImageUrl: any;

  constructor(private as: AdminService,
    private router: Router) {
    this.as.getCategoryList().subscribe(res => {
      this.category = res;
      console.log(this.category)
    })
  }

  categoryUpdateForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    categoryLogo: new FormControl('', [Validators.required]),
    categoryDesc: new FormControl('', [
      Validators.required,
      Validators.minLength(25),
      Validators.maxLength(3000)
    ])
  })

  ngOnInit() {
    this.as.getCategoryList().subscribe(res => {
      this.category = res;
      console.log(this.category)
    })
  }
  updateCategoryId(upId: any) {
    this.updateId = upId;
    this.categoryById = this.as.getCategoryById(this.updateId).subscribe(res => {
      this.categoryById = res;
      this.categoryUpdateForm = new FormGroup({
        categoryName: new FormControl(res.categoryName, [Validators.required, Validators.maxLength(50)]),
        categoryLogo: new FormControl(res.categoryLogo, [Validators.required]),
        categoryDesc: new FormControl(res.categoryDesc, [
          Validators.required,
          Validators.minLength(25),
          Validators.maxLength(3000)
        ])
      })
      console.log(this.categoryById);
    })
    console.log(this.updateId)
  }
  deleteCategory(id: number) {
    this.cId=id
    this.selectedCategory=this.category.find((c: any) => c.categoryId == id)
    console.log(this.category)
    console.log(this.cId)
    console.log(this.selectedCategory)
    if(this.selectedCategory.courses.length== 0){
      //confirmation model
      console.log("DEle")
      this.confirmation.nativeElement.click()
      //code for delete category
    
  
  }else{
    //courses present in category so you cannot delete category
    this.categorynotnull.nativeElement.click()
  }
    // window.location.reload();
    // alert('Category deleted Sucessfully!!')
  }
  updateCategory(id: number) {
    // this.path = this.categoryUpdateForm.value.categoryLogo
    // this.categoryUpdateForm.value.categoryLogo = this.path.replace(/^.*\\/, "../../../assets/")
    // console.log(this.updateId);
    // console.log(this.categoryUpdateForm.value);

    // this.as.updateCategory(this.updateId, this.categoryUpdateForm.value)
    //   .subscribe({
    //     next: () => {
    //       console.log('update');
    //     }
    //   })
    // window.location.reload();
    // alert('Category Updated Sucessfully!!')

    console.log(this.categoryUpdateForm.value.categoryLogo)
    if(this.categoryUpdateForm.value.categoryLogo==''){
      console.log(this.categoryUpdateForm.value.categoryLogo)   
    this.categoryUpdateForm.value.categoryLogo=this.storingImageUrl;     
    }
   else{
    this.path = this.categoryUpdateForm.value.categoryLogo
    this.categoryUpdateForm.value.categoryLogo = this.path.replace(/^.*\\/, "../../../assets/")
   }
    this.as.updateCategory(this.updateId, this.categoryUpdateForm.value)
      .subscribe({
        next: () => {
          console.log('update');
        }
      })
    window.location.reload();
  }

  confirmdel(){
    let ob = this.as.deleteCategory(this.cId);
    ob.subscribe({
      next: () => {
        console.log('delete')
        this.notification.nativeElement.click()
         window.location.reload();
      }
    })
  }


}