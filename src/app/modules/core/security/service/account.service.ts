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
  private user: Observable<User|null>;
  private menuActionsSubject: BehaviorSubject<MenuActions>;
  private menuListActionsSubject: BehaviorSubject<Array<MenuActions>>;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService,
    private localStorageService: LocalStorageService,

  ) {
    let user = this.localStorageService.get('user');
    this.userSubject = new BehaviorSubject<User>(user);
    this.menuActionsSubject = new BehaviorSubject<MenuActions>(undefined);
    this.menuListActionsSubject = new BehaviorSubject<Array<MenuActions>>([]);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getMenuSession(): MenuActions{
    return this.menuActionsSubject.value;
  }

  public setMenuSession(ruteWeb:string){
    this.getMenuListSession().forEach(menu=>{
      if(menu.ruteWeb === ruteWeb){
        this.menuActionsSubject.next(menu);
      }
    })
 
  }

  public getMenuListSession(): Array<MenuActions>{
    return this.menuListActionsSubject.value;
  }

  public setMenuListSession(menuActions:Array<MenuActions>){
    console.log('lista menu actions',menuActions);
    this.menuListActionsSubject.next(menuActions);
  }

  public userSession(): Observable<any> {
    return this.user;
  }

  login(userLogin: UserLogin) {
    this.userLoginService.postUserModelLogin(userLogin).subscribe((result: { token: string; user: { username: string; }; }) => {
      let user = new User();
      user.token = result.token;
      user.username = result.user.username;
      this.localStorageService.set('user', user);
      this.userSubject.next(user);
      this.router.navigate(['/']);
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.localStorageService.remove('user');
    this.userSubject.next(null);
  }
}
