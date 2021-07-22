import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@sharedModule/services/local-storage/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';


import { MenuActions } from '../domain/menu-actions';
import { User } from '../domain/user';
import { UserLogin } from '../domain/user-login';
import { UserLoginService } from './user-login.service';

@Injectable({ providedIn: 'root' })

export class AccountService {
  private userSubject: BehaviorSubject<any>;
  private menuActionsSubject: BehaviorSubject<MenuActions>;
  private menuListActionsSubject: BehaviorSubject<Array<MenuActions>>;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService,
    private localStorageService: LocalStorageService,

  ) {
    console.log('2. INICA APP ACCOUNT SERVICE')
    let user = this.localStorageService.get('user');
    this.userSubject = new BehaviorSubject<User>(user);
    this.menuActionsSubject = new BehaviorSubject<MenuActions>(undefined);
    this.menuListActionsSubject = new BehaviorSubject<Array<MenuActions>>([]);

    this.startRefreshTokenTimer();

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getMenuSession(): MenuActions {
    return this.menuActionsSubject.value;
  }

  public setMenuSession(ruteWeb: string) {
    this.getMenuListSession().forEach(menu => {
    
      if (menu.ruteWeb === ruteWeb) {
        console.log('menu SESION', menu, 'ruteweb', ruteWeb)
        this.menuActionsSubject.next(menu);
      }
    })
  }

  public getMenuListSession(): Array<MenuActions> {
    return this.menuListActionsSubject.value;
  }

  public setMenuListSession(menuActions: Array<MenuActions>) {
    this.menuListActionsSubject.next(menuActions);
  }

  public userSession(): Observable<any> {
    return this.userSubject;
  }

  login(userLogin: UserLogin) {
    this.userLoginService.postUserModelLogin(userLogin).subscribe((result: { jwtClaims:{token: string, expiredMinutes:number}; user: { username: string; }; }) => {
      let user = new User();
      user.token = result.jwtClaims.token;
      user.username = result.user.username;
      user.expiredTokenMinutes = new Date( Date.now() +result.jwtClaims.expiredMinutes*60000)
      user.isExpiredToken =false;
      this.localStorageService.set('user', user);
      this.userSubject.next(user);
      this.router.navigate(['/']);
    });
  }

  
  setUserTokenStatus(expiredTokenStatus:boolean) {
    let user:User =  this.userSubject.value;
    user.isExpiredToken =expiredTokenStatus;
    this.userSubject.next(user);
  }
 

  logout() {
    this.router.navigate(['/login']);
    this.localStorageService.remove('user');
    this.userSubject.next(null);
  }

  private startRefreshTokenTimer() {
    console.log('inicia funcion tiemr')
    console.log(this.userSubject.value)
    if(this.userSubject.value){
      console.log('entra al timer')
      let user:User =  this.userSubject.value;
      let dateexpired = new Date(user.expiredTokenMinutes)
      let dateexpired1 =Date.now();
      const timeout = dateexpired.getTime() - dateexpired1;
      console.log('tiempo cerrar',timeout,dateexpired,dateexpired1)
      //  setTimeout(() => {
      //     console.log('entra al time out')   
      //   alert('token expirado'+'timeout')
      // }, timeout);
    }

}
}
