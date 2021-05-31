import { of } from 'rxjs';
import { Maestro } from 'src/app/models/maestro';
import { CreateFormComponent } from './create-form.component';

describe('Pruebas para el component CreateFormComponent', () => {
    const maestro: Maestro = JSON.parse('{"id": 1, "name": "name"}');
    let component: CreateFormComponent;
    let dialogRefMock;
    let dataMatDialogMock;
    let formBuilderMock;
    let creditListServiceMock;
    let maestroServiceMock;
    let snackMock;


    beforeEach(() => {
        dialogRefMock = {};
        dataMatDialogMock = {};
        formBuilderMock = {
            group: jest.fn()
        };
        creditListServiceMock = {
            save: jest.fn()
        };
        maestroServiceMock = {
            getlistPerson: jest.fn()

        };
        snackMock = {};

        component = new CreateFormComponent(dialogRefMock, dataMatDialogMock, formBuilderMock, creditListServiceMock, maestroServiceMock, snackMock);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init component', () => {
        jest.spyOn(maestroServiceMock, 'getlistPerson').mockReturnValue(of(maestro));
        component.ngOnInit();
        expect(maestroServiceMock.getlistPerson).toHaveBeenCalled();
    });

    it('should save credit component', () => {
        jest.spyOn(creditListServiceMock, 'save').mockReturnValue(of());
        component.save(formBuilderMock);
        expect(creditListServiceMock.save).toHaveBeenCalled();
    });


});
