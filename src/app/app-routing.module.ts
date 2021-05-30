import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '', redirectTo: '/credit-list', pathMatch: 'full'
  },
  {
    path: 'credit-list', loadChildren: () => import('./routing/credit-list/credit-list.module').then(m => m.CreditListModule),

  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
