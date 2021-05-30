import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { ConfirmComponent } from './components/confirm/confirm.component';
import { AlertComponent } from './components/alert/alert.component';

import { GeneralModule } from './utils/general.module';
import { CreditListService } from './services/credit-services/credit-service';
import { MaestroService } from './services/credit-services/maestro-service';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    AlertComponent
  ],
  imports: [
    GeneralModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CreditListService,
    MaestroService
  ],
  entryComponents: [
    ConfirmComponent,
    AlertComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
