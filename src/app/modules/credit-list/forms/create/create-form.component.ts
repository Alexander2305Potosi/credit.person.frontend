import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CreditListService } from '../../../../services/credit-services/credit-service';
import { AlertComponent } from '../../../../components/alert/alert.component';
import { Maestro } from '../../../../models/maestro';
import {Observable} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import { MaestroService } from 'src/app/services/credit-services/maestro-service';
import { MSGFORM } from 'src/app/utils/constanst';


@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {
  public listPerson : [Maestro];
  public filteredPerson: Observable<Maestro[]>;
  public frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private creditListService: CreditListService,
    private maestroService: MaestroService,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadDataMaestro();
    this.initializeForm();
  }

  private filter(value: String): Maestro[] {
    const filterValue = value.toLowerCase();
    return this.listPerson.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(maestro: Maestro): string {
    return maestro && maestro.name ? maestro.name : '';
  }

  private loadDataMaestro() {
    this.maestroService.getlistPerson().subscribe(data => {
      this.listPerson = data;
      this.filteredPerson = this.frm.controls.idPerson.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.listPerson.slice())
      );
    }),
    catchError(() => {
      this.openSnack(MSGFORM.error.msg, false);
      return Observable;
    });
  }

  private initializeForm() {
    this.frm = this.fb.group({
      idPerson:  new FormControl(null, [Validators.required, Validators.minLength(1)]),
      totalCost: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      totalFee: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  public save(form: FormGroup) {
    this.creditListService.save(form.value).subscribe((data: any) => {
        this.dialogRef.close(true);
        this.openSnack(MSGFORM.succes.msg, true);
    }),
    catchError(() => {
      this.openSnack(MSGFORM.error.msg, false);
      return new Observable();
    });
     
  }

  public gettotalCostErrorMesstotalCost() {
    return this.frm.controls.totalCost.hasError('required') ? MSGFORM.error.fieldrequerid :
      this.frm.controls.totalCost.hasError('minlength') ? 'Al menos 9 numeros deben ser ingresados' : '';
  }

  public gettotalFeeErrorMesstotalFee() {
    return this.frm.controls.totalFee.hasError('required') ? MSGFORM.error.fieldrequerid :
    this.frm.controls.totalFee.hasError('minlength') ? 'Al menos 2 numeros deben ser ingresados' : '';
  }

  private openSnack(msg: String, succes: boolean): void {
    const dataSnack = { message: msg, succes: succes };
    this.snack.openFromComponent(AlertComponent, {
      data: dataSnack,
      duration: 3000
    });
  }

}
