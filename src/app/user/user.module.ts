import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoursecardComponent } from './coursecard/coursecard.component';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CourselistComponent } from './courselist/courselist.component';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursedetailComponent } from './coursedetail/coursedetail.component';
import { VideolistComponent } from './videolist/videolist.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';


@NgModule({
  declarations: [HomeComponent, CoursecardComponent, CourselistComponent, CoursedetailComponent, VideolistComponent, VideoplayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxInputStarRatingModule,
    ReactiveFormsModule
  ],
  exports:[HomeComponent,VideoplayerComponent]
})
export class UserModule { }
