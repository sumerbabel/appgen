import { DataModel } from '@sharedModule/models-core/data-model';
import { formModel } from '@sharedModule/models-core/form-model';
export class UserSecurity extends formModel implements DataModel {
  public _id: string;
  private _username: string;
  private _email: string;
  private _emailVerifiedAt: string;
  constructor(
    id: string,
    username: string,
    email: string,
    emailVerifiedAt: string
  ) {
    super();
    this._id = id;
    this._username = username;
    this._email = email;
    this._emailVerifiedAt = emailVerifiedAt;
    this.setOriginalValues(this, [
      '_id',
      '_username',
      '_email',
      '_emailVerifiedAt',
    ]);
  }
  set id(id: string) {
    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  set username(username: string) {
    this._username = username;
  }
  get username(): string {
    return this._username;
  }
  set email(email: string) {
    this._email = email;
  }
  get email(): string {
    return this._email;
  }
  set emailVerifiedAt(emailVerifiedAt: string) {
    this._emailVerifiedAt = emailVerifiedAt;
  }
  get emailVerifiedAt(): string {
    return this._emailVerifiedAt;
  }
  static createUserSecurity(object: Object): UserSecurity {
    let userSecurity: UserSecurity = new UserSecurity(
      object['id'],
      object['username'],
      object['email'],
      object['email_verified_at']
    );
    userSecurity.updatedAt = object['updated_at'];
    userSecurity.isNew = false;
    return userSecurity;
  }
  static createUserSecurityEmpty(): UserSecurity {
    let userSecurity: UserSecurity = new UserSecurity(
      UserSecurity.generateUuid(),
      undefined,
      undefined,
      undefined
    );
    userSecurity.isNew = true;
    return userSecurity;
  }
}
