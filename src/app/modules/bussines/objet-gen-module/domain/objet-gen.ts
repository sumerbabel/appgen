import { CodeModel } from '@ngstack/code-editor';
import { Colors } from '@sharedModule/enums/colors';
import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class ObjetGen extends formModel implements DataModel {

  public _id: string;
  private _name: string;
  private _field: string;
  private _content: string;
  private _order: number =1;
  private _type: string;
  private _length: number =0;
  private _level: number =-1;
  private _selected: boolean;
  private _required: boolean;

  constructor(
    id: string,
    name: string,
    field: string,
    content: string,
    order: number,
    type: string,
    length: number,
    level: number,
    selected: boolean,
    required: boolean
  ) {

    super();
    this._id = id;
    this._name = name;
    this._field = field;
    this.content = content;
    this._order = order;
    this._type = type;
    this._length = length;
    this._level = level;
    this._selected = selected;
    this._required = required;
    this.setOriginalValues(this, [
      '_id',
      '_name',
      '_field',
      '_content',
      '_order',
      '_type',
      '_length',
      '_level',
      '_selected',
      '_required',
    ]);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set name(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set field(field: string) {
    this._field = field;
  }

  get field(): string {
    return this._field;
  }


  set content(content: string) {
    this._content = content;
  }

  get content(): string {
    return this._content;
  }

  set order(order: number) {
    this._order = order;
  }

  get order(): number {
    return this._order;
  }

  set type(type: string) {
    this._type = type;
  }

  get type(): string {
    return this._type;
  }

  set length(length: number) {
    this._length = length;
  }
  get length(): number {
    return this._length;
  }

  set level(level: number|string) {
    this._level = +level;
  }

  get level(): number|string {
    return this._level;
  }

  set selected(selected: boolean) {
    this._selected = selected;
  }

  get selected(): boolean {
    return this._selected;
  }

  set required(required: boolean) {
    this._required = required;
  }

  get required(): boolean {
    return this._required;
  }

  static createObjetGen(object: Object): ObjetGen {
    let objetGen: ObjetGen = new ObjetGen(
      object['id'],
      object['name'],
      object['field'],
      object['content'],
      object['order'],
      object['type'],
      object['length'],
      object['level'],
      object['selected'],
      object['required']
    );

    objetGen.updatedAt = object['updated_at'];
    objetGen.isNew = false;
    return objetGen;
  }

  static createObjetGenEmpty(): ObjetGen {
    let objetGen: ObjetGen = new ObjetGen(
      ObjetGen.generateUuid(),
      undefined,
      '',
      '',
      1,
      undefined,
      0,
      0,
      true,
      true
    );

    objetGen.isNew = true;
    return objetGen;
  }

  get colorLevel(): string {
    let color: string;
    switch (this.level) {
      case 0:
        color = Colors.GREEN;
        break;
      case 1:
        color = Colors.YELLOW;
        break;
      case 2:
        color = Colors.ORANGE;
        break;
      case 3:
        color = Colors.PURPLE;
        break;
      case 4:
        color = Colors.BLUE_GRADIENT;
        break;
      case 5:
        color = Colors.YELLOW_GRADIENT;
        break;
    }
    return color;
  }
}
