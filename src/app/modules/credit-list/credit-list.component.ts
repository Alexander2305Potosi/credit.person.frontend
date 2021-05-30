import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {  of as observableOf } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AlertComponent } from '../../components/alert/alert.component';
import { Credit } from '../../models/credit';
import { CreditListService } from 'src/app/services/credit-services/credit-service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { EditFormComponent } from './forms/edit/edit-form.component';
import { CreateFormComponent } from './forms/create/create-form.component';

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

  private openSnack(data: any): void {
    this.snack.openFromComponent(AlertComponent, {
      data: { data: data },
      duration: 3000
    });
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
        return observableOf([]);
      });

  }

  edit(credit: Credit): void {
    const dialogRef = this.dialog.open(EditFormComponent, {
      width: '400px',
      data: { title: 'Actualizar Crédito', action: 'edit', data: credit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });


  }

  save(): void {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      width: '400px',
      data: { title: 'Crear Crédito', action: 'save' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

}
