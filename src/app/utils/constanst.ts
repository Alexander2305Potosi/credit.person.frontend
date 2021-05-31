const base_path = 'http://localhost:8080/';

export const CONSTANST = {
    routes: {
        credit: {
            list: base_path + 'credit-person/list?filter=',
            delete: base_path + 'credit-person/',
            save: base_path + 'credit-person',
            update: base_path + 'credit-person'
        }, maestro_list: {
            person: base_path + 'maestro/list-person',
            typeIdentification: base_path + 'maestro/list-typeIdentification',
            city: base_path + 'maestro/list-city',
            suburbByCity: base_path + 'maestro/list-suburb'
        }


    }
};

export const MSGFORM = {
    error:{
       fieldrequerid: "Campo obligatorio",
       msg: "Error al realizar la acción, Intente de nuevo"
    }
    ,succes: {
        msg: "Acción realizada con éxito"
    }
}
 
