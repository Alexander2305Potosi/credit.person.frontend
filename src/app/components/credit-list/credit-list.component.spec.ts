import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditListComponent } from './credit-list.component';
import { of } from 'rxjs';

describe('Pruebas para el component CreditListComponent', () => {

  let component: CreditListComponent;
  let formBuilderMock;
  let reportServiceMock;

  beforeEach(() => {
    formBuilderMock = {
      group: jest.fn(),
      value: jest.fn()
    };

    reportServiceMock = {
      sendReportEmployee: jest.fn()
    };

    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   


});
