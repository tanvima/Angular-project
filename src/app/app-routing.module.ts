import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { AddcourseComponent } from './admin/addcourse/addcourse.component';
import { AddvideoComponent } from './admin/addvideo/addvideo.component';
import { AdmincoursepageComponent } from './admin/admincoursepage/admincoursepage.component';
import { UnblockuserComponent } from './admin/unblockuser/unblockuser.component';
import { VideopageComponent } from './admin/videopage/videopage.component';
import { CoursepageComponent } from './coursepage/coursepage.component';
import { LoginComponent } from './shared/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { CertificateComponent } from './user/certificate/certificate.component';
import { CoursedetailComponent } from './user/coursedetail/coursedetail.component';
import { CourselistComponent } from './user/courselist/courselist.component';
import { HomeComponent } from './shared/home/home.component';
import { MycourseComponent } from './user/mycourse/mycourse.component';
import { VideolistComponent } from './user/videolist/videolist.component';
import { VideoplayerComponent } from './user/videoplayer/videoplayer.component';
import { AuthGuard } from './utilities/auth.guard';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"",component:HomeComponent},
// {path:"courselist/:categoryId",component:CourselistComponent},
  {path:"courselist",component:CourselistComponent},
  {path:"course",component:CoursedetailComponent},


  {path:"videoplayer",component:VideoplayerComponent,
  data:{role:'ROLE_user'},
  canActivate:[AuthGuard]    
},
  {path:"videolist",component:VideolistComponent,
  data:{role:'ROLE_user'},
  canActivate:[AuthGuard]  
},
  {path:"certificate",component:CertificateComponent,
  data:{role:'ROLE_user'},
  canActivate:[AuthGuard]
},
  {path:"cart",component:CartComponent,
  data:{role:'ROLE_user'},
  canActivate:[AuthGuard]
},
  {path:"mycourse",component:MycourseComponent,
  data:{role:'ROLE_user'},
  canActivate:[AuthGuard]
},
{path:"login",component:LoginComponent},
{path:'category-list',component:AdmincoursepageComponent},
                        {path:"add-category",component:AddcategoryComponent},     
                        {path:"add-course",component:AddcourseComponent},
                        {path:"course-list",component:CoursepageComponent},
                        {path:"add-video",component:AddvideoComponent},
                        {path:"video-list",component:VideopageComponent},
                        {path:"unblock-user",component:UnblockuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
