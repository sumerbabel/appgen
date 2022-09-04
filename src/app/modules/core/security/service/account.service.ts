
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@sharedModule/services/local-storage/local-storage.service';
import { BehaviorSubject, empty, from, Observable } from 'rxjs';
import {  map, mergeMap } from 'rxjs/operators';
import { MenuTree } from '../../components/menu/domain/menu-tree';
import { MenuService } from '../../components/menu/services/menu.service';

import { MenuActions } from '../domain/menu-actions';
import { User } from '../domain/user';
import { UserLogin } from '../domain/user-login';
import { RefreshTokenService } from './refresh-token.service';
import { UserLoginService } from './user-login.service';

@Injectable({ providedIn: 'root' })

export class AccountService {
  private userSubject: BehaviorSubject<any>;
  private menuUser: BehaviorSubject<Array<MenuTree>> = new BehaviorSubject<Array<MenuTree>>([]);;
  private menuActionsSubject: BehaviorSubject<MenuActions>;
  private menuListActionsSubject: BehaviorSubject<Array<MenuActions>>;
  private appOnInit: boolean = false;
  constructor(
    private router: Router,
    private refreshTokenService: RefreshTokenService,
    private userLoginService: UserLoginService,
    private localStorageService: LocalStorageService,
    private menuService: MenuService

  ) {
    let user = this.localStorageService.get('user');
    this.userSubject = new BehaviorSubject<User>(user);
    this.menuActionsSubject = new BehaviorSubject<MenuActions>(undefined);
    this.menuListActionsSubject = new BehaviorSubject<Array<MenuActions>>([]);

    //this.startRefreshTokenTimer();
  }

  public excuteInitalServices(): Observable<any> {

    if (!this.userSubject.value) {
      return from(Promise.resolve(true))
    }

    console.log('excuteInitalServices')
    return this.refreshTokenService.postRefreshToken().pipe(
      map(
        (result: { jwtClaims: { token: string, expiredMinutes: number }; user: { username: string; }; }) => {
          let user = new User();
          user.token = result.jwtClaims.token;
          user.username = result.user.username;
          user.expiredTokenMinutes = new Date(Date.now() + result.jwtClaims.expiredMinutes * 60000)
          user.isExpiredToken = false;
          this.localStorageService.set('user', user);
          this.userSubject.next(user);
          this.startRefreshTokenTimer();
        }
      ),
      mergeMap((result: any) => this.menuService.getMenuUser()
        .pipe(map((menuResult: any[]) => {
          menuResult.forEach((item) => {
            this.menuUser.value.push(MenuTree.createMenuNodeRecursive(item));
          });

          let MenuActionsList: Array<MenuActions> = this.menuUser.value[0].getMenuList();
          this.setMenuListSession(MenuActionsList)
        }))

      )
    );
  }

  public getAppOnInit(): boolean {
    return this.appOnInit
  }

  public setAppOnInit(appOnInit: boolean) {
    this.appOnInit = appOnInit;
  }


  public getMenuUser():Observable<Array<MenuTree>> {
    return this.menuUser.asObservable()
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

  login(userLogin: UserLogin, isRemenberUser:boolean =false) {
    this.userLoginService.postUserModelLogin(userLogin).subscribe((result: { jwtClaims: { token: string, expiredMinutes: number }; user: { username: string; }; }) => {

      if(isRemenberUser){
        this.localStorageService.set('userRemenberMe', userLogin.username_or_email);
      }else{
        this.localStorageService.remove('userRemenberMe');
      }

      let user = new User();
      user.token = result.jwtClaims.token;
      user.username = result.user.username;
      user.expiredTokenMinutes = new Date(Date.now() + result.jwtClaims.expiredMinutes * 60000)
      user.isExpiredToken = false;
      this.localStorageService.set('user', user);

      this.userSubject.next(user);
      this.startRefreshTokenTimer();
      if( this.menuUser.value.length===0){
        this.menuService.getMenuUser().subscribe(((menuResult: any[]) => {


        let menu=  menuResult.map((item) => {
            return MenuTree.createMenuNodeRecursive(item);
          });

          this.menuUser.next(menu)

          let MenuActionsList: Array<MenuActions> = this.menuUser.value[0].getMenuList();
          this.setMenuListSession(MenuActionsList)
          this.router.navigate(['/']);
        }))
      }

    });
  }


  setUserTokenStatus(expiredTokenStatus: boolean) {
    let user: User = this.userSubject.value;
    user.isExpiredToken = expiredTokenStatus;
    this.userSubject.next(user);
  }


  logout() {
    this.router.navigate(['/login']);
    this.localStorageService.remove('user');
    this.userSubject.next(null);
    this.stopRefreshTokenTimer();
  }



private refreshToken(){
  return this.refreshTokenService.postRefreshToken().pipe(
    map(
      (result: { jwtClaims: { token: string, expiredMinutes: number }; user: { username: string; }; }) => {
        let user = new User();
        user.token = result.jwtClaims.token;
        user.username = result.user.username;
        user.expiredTokenMinutes = new Date(Date.now() + result.jwtClaims.expiredMinutes * 60000)
        user.isExpiredToken = false;
        this.localStorageService.set('user', user);
        this.userSubject.next(user);
        this.startRefreshTokenTimer()
      }
    ))
}


  private refreshTokenTimeout;

  public startRefreshTokenTimer() {
    if (this.userSubject.value) {
      let user: User = this.userSubject.value;
      let dateexpired = new Date(user.expiredTokenMinutes)
      let dateNow = Date.now();
      const minute =6*60*60000;
      const timeout = (dateexpired.getTime() - dateNow) -minute;


      const utimateActionDate = new Date(this.localStorageService.get('utimateActionDate'));
      const utimateActionTime = dateNow-utimateActionDate.getTime()
      let diferencia = timeout-utimateActionTime

      this.refreshTokenTimeout = setTimeout(() =>{

        if(diferencia>=0 && diferencia<=(timeout-minute)){
          this.refreshToken().subscribe()
        }else {
          console.log('no ejecutar REFRESH');
        }

      }
       , timeout);

    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
}

}
