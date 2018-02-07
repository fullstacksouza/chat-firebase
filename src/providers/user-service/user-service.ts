import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseAuthState } from 'angularfire2';
import { User } from '../../models/user-model';
import { Observable } from 'rxjs';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ErrorHandler } from '@angular/core/src/error_handler';


/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserServiceProvider {

  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(
    public http: Http,
    public af: AngularFire
  ) {
    this.users = af.database.list('users');
    console.log('Hello UserServiceProvider Provider');
    this.listenAuthState();
  }

  private listenAuthState(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if (authState) {
          this.currentUser = this.af.database.object(`/users/${authState.auth.uid}`);
          this.setUsers(authState.auth.uid);
        }
      });
  }

  private setUsers(uidToExclude: string): void {
    this.users = <FirebaseListObservable<User[]>>this.af.database.list(`/users`, {
      query: {
        orderByChild: 'name'
      }
    }).map((users: User[]) => {
      return users.filter((user: User) => user.$key !== uidToExclude);
    })
  }

  create(user: User, userId: String): firebase.Promise<any> {
    return this.af.database.object(`/users/${userId}`)
      .set(user);
  }

  userExist(username: string): Observable<boolean> {
    return this.af.database.list(`users`, {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0; //se tiver algum item dentro dele, quer dizer q o usuario ja existe, entao retorna verdadeiro caso n exista retorna falso
    });
  }
  get(userId:string):FirebaseObjectObservable<User>{
    return <FirebaseObjectObservable<User>>this.af.database.object(`/users/${userId}`);
    
  }
}
