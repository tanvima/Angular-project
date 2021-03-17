import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio'
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


// let materialComponents = [
//   CommonModule,
//   FormsModule,
//   MatSelectModule,
//   MatFormFieldModule,
//   MatIconModule,
//   NgxInputStarRatingModule,
//   ReactiveFormsModule,
//   MatAutocompleteModule,
//   MatInputModule,
//   MatBadgeModule,
//   MatTabsModule,
//   MatRadioModule,
//   MatDialogModule,
  

// ]


@NgModule({
  declarations: [HeaderComponent, FilterPipe, LoginComponent],
  imports: [
    CommonModule,
  FormsModule,
  MatSelectModule,
  MatFormFieldModule,
  MatIconModule,
  NgxInputStarRatingModule,
  ReactiveFormsModule,
  MatAutocompleteModule,
  MatInputModule,
  MatBadgeModule,
  MatTabsModule,
  MatRadioModule,
  MatDialogModule,
  MatCheckboxModule
  ],
  exports: [HeaderComponent, FilterPipe,LoginComponent
  
  ]
})
export class SharedModule { }
