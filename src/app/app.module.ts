import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {CalendarModule} from './calendar/app.module.calendar';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, CalendarModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    //
  }
}
