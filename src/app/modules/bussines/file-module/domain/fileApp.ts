import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';

export class FileApp extends formModel implements DataModel {
  public _id: string;
  private _idAsociate: string;
  private _idGroupType: string;
  private _idFileType: string;
  private _pathBase: string;
  private _pathRelative: string;
  private _fileName: string;
  private _originalFileName: string;
  private _size: number;
  private _extencion: string;

  constructor(
    id: string,
    idAsociate: string,
    idGroupType: string,
    idFileType: string,
    pathBase: string,
    pathRelative: string,
    fileName: string,
    originalFileName: string,
    size: number,
    extencion: string
  ) {
    super();
    this._id = id;
    this._idAsociate = idAsociate;
    this._idGroupType = idGroupType;
    this._idFileType = idFileType;
    this._pathBase = pathBase;
    this._pathRelative = pathRelative;
    this._fileName = fileName;
    this._originalFileName = originalFileName;
    this._size = size;
    this._extencion = extencion;
    this.setOriginalValues(this, [
      '_id',
      '_idAsociate',
      '_idGroupType',
      '_idFileType',
      '_pathBase',
      '_pathRelative',
      '_fileName',
      '_originalFileName',
      '_size',
      '_extencion',
    ]);
  }

  set id(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  set idAsociate(idAsociate: string) {
    this._idAsociate = idAsociate;
  }

  get idAsociate(): string {
    return this._idAsociate;
  }

  set idGroupType(idGroupType: string) {
    this._idGroupType = idGroupType;
  }

  get idGroupType(): string {
    return this._idGroupType;
  }

  set idFileType(idFileType: string) {
    this._idFileType = idFileType;
  }

  get idFileType(): string {
    return this._idFileType;
  }

  set pathBase(pathBase: string) {
    this._pathBase = pathBase;
  }

  get pathBase(): string {
    return this._pathBase;
  }

  set pathRelative(pathRelative: string) {
    this._pathRelative = pathRelative;
  }

  get pathRelative(): string {
    return this._pathRelative;
  }

  set fileName(fileName: string) {
    this._fileName = fileName;
  }

  get fileName(): string {
    return this._fileName;
  }

  set originalFileName(originalFileName: string) {
    this._originalFileName = originalFileName;
  }

  get originalFileName(): string {
    return this._originalFileName;
  }

  set size(size: number) {
    this._size = size;
  }

  get size(): number {
    return this._size;
  }

  set extencion(extencion: string) {
    this._extencion = extencion;
  }

  get extencion(): string {
    return this._extencion;
  }

  static createFile(object: Object): FileApp {
    let file: FileApp = new FileApp(
      object['id'],
      object['id_asociate'],
      object['id_group_type'],
      object['id_file_type'],
      object['path_base'],
      object['path_relative'],
      object['file_name'],
      object['original_file_name'],
      object['size'],
      object['extencion']
    );
    file.updatedAt = object['updated_at'];
    file.isNew = false;
    return file;
  }

  static createFileEmpty(): FileApp {
    let file: FileApp = new FileApp(
      FileApp.generateUuid(),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    );
    file.isNew = true;
    return file;
  }

}
