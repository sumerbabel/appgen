import { Component, OnInit } from '@angular/core';
import { AlertService } from '@sharedModule/components/organims/alertForm/service/alert.service';
import { Modal } from '@sharedModule/components/organims/modal/model/modal.model';
import { ModelAction } from '@sharedModule/components/molecules/tables/model/action';
import { ActionGeneric } from '@sharedModule/enums/action-generic.enum';
import { DialogService } from '@sharedModule/components/organims/dialogForm/service/dialog.service';
import { ActionButton } from '@sharedModule/enums-object/action-button';
import { ReservaEstadoGeneral } from '../../domain/reserva-estado-general';
import { ReservaEstadoGeneralService } from '../../services/reserva-estado-general.service';
@Component({
    selector: 'app-create-reserva-estado-general',
    templateUrl: './create-reserva-estado-general.component.html',
    styleUrls: ['./create-reserva-estado-general.component.scss'],
})
export class CreateReservaEstadoGeneralComponent extends Modal implements OnInit {
    TITLE_HEADER_FORM = 'Nuevo Registro ReservaEstadoGeneral';
    TEXT_FOOTER = '* Campos Obligatorios';
    ACTION_FORM: ModelAction[] = [ActionButton.SAVE, ActionButton.CANCEL];
    constructor(
        private reservaEstadoGeneralService: ReservaEstadoGeneralService,
        private alertService: AlertService,
        private dialogService: DialogService
    ) {
        super();
    }
    reservaEstadoGeneral: ReservaEstadoGeneral;
    modalInput(): void { }
    ngOnInit(): void {                                 
        this.reservaEstadoGeneral = ReservaEstadoGeneral.createReservaEstadoGeneralEmpty();
    }
    createReservaEstadoGeneral() {
        this.reservaEstadoGeneralService.post(this.reservaEstadoGeneral.toDataPersistJson()).subscribe(
            (resultPost) => {
                this.alertService.openAlertSucsses(resultPost);
                this.modalClose(this.reservaEstadoGeneral);
            },
            (errorArray) => {
                this.reservaEstadoGeneral.errors = [errorArray];
            }
        );
    }
    validateSaveRegister() {
        if (this.reservaEstadoGeneral.isValid) {
            this.dialogService
                .openDialog({
                    title: 'Guardar Registro',
                    textDialog: '¿Está seguro de GUARDAR el registro?',
                })
                .subscribe((resultDialog) => {
                    if (resultDialog === ActionGeneric.YES) {
                        this.createReservaEstadoGeneral();
                    }
                });
        }
    }
    cancelRegister() {
        if (this.reservaEstadoGeneral.isModified) {
            this.dialogService
                .openDialog({
                    title: 'Cancelar Registro',
                    textDialog:
                        '¿Está seguro de CANCELAR el registro, al realizar esta acción se perderán los datos ingresados o modificados?',
                })
                .subscribe((resultDialog) => {
                    if (resultDialog === ActionGeneric.YES) {
                        this.modalCancel();
                    }
                });
        } else {
            this.modalCancel();
        }
    }
    actionFormEvent($event) {
        switch ($event) {
            case ActionGeneric.SAVE:
                this.validateSaveRegister();
                break;
            case ActionGeneric.CANCEL:
                this.cancelRegister();
                break;
            case ActionGeneric.CLOSE:
                this.cancelRegister();
                break;
        }
    }
}