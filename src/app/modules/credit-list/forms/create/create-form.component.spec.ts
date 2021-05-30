import { CreateFormComponent } from './create-form.component';

describe('Pruebas para el component CreateFormComponent', () => {

  let component: CreateFormComponent;
  let dialogRefMock;
  let dataMatDialogMock;
  let formBuilderMock;
  let creditListServiceMock;
  let maestroServiceMock;
  let snackMock;
  

  beforeEach(() => {
    dialogRefMock = {};
    dataMatDialogMock = {  };
    formBuilderMock = {};
    creditListServiceMock = {};
    maestroServiceMock = {};
    snackMock = {};

    component = new CreateFormComponent(dialogRefMock, dataMatDialogMock, formBuilderMock, creditListServiceMock, maestroServiceMock, snackMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
