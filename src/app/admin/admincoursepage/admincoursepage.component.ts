import { Component, OnInit } from '@angular/core';
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

    let ob = this.as.deleteCategory(id);
    ob.subscribe({
      next: () => {
        console.log('delete')
      }
    })
    window.location.reload();
    alert('Category deleted Sucessfully!!')
  }
  updateCategory(id: number) {
    this.path = this.categoryUpdateForm.value.categoryLogo
    this.categoryUpdateForm.value.categoryLogo = this.path.replace(/^.*\\/, "../../../assets/")
    console.log(this.updateId);
    console.log(this.categoryUpdateForm.value);

    this.as.updateCategory(this.updateId, this.categoryUpdateForm.value)
      .subscribe({
        next: () => {
          console.log('update');
        }
      })
    window.location.reload();
    alert('Category Updated Sucessfully!!')
  }


}