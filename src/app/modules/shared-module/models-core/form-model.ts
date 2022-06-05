import { DateUtils } from '@sharedModule/static-class/date-utils';
import { v4 as uuidv4 } from 'uuid';
export class formModel {

    private _disabled: boolean = false;
    private _errors: string[] = [];
    private _isValid: boolean = true;
    private _isModified: boolean = false;
    private _isNew: boolean = false;
    private _updatedAt: string;
    private _originalValues={'_id':''};

    public static generateUuid(){
      return uuidv4();
    }

    public setOriginalValues(object:any,ArrayProperties:Array<any>=[]){
      ArrayProperties.forEach(key=>{
          this._originalValues[key] =object[key];
      })
    }

    public toDataPersistJson() {
      let objectJsonPersist = {id:''};
        Object.keys(this._originalValues).forEach((key) => {
          let key_p=key.replace('_', '');
          objectJsonPersist[key_p] = this[key];
        }
      );
      return objectJsonPersist;
    }

    getIsModifiedProperties():boolean {
      Object.keys(this._originalValues).forEach((key) => {
        if (this._originalValues[key] !== this[key]) {
          this.isModified = true;
        }
      });
      return this.isModified
    }

    set isModified(isModified: boolean) { this._isModified = isModified }
    get isModified(): boolean { return this._isModified; }

    set disabled(disabled: boolean) { this._disabled = disabled }
    get disabled(): boolean { return this._disabled; }

    set errors(errors: string[]) {
        this._errors = errors;
    }

    get errors(): string[] { return this._errors; }
    set isValid(valid: boolean) { this._isValid = valid }
    get isValid(): boolean {
        this.validateModel()
        return  this.validateModel() }


    set isNew(isNew: boolean) {
        this._isNew = isNew
        if (isNew) {
            this.updatedAt = DateUtils.dateNowString();
        }
    }

    get isNew(): boolean { return this._isNew; }
    get updatedAt(): string { return this._updatedAt }
    set updatedAt(updated_at: string) {
        this._updatedAt = updated_at
    }

    private validateModel() {
        if (this._errors.length > 0) {
            this._isValid = false;
        } else { this._isValid = true; }
       this._errors=[];
       return this._isValid
    }
}
