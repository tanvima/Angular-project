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
import { FeedbackformComponent } from './feedbackform/feedbackform.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { CertificateComponent } from './certificate/certificate.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CartComponent } from './cart/cart.component';
import { MycourseComponent } from './mycourse/mycourse.component';

@NgModule({
  declarations: [HomeComponent, CoursecardComponent, CourselistComponent, CoursedetailComponent, VideolistComponent, VideoplayerComponent, FeedbackformComponent, CertificateComponent, CartComponent, MycourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxInputStarRatingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatRadioModule,
    PdfViewerModule,
  ],
  exports:[HomeComponent,VideoplayerComponent, VideolistComponent,CertificateComponent]
})
export class UserModule { }
