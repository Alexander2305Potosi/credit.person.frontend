import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreditListComponent } from 'src/app/components/credit-list/credit-list.component';

const routes: Routes = [
  {
    path: '', component: CreditListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryReportRoutingModule { }
