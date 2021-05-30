export class UserLogin {
  username_or_email!: string;
  password!: string;
  private errors:Array<any> = [];

  get valueErrors(){
    return this.errors;
  }

  validate():boolean {
    this.errors = [];

    if (this.password === undefined|| this.password === '' || this.password === null) {
      this.errors.push('clave esta vacio');
    }

    if (this.username_or_email === undefined|| this.username_or_email === '' || this.username_or_email === null) {
      this.errors.push('claave verficación esta vacio');
    }

    if(this.errors.length>0){
      return false;
    }

    return true;
  }
}
