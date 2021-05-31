import { EMPTY, of } from 'rxjs';
import { Credit } from 'src/app/models/credit';
import { CreditListComponent } from './credit-list.component';

describe('Pruebas para el component CreditListComponent', () => {
  const credit: Credit = JSON.parse('{"idCredit": 1, "totalCost": 1, "totalFee": 1, "idPerson": 1}');
  let component: CreditListComponent;
  let creditListServiceMock;
  let changeDetectorRefMock;
  let dialogMock;
  let snackMock;


  beforeEach(() => {
    changeDetectorRefMock = {
      detectChanges: jest.fn()
    };
    creditListServiceMock = {
      getListCredit: jest.fn(),
      save: jest.fn(),
      update: jest.fn()
    };
    dialogMock = {
      open: jest.fn()
    };
    snackMock = {};
  
    spyOn(dialogMock, 'open').and.returnValue({afterClosed: () => EMPTY});
    component = new CreditListComponent(changeDetectorRefMock, creditListServiceMock, dialogMock, snackMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should AfterInit component', () => {
    jest.spyOn(creditListServiceMock, 'getListCredit').mockReturnValue(of(credit));
    component.ngAfterViewInit();
    component.ngAfterViewChecked();
    expect(creditListServiceMock.getListCredit).toHaveBeenCalled();
  });

  it('should opne edit component credit', () => {
    component.edit(credit);
    component.ngAfterViewChecked();
    expect(dialogMock.open).toHaveBeenCalled();
  });


  it('should open add component credit', () => {
    component.save();
    component.ngAfterViewChecked();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should open delete component credit', () => {
    component.delete(credit);
    component.ngAfterViewChecked();
    expect(dialogMock.open).toHaveBeenCalled();
  });


});
