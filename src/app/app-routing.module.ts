import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './user/cart/cart.component';
import { CertificateComponent } from './user/certificate/certificate.component';
import { CoursedetailComponent } from './user/coursedetail/coursedetail.component';
import { CourselistComponent } from './user/courselist/courselist.component';
import { HomeComponent } from './user/home/home.component';
import { MycourseComponent } from './user/mycourse/mycourse.component';
import { VideolistComponent } from './user/videolist/videolist.component';
import { VideoplayerComponent } from './user/videoplayer/videoplayer.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
// {path:"courselist/:categoryId",component:CourselistComponent},
  {path:"courselist",component:CourselistComponent},
  {path:"course",component:CoursedetailComponent},
  {path:"videoplayer",component:VideoplayerComponent},
  {path:"videolist",component:VideolistComponent},
  {path:"certificate",component:CertificateComponent},
  {path:"cart",component:CartComponent},
  {path:"mycourse",component:MycourseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
