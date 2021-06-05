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
  private menuActions: Observable<MenuActions>;
  private menuActionsSubject: BehaviorSubject<MenuActions>;

  constructor(
    private router: Router,
    private userLoginService: UserLoginService,
    private localStorageService: LocalStorageService,

  ) {
    let user = this.localStorageService.get('user');
    this.userSubject = new BehaviorSubject<User>(user);
    this.menuActionsSubject = new BehaviorSubject<MenuActions>(undefined);
    this.user = this.userSubject.asObservable();
    this.menuActions = this.menuActionsSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public getMenuSession(): MenuActions{
    return this.menuActionsSubject.value;
  }

  public setMenuSession(menuActions:MenuActions){
    this.menuActionsSubject.next(menuActions);
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
