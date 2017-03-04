import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { CarouselModule} from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TourComponent } from './tour/tour.component';
import { DetailComponent } from './detail/detail.component';

import { LoaderService } from './shared/loader/loader.service'
import {TourService} from './service/tour.service';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TourComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    CarouselModule.forRoot(),
  ],
  entryComponents: [
    DetailComponent,
  ],
  providers: [
    LoaderService,
    TourService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
