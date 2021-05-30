import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CreditListService } from '../../../../services/credit-services/credit-service';
import { AlertComponent } from '../../../../components/alert/alert.component';
import { Credit } from '../../../../models/credit';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})

export class EditFormComponent implements OnInit {
  public frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private creditListService: CreditListService,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  openSnack(data: any) {
    this.snack.openFromComponent(AlertComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private initializeForm() {
    const data = this.data.data;

    this.frm = this.fb.group({
      namePerson: new FormControl({value: data.namePerson, disabled: true}),
      lastNamePerson: new FormControl({value: data.lastNamePerson, disabled: true}),
      totalCost: new FormControl(data.totalCost , [Validators.required, Validators.minLength(6)]),
      totalFee: new FormControl(data.totalFee , [Validators.required, Validators.minLength(1)]),
      idCredit: new FormControl(data.idCredit , [Validators.required])
    });
  }

  public save(form: FormGroup) {

    this.creditListService.update(form.value).subscribe((data: any) => {
      this.openSnack(data);

      // if (data.success) {
        this.dialogRef.close(true);
      // }
    });
     
  }

  public gettotalCostErrorMess() {
    return this.frm.controls.totalCost.hasError('required') ? 'Valor crédito es obligatorio' :
      this.frm.controls.totalCost.hasError('minlength') ? 'Al menos 6 caracteres' : '';
  }

  public gettotalFeeErrorMess() {
    return this.frm.controls.totalFee.hasError('required') ? 'Numero cuotas es obligatorio' :
      this.frm.controls.name.hasError('minlength') ? 'Al menos 1 caracteres' : '';
  } 

}
