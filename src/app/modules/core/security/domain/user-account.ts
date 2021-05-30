export class UserAccount {
  id!: string;
  username!: string;
  password!: string;
  password_verify!: string;
  email!: string;
  private errors:Array<any> = [];

  get valueErrors(){
    return this.errors;
  }

  validate():boolean {
    this.errors = [];
    if (this.id === undefined|| this.id === '' || this.id === null) {
      this.errors.push('Id esta vacio');
    }

    if (this.username === undefined|| this.username === '' || this.username === null) {
      this.errors.push('usuario esta vacio');
    }

    if (this.password === undefined|| this.password === '' || this.password === null) {
      this.errors.push('clave esta vacio');
    }

    if (this.password_verify === undefined|| this.password_verify === '' || this.password_verify === null) {
      this.errors.push('claave verficación esta vacio');
    }

    if (this.email === undefined|| this.email === '' || this.email === null) {
      this.errors.push('email esta vacio');
    }

    debugger;
    if(this.email !== ''  && this.validateEmail(this.email)===false){
      this.errors.push('Dato del campo EMAIL no tiene el formato de un correo electrónico');
    }


    if (this.password_verify !== this.password) {
      this.errors.push('clave y clave de verificación no coinciden');
    }

    let isValidate =true
    if(this.errors.length>0){
      isValidate = false;
    }

    return isValidate;

  }

   validateEmail(email: string){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let test =re.test(String(email).toLowerCase());
    return test;
}
}
