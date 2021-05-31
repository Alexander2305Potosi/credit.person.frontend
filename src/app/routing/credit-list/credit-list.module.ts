import { NgModule } from '@angular/core';
import { CreditListComponent } from '../../modules/credit-list/credit-list.component';
import { GeneralModule } from 'src/app/utils/general.module';
import { RouterModule } from '@angular/router';
import { EditFormComponent } from 'src/app/modules/credit-list/forms/edit/edit-form.component';
import { CreateFormComponent } from 'src/app/modules/credit-list/forms/create/create-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component:     CreditListComponent
  }]),
  GeneralModule
  ],
  declarations: [
    CreditListComponent,
    EditFormComponent,
    CreateFormComponent
  ],
  providers: [],
  entryComponents: [
    EditFormComponent,
    CreateFormComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class CreditListModule { }
