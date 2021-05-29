import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditListComponent } from '../../components/credit-list/credit-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreditListService } from '../../services/credit-services/credit-list';
import { HttpClientModule } from '@angular/common/http';
import { RegistryReportRoutingModule } from './credit-list-routing.module';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    CreditListComponent
  ],
  imports: [
    RegistryReportRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

    ,MatSliderModule

  ],
  providers: [
    CreditListService
  ]
})
export class CreditListModule { }
