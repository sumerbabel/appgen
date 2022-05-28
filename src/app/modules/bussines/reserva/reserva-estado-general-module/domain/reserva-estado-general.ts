import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class ReservaEstadoGeneral extends formModel implements DataModel {
    public _id: string;
    public _name: string;
    constructor(
        id: string,
        name: string
    ) {
        super();
        this._id = id;
        this._name = name;
        this.setOriginalValues(this, [
            '_id',
            '_name'
        ]);
    }
    set id(id: string) { this._id = id; }
    set name(name: string) { this._name = name; }
    get id(): string { return this._id; }
    get name(): string { return this._name; }
    static createReservaEstadoGeneral(object: Object): ReservaEstadoGeneral {
        let reservaEstadoGeneral: ReservaEstadoGeneral = new ReservaEstadoGeneral(
            object['id'],
            object['name']
        );
        reservaEstadoGeneral.updatedAt = object['updated_at'];
        reservaEstadoGeneral.isNew = false;
        return reservaEstadoGeneral;
    }
    static createReservaEstadoGeneralEmpty(): ReservaEstadoGeneral {
        let reservaEstadoGeneral: ReservaEstadoGeneral = new ReservaEstadoGeneral(ReservaEstadoGeneral.generateUuid(), undefined);
        reservaEstadoGeneral.isNew = true;
        return reservaEstadoGeneral;
    }
}