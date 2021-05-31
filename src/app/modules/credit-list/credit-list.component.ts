import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertComponent } from '../../components/alert/alert.component';
import { Credit } from '../../models/credit';
import { CreditListService } from 'src/app/services/credit-services/credit-service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { EditFormComponent } from './forms/edit/edit-form.component';
import { CreateFormComponent } from './forms/create/create-form.component';
import { MSGFORM } from 'src/app/utils/constanst';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss'],
  providers: [CreditListService]
})
export class CreditListComponent implements AfterViewInit, OnInit {
  public displayedColumns = ['id', 'namePerson', 'lastNamePerson', 'numberIdentificationPerson', 'nameIdTypeIdentification', 'totalCost', 'totalFee', 'idCredit'];
  public dataSource = new MatTableDataSource();
  public isLoading = false;
  public search = '';

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private creditListService: CreditListService,
    public dialog: MatDialog,
    public snack: MatSnackBar
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.getData();
  }

  ngAfterViewChecked() {
    this.changeDetectorRef.detectChanges();
  }


  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.getData();
  }

  getData(): void {
    this.isLoading = true;
    this.creditListService.getListCredit(this.search).subscribe(data => {
      this.isLoading = false;
      this.dataSource.data = data
    }),
      catchError(() => {
        this.isLoading = false;
        this.openSnack(MSGFORM.error.msg, true);
        return observableOf([]);
      });


  }

  edit(credit: Credit): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '400px',
      data: { title: 'Actualizar Crédito', data: credit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    }),
    catchError(() => {
      this.isLoading = false;
      this.openSnack(MSGFORM.error.msg, true);
      return observableOf([]);
    });;


  }

  save(): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      width: '400px',
      data: { title: 'Crear Crédito' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
        this.openSnack(MSGFORM.succes.msg, true);
      }
    });
  }


  delete(credit: Credit): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '290px',
      data: {
        title: 'Eliminar Crédito',
        message: '¿ Esta  seguro de eliminar el registro ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.creditListService.delete(credit.idCredit).subscribe((data: any) => {
          this.openSnack(MSGFORM.succes.msg, true);
          this.getData();
        }),
        catchError(() => {
          this.isLoading = false;
          this.openSnack(MSGFORM.error.msg, true);
          return observableOf([]);
        });
      }
    });
  }

  private openSnack(msg: String, succes: boolean): void {
    const dataSnack = { message: msg, succes: succes };
    this.snack.openFromComponent(AlertComponent, {
      data: dataSnack,
      duration: 3000
    });
  }
}
