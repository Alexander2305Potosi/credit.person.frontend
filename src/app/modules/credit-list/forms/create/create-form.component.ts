import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { CreditListService } from '../../../../services/credit-services/credit-service';
import { AlertComponent } from '../../../../components/alert/alert.component';
import { Maestro } from '../../../../models/maestro';
import {Observable} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import { MaestroService } from 'src/app/services/credit-services/maestro-service';

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

  private filter(value: string): Maestro[] {
    const filterValue = value.toLowerCase();
    return this.listPerson.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  openSnack(data: any) {
    this.snack.openFromComponent(AlertComponent, {
      data: { data: data },
      duration: 3000
    });
  }

  private loadDataMaestro() {
    this.maestroService.getlistPerson().subscribe(data => {
      this.listPerson = data;
      this.filteredPerson = this.frm.controls.idPerson.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
    }),
    catchError(() => {
      return Observable;
    });
  }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      idPerson:  new FormControl(null, [Validators.required, Validators.minLength(1)]),
      totalCost: new FormControl(null, [Validators.required, Validators.minLength(9)]),
      totalFee: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });
  }

  public save(form: FormGroup) {

    this.creditListService.save(form.value).subscribe((data: any) => {
      this.openSnack(data);

      // if (data.success) {
        this.dialogRef.close(true);
      // }
    });
     
  }

  public gettotalCostErrorMesstotalCost() {
    return this.frm.controls.totalCost.hasError('required') ? 'totalCost is required' :
      this.frm.controls.totalCost.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  }

  public gettotalFeeErrorMesstotalCost() {
    return this.frm.controls.totalFee.hasError('required') ? '' : '';
  }

}
