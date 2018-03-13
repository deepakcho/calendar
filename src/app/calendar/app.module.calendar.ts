import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppCalendarComponent} from './app.calendar';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppCalendarComponent],
  exports: [AppCalendarComponent]
})
export class CalendarModule {

  constructor() {
    //
  }
}
