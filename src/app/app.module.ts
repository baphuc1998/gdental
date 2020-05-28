import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { jqxBarGaugeModule }    from 'jqwidgets-ng/jqxbargauge';
import{ jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
import { FacebookModule } from 'ngx-facebook';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ServiceCostComponent } from './components/service-cost/service-cost.component';
import { BaseSiteComponent } from './components/base-site/base-site.component';
import { FormatLongstringPipe } from './services/pipe/format-longstring.pipe';
import { PubNubAngular } from 'pubnub-angular2';
  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    ServiceComponent,
    GalleryComponent,
    ScheduleComponent,
    ChatboxComponent,
    ServiceCostComponent,
    BaseSiteComponent,
    FormatLongstringPipe,
    // jqxSchedulerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SchedulerModule,
    FormsModule,
    ReactiveFormsModule,
    jqxBarGaugeModule,
    ChatModule,
    FacebookModule.forRoot(),
    RouterModule.forRoot(routes),
    ChatModule,
  ],
  providers: [PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
