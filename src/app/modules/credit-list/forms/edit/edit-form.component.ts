import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CreditListService } from '../../../../services/credit-services/credit-service';
import { AlertComponent } from '../../../../components/alert/alert.component';
import { MSGFORM } from 'src/app/utils/constanst';
import { catchError } from 'rxjs/operators';

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

  private initializeForm() {
    const data = this.data.data;

    this.frm = this.fb.group({
      namePerson: new FormControl({value: data.namePerson, disabled: true}),
      lastNamePerson: new FormControl({value: data.lastNamePerson, disabled: true}),
      totalFee: new FormControl({value: data.totalFee, disabled: true}),
      idCredit: new FormControl(data.idCredit),
      totalCost: new FormControl(data.totalCost , [Validators.required, Validators.minLength(7),Validators.maxLength(9)]),
    });
  }

  public update(form: FormGroup) {

    this.creditListService.update(form.value).subscribe((data: any) => {
      this.dialogRef.close(true);
      this.openSnack(MSGFORM.succes.msg, true);
    }),
    catchError(() => {
      this.openSnack(MSGFORM.error.msg, false);
      return observableOf([]);
    });
     
  }

  public gettotalCostErrorMess() {
    return this.frm.controls.totalCost.hasError('required') ? MSGFORM.error.fieldrequerid :
      this.frm.controls.totalCost.hasError('maxLength') ? 'Al menos 9 caracteres' : '';
  }

  private openSnack(msg: String, succes: boolean): void {
    const dataSnack = { message: msg, succes: succes };
    this.snack.openFromComponent(AlertComponent, {
      data: dataSnack,
      duration: 3000
    });
  }

}

function observableOf(arg0: undefined[]): any {
  throw new Error('Function not implemented.');
}

