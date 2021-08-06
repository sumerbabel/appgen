import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@sharedModule/services/local-storage/local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuTree } from '../../components/menu/domain/menu-tree';
import { MenuService } from '../../components/menu/services/menu.service';

import { MenuActions } from '../domain/menu-actions';
import { User } from '../domain/user';
import { UserLogin } from '../domain/user-login';
import { UserLoginService } from './user-login.service';

@Injectable({ providedIn: 'root' })

export class AccountService {
  private userSubject: BehaviorSubject<any>;
  private menuUser: BehaviorSubject<Array<MenuTree>> = new BehaviorSubject<Array<MenuTree>>([]);;
  private menuActionsSubject: BehaviorSubject<MenuActions>;
  private menuListActionsSubject: BehaviorSubject<Array<MenuActions>>;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService,
    private localStorageService: LocalStorageService,
    private menuService : MenuService

  ) {
    let user = this.localStorageService.get('user');
    this.userSubject = new BehaviorSubject<User>(user);
    this.menuActionsSubject = new BehaviorSubject<MenuActions>(undefined);
    this.menuListActionsSubject = new BehaviorSubject<Array<MenuActions>>([]);

    //this.startRefreshTokenTimer();
  }

public excuteInitalServices():Observable<any>{
  return this.menuService.getMenuUser()
  .pipe(map((menuResult: any[]) => {

          menuResult.forEach((item) => {
        this.menuUser.value.push(MenuTree.createMenuNodeRecursive(item));
      });

      let MenuActionsList: Array<MenuActions> = this.menuUser.value[0].getMenuList();
      this.setMenuListSession(MenuActionsList)
}));

}

public getMenuUser():Array<MenuTree>{
return this.menuUser.value
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
    if(this.userSubject.value){
      let user:User =  this.userSubject.value;
      let dateexpired = new Date(user.expiredTokenMinutes)
      let dateNow =Date.now();
      const timeout = dateexpired.getTime() - dateNow;


     const utimateActionDate= new Date(this.localStorageService.get('utimateActionDate'));

       setTimeout(() => {
      }, timeout);
    }
}
}
