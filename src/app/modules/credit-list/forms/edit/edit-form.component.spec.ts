import { EditFormComponent } from './edit-form.component';

describe('Pruebas para el component EditFormComponent', () => {

  let component: EditFormComponent;
  let dialogRefMock;
  let dataMatDialogMock;
  let formBuilderMock;
  let creditListServiceMock;
  let snackMock;
  

  beforeEach(() => {
    dialogRefMock = {};
    dataMatDialogMock = {  };
    formBuilderMock = {};
    creditListServiceMock = {};
    snackMock = {};

    component = new EditFormComponent(dialogRefMock, dataMatDialogMock, formBuilderMock, creditListServiceMock, snackMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
