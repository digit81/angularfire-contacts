import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {CompanyEditComponent} from './company/company-edit/company-edit.component';
import {CompanyService} from './company/company.service';
import { CompanyListComponent } from './company/company-list/company-list.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CompanyEditComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ CompanyService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
