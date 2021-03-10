import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursedetailComponent } from './user/coursedetail/coursedetail.component';
import { CourselistComponent } from './user/courselist/courselist.component';
import { HomeComponent } from './user/home/home.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
// {path:"courselist/:categoryId",component:CourselistComponent},
  {path:"courselist",component:CourselistComponent},
  {path:"course",component:CoursedetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
