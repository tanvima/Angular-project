import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { AdmincoursepageComponent } from './admincoursepage/admincoursepage.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { UnblockuserComponent } from './unblockuser/unblockuser.component';
import { VideopageComponent } from './videopage/videopage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AppRoutingModule } from '../app-routing.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AddcategoryComponent, AddcourseComponent, AddvideoComponent, AdminSidenavComponent, AdmincoursepageComponent, CoursepageComponent, UnblockuserComponent, VideopageComponent, AdminhomeComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    ChartsModule
  ],
  exports:[AdminSidenavComponent]
})
export class AdminModule { }
