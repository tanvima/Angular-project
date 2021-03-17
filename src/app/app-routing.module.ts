import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { CartComponent } from './user/cart/cart.component';
import { CertificateComponent } from './user/certificate/certificate.component';
import { CoursedetailComponent } from './user/coursedetail/coursedetail.component';
import { CourselistComponent } from './user/courselist/courselist.component';
import { HomeComponent } from './user/home/home.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
