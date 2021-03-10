import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { GlobalErroHandlerService } from './global-erro-handler.service';
import { CoursepageComponent } from './coursepage/coursepage.component';
import {MatSelectModule} from '@angular/material/select';
import { FilterPipe } from './shared/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoursepageComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule
  ],
  providers: [
    // {
    //   provide:ErrorHandler,
    //   useClass:GlobalErroHandlerService
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
