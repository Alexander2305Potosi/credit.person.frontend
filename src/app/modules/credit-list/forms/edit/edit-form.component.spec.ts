import { of } from 'rxjs';
import { Credit } from 'src/app/models/credit';
import { EditFormComponent } from './edit-form.component';

describe('Pruebas para el component EditFormComponent', () => {
    const credit: Credit = JSON.parse('{"data":{"namePerson": 1, "lastNamePerson": 1, "totalCost": 1, "totalFee": 1, "idCredit": 1} }');
    let component: EditFormComponent;
    let dialogRefMock;
    let dataMatDialogMock;
    let formBuilderMock;
    let creditListServiceMock;
    let snackMock;


    beforeEach(() => {
        dialogRefMock = {};
        dataMatDialogMock = {};
        formBuilderMock = {
            group: jest.fn()
        };
        creditListServiceMock = {
            update: jest.fn()
        };
        snackMock = {};

        component = new EditFormComponent(dialogRefMock, dataMatDialogMock, formBuilderMock, creditListServiceMock, snackMock);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init component', () => {
        component.data = credit;
        component.ngOnInit();
        expect(formBuilderMock.group).toHaveBeenCalled();
    });

    it('should update credit component', () => {
        jest.spyOn(creditListServiceMock, 'update').mockReturnValue(of());
        component.update(formBuilderMock);
        expect(creditListServiceMock.update).toHaveBeenCalled();
    });



});
