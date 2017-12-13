import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
