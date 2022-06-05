import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class Programa extends formModel implements DataModel {
  public _id: string;
  public name: string=null;

  constructor(_id: string, name: string) {
    super();
    this._id = _id;
    this.name = name;
    this.setOriginalValues(this, ['_id', 'name']);
  }

  setName(name: string) {
    this.name = name;
    this.validateRulesBussines()

  }

  getName(): string {
    return this.name;
  }

  static create(object: Object): Programa {
    let programa: Programa = new Programa(object['_id'], object['name']);
    programa.updatedAt = object['updated_at'];
    programa.isNew = false;
    return programa;
  }

  static createEmpty(): Programa {
    let programa: Programa = new Programa(
      Programa.generateUuid(),
      null
    );
    programa.isNew = true;
    return programa;
  }

  listErrorsRulesBussines: Array<string> = []
  setListErrosRulesBussines(validation:string){
    if(validation !==null){
      this.listErrorsRulesBussines.push(validation)
    }
  }

  validateRulesBussines() {
    this.listErrorsRulesBussines =[]
    this.setListErrosRulesBussines(this.rule_name_leng_max())
    this.setListErrosRulesBussines(this.rule_name_is_empty())
  }

  private rule_name_is_empty(): string {
    if (this.name === '' || this.name === undefined)
    { return 'El nombre del sistema esta vacio' }
    return null
  }
readonly MAX_LENGTH_SISTEM_NAME =30
readonly MINIM_LENGTH_SISTEM_NAME =5
  private rule_name_leng_max(): string {
    if (this.name.length  >=this.MAX_LENGTH_SISTEM_NAME || this.name.length  <=this.MINIM_LENGTH_SISTEM_NAME)
    { return 'El nombre del sistema debe tener como minimo 5 caracteres y como maximo 30' }
    return null
  }

}
