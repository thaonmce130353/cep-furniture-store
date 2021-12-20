import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './Models/User';

import { environment } from 'src/environments/environment';

import { UserManager, User as UserOIDC, UserManagerSettings } from 'oidc-client';
import { Constant } from './Constant';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userManager: UserManager;
  private _user: UserOIDC;

  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this._userManager = new UserManager(this.idpSettings);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.api}/users/authenticate`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private get idpSettings(): UserManagerSettings {
    return {
      authority: Constant.idpAuthority,
      client_id: Constant.clientId,
      redirect_uri: `${Constant.clientRoot}/shop`,
      scope: "openid profile api.WebApp",
      response_type: "code",
      post_logout_redirect_uri: `${Constant.clientRoot}`,
      client_secret: "secret"
    }
  }

  loginOIDC = () => {
    return this._userManager.signinRedirect();
  }

  isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(userOIDC => {
        if (this._user !== userOIDC) {
          this._loginChangedSubject.next(this.checkUser(userOIDC));
        }
        this._user = userOIDC;

        return this.checkUser(userOIDC);
      })
  }

  private checkUser = (userOIDC: UserOIDC): boolean => {
    return !!userOIDC && !userOIDC.expired;
  }
}
